// lib/user-store.ts
// 本地账号与用户数据存储（真实加密，非假登录）
//
// 说明（诚实标注）：
// - 当前部署未开启云端账号服务，因此账号与数据保存在本机浏览器中，换设备/换浏览器不互通。
// - 密码不存明文：PBKDF2-SHA256 + 随机盐（120,000 次迭代），与行业常规做法一致。
// - 数据结构预留了 userId 维度，后续开启云服务时可原样迁移，不用改调用方。

const USERS_KEY = "gth_users_v2";
const SESSION_KEY = "gth_session_v2";
const DATA_PREFIX = "gth_data_";

export interface StoredUser {
  id: string;
  email: string;
  salt: string;
  hash: string;
  iterations: number;
  createdAt: string;
}

export interface Session {
  userId: string;
  email: string;
  token: string;
  expiresAt: number;
}

export interface HistoryEntry {
  id: string;
  tool: string;
  toolPath: string;
  title: string;
  summary: string;
  at: number;
}

export interface SavedResult {
  id: string;
  tool: string;
  title: string;
  payload: string;
  at: number;
}

const isBrowser = () => typeof window !== "undefined";

const readJson = <T,>(key: string, fallback: T): T => {
  if (!isBrowser()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key: string, value: unknown) => {
  if (!isBrowser()) return;
  localStorage.setItem(key, JSON.stringify(value));
};

const toB64 = (buf: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(buf)));
const fromB64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

async function derive(password: string, salt: Uint8Array, iterations: number): Promise<string> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: salt as unknown as BufferSource, iterations, hash: "SHA-256" },
    keyMaterial,
    256,
  );
  return toB64(bits);
}

const randomBytes = (n: number) => {
  const arr = new Uint8Array(n);
  crypto.getRandomValues(arr);
  return arr;
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();
const isEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

export const getUsers = (): StoredUser[] => readJson<StoredUser[]>(USERS_KEY, []);

export class AuthError extends Error {}

export async function register(email: string, password: string): Promise<Session> {
  const mail = normalizeEmail(email);
  if (!isEmail(mail)) throw new AuthError("邮箱格式不正确");
  if (password.length < 8) throw new AuthError("密码至少 8 位");
  if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) throw new AuthError("密码需同时包含字母和数字");

  const users = getUsers();
  if (users.some((u) => u.email === mail)) throw new AuthError("该邮箱已注册，请直接登录");

  const salt = randomBytes(16);
  const iterations = 120000;
  const hash = await derive(password, salt, iterations);
  const user: StoredUser = {
    id: `u_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`,
    email: mail,
    salt: toB64(salt.buffer as ArrayBuffer),
    hash,
    iterations,
    createdAt: new Date().toISOString(),
  };
  writeJson(USERS_KEY, [...users, user]);
  return startSession(user);
}

export async function login(email: string, password: string): Promise<Session> {
  const mail = normalizeEmail(email);
  const user = getUsers().find((u) => u.email === mail);
  if (!user) throw new AuthError("账号不存在，请先注册");
  const hash = await derive(password, fromB64(user.salt), user.iterations);
  if (hash !== user.hash) throw new AuthError("密码错误");
  return startSession(user);
}

function startSession(user: StoredUser): Session {
  const session: Session = {
    userId: user.id,
    email: user.email,
    token: toB64(randomBytes(24).buffer as ArrayBuffer),
    expiresAt: Date.now() + 30 * 24 * 3600 * 1000,
  };
  writeJson(SESSION_KEY, session);
  return session;
}

export function getSession(): Session | null {
  const s = readJson<Session | null>(SESSION_KEY, null);
  if (!s) return null;
  if (s.expiresAt < Date.now()) {
    if (isBrowser()) localStorage.removeItem(SESSION_KEY);
    return null;
  }
  return s;
}

export function logout() {
  if (isBrowser()) localStorage.removeItem(SESSION_KEY);
}

/* ========================= 使用历史 / 结果保存 ========================= */

const dataKey = () => {
  const s = getSession();
  return `${DATA_PREFIX}${s ? s.userId : "guest"}`;
};

interface UserData {
  history: HistoryEntry[];
  saved: SavedResult[];
}

const readData = (): UserData => readJson<UserData>(dataKey(), { history: [], saved: [] });
const writeData = (d: UserData) => writeJson(dataKey(), d);

const uid = () => `e_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

export function addHistory(entry: Omit<HistoryEntry, "id" | "at">): HistoryEntry {
  const data = readData();
  const item: HistoryEntry = { ...entry, id: uid(), at: Date.now() };
  data.history = [item, ...data.history].slice(0, 200);
  writeData(data);
  return item;
}

export const listHistory = (): HistoryEntry[] => readData().history;

export function addSaved(result: Omit<SavedResult, "id" | "at">): SavedResult {
  const data = readData();
  const item: SavedResult = { ...result, id: uid(), at: Date.now() };
  data.saved = [item, ...data.saved].slice(0, 300);
  writeData(data);
  return item;
}

export const listSaved = (): SavedResult[] => readData().saved;

export function removeSaved(id: string) {
  const data = readData();
  data.saved = data.saved.filter((s) => s.id !== id);
  writeData(data);
}

export function clearMyData() {
  if (isBrowser()) localStorage.removeItem(dataKey());
}

export function exportMyData(): string {
  const s = getSession();
  return JSON.stringify(
    {
      account: s ? { userId: s.userId, email: s.email } : { account: "guest" },
      exportedAt: new Date().toISOString(),
      ...readData(),
    },
    null,
    2,
  );
}

/**
 * 迁移旧版明文账号（gth_users）到加密存储。
 * 旧版本把密码明文存在 localStorage，这里逐个重新加盐哈希后写入新表并删除旧表。
 */
export async function migrateLegacyAccounts(): Promise<number> {
  if (!isBrowser()) return 0;
  const raw = localStorage.getItem("gth_users");
  if (!raw) return 0;
  let migrated = 0;
  try {
    const legacy = JSON.parse(raw) as { email?: string; password?: string }[];
    const users = getUsers();
    for (const l of legacy) {
      if (!l?.email || typeof l.password !== "string") continue;
      const mail = normalizeEmail(l.email);
      if (users.some((u) => u.email === mail)) continue;
      const salt = randomBytes(16);
      const iterations = 120000;
      const hash = await derive(l.password, salt, iterations);
      users.push({
        id: `u_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`,
        email: mail,
        salt: toB64(salt.buffer as ArrayBuffer),
        hash,
        iterations,
        createdAt: new Date().toISOString(),
      });
      migrated += 1;
    }
    writeJson(USERS_KEY, users);
    localStorage.removeItem("gth_users");
  } catch {
    // 旧数据损坏则直接忽略，不阻塞登录
  }
  return migrated;
}

/** 统计：用于个人中心概览 */export function myStats() {
  const data = readData();
  const byTool = new Map<string, number>();
  data.history.forEach((h) => byTool.set(h.tool, (byTool.get(h.tool) ?? 0) + 1));
  return {
    historyCount: data.history.length,
    savedCount: data.saved.length,
    toolsUsed: byTool.size,
    topTools: [...byTool.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5),
  };
}
