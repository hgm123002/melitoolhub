import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// 采购询盘接收接口
// 说明：本地/自托管环境写入 data/leads.json；只读文件系统的托管环境（如静态 Pages）
// 写入失败时会记录错误并返回 202，前端会提示用户改用邮件联系，不假装已入账。

export const runtime = "nodejs";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  product: string;
  message?: string;
  locale?: string;
  source?: string;
  page?: string;
  ip?: string;
  createdAt: string;
  status: "new";
};

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

// 简易内存限流：同一 IP 每小时最多 6 条
const RATE_WINDOW = 60 * 60 * 1000;
const RATE_MAX = 6;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW);
  if (arr.length >= RATE_MAX) {
    hits.set(ip, arr);
    return true;
  }
  arr.push(now);
  hits.set(ip, arr);
  return false;
}

function readLeads(): Lead[] {
  try {
    const raw = fs.readFileSync(LEADS_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLeads(leads: Lead[]) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = String(body.name || "").trim().slice(0, 120);
  const email = String(body.email || "").trim().slice(0, 180);
  const product = String(body.product || "").trim().slice(0, 400);

  if (!name || !EMAIL_RE.test(email) || !product) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const lead: Lead = {
    id:
      Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    name,
    email,
    phone: String(body.phone || "").trim().slice(0, 80) || undefined,
    product,
    message: String(body.message || "").trim().slice(0, 4000) || undefined,
    locale: String(body.locale || "").slice(0, 16) || undefined,
    source: String(body.source || "purchase-page").slice(0, 40),
    page: String(body.page || "").slice(0, 400) || undefined,
    ip,
    createdAt: new Date().toISOString(),
    status: "new",
  };

  try {
    const leads = readLeads();
    leads.unshift(lead);
    writeLeads(leads);
    console.log("[leads] stored", lead.id, lead.email, lead.locale);
    return NextResponse.json({ ok: true, id: lead.id });
  } catch (err) {
    // 只读文件系统：不谎报已保存，返回 202 让前端提示邮件备用通道
    console.error("[leads] persist failed", err);
    console.log("[leads] dropped", JSON.stringify(lead));
    return NextResponse.json(
      { ok: false, error: "storage_unavailable" },
      { status: 202 }
    );
  }
}

export async function GET() {
  // 不对外暴露询盘内容，仅用于健康检查
  return NextResponse.json({ ok: true, endpoint: "leads" });
}
