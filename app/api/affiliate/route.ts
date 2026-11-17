import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'config', 'affiliate.json');

function readData(): any {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { platforms: [], pageSize: 6, toolSlugs: [], stats: [], articles: [] };
  }
}

function writeData(data: any): void {
  try {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Write error:', error);
  }
}

export async function GET() {
  const data = readData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const newPlatform = await request.json();
    const data = readData();
    if (data.platforms.find((p: any) => p.id === newPlatform.id)) {
      return NextResponse.json({ error: '该 ID 已存在' }, { status: 400 });
    }
    data.platforms.push(newPlatform);
    writeData(data);
    return NextResponse.json({ success: true, platform: newPlatform });
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const data = readData();
    if (body.type === 'meta') {
      data.pageSize = body.pageSize;
      data.toolSlugs = body.toolSlugs;
      data.stats = body.stats;
      data.articles = body.articles;
      writeData(data);
      return NextResponse.json({ success: true });
    } else {
      const idx = data.platforms.findIndex((p: any) => p.id === body.id);
      if (idx === -1) return NextResponse.json({ error: '平台不存在' }, { status: 404 });
      data.platforms[idx] = body;
      writeData(data);
      return NextResponse.json({ success: true, platform: body });
    }
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) return NextResponse.json({ error: '缺少 ID 参数' }, { status: 400 });
    const data = readData();
    const idx = data.platforms.findIndex((p: any) => p.id === id);
    if (idx === -1) return NextResponse.json({ error: '平台不存在' }, { status: 404 });
    data.platforms.splice(idx, 1);
    writeData(data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 });
  }
}