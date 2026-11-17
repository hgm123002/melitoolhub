import { FavoriteItem, NotificationItem, HistoryItem, RestrictedItem, ExternalDatabase } from './types';

const STORAGE_KEYS = {
  favorites: 'pa_favorites',
  notifications: 'pa_notifications',
  history: 'pa_history',
  monitored: 'pa_monitored',
};

export function getFavorites(): FavoriteItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.favorites);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addFavorite(item: Omit<FavoriteItem, 'id' | 'addedAt'>): FavoriteItem {
  const favorites = getFavorites();
  const exists = favorites.find(f => f.itemId === item.itemId && f.type === item.type);
  if (exists) return exists;
  
  const newItem: FavoriteItem = {
    ...item,
    id: `fav-${Date.now()}`,
    addedAt: new Date().toISOString(),
  };
  
  if (typeof window !== 'undefined') {
    favorites.unshift(newItem);
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites.slice(0, 100)));
  }
  return newItem;
}

export function removeFavorite(itemId: string): void {
  if (typeof window === 'undefined') return;
  const favorites = getFavorites().filter(f => f.id !== itemId);
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
}

export function isFavorite(itemId: string, type: FavoriteItem['type']): boolean {
  return getFavorites().some(f => f.itemId === itemId && f.type === type);
}

export function getNotifications(): NotificationItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.notifications);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addNotification(item: Omit<NotificationItem, 'id' | 'createdAt' | 'isRead'>): NotificationItem {
  if (typeof window === 'undefined') return { ...item, id: '', createdAt: '', isRead: false };
  const notifications = getNotifications();
  const newItem: NotificationItem = {
    ...item,
    id: `notif-${Date.now()}`,
    createdAt: new Date().toISOString(),
    isRead: false,
  };
  notifications.unshift(newItem);
  localStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(notifications.slice(0, 50)));
  return newItem;
}

export function markNotificationRead(id: string): void {
  if (typeof window === 'undefined') return;
  const notifications = getNotifications().map(n => 
    n.id === id ? { ...n, isRead: true } : n
  );
  localStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(notifications));
}

export function getUnreadNotificationCount(): number {
  return getNotifications().filter(n => !n.isRead).length;
}

export function getHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.history);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addHistory(item: Omit<HistoryItem, 'id' | 'createdAt'>): void {
  if (typeof window === 'undefined') return;
  const history = getHistory();
  const newItem: HistoryItem = {
    ...item,
    id: `hist-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  history.unshift(newItem);
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const filtered = history.filter(h => new Date(h.createdAt).getTime() > sevenDaysAgo);
  localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(filtered.slice(0, 100)));
}

export function getMonitoredCompetitors(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEYS.monitored);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleMonitor(competitorId: string): boolean {
  if (typeof window === 'undefined') return false;
  const monitored = getMonitoredCompetitors();
  const index = monitored.indexOf(competitorId);
  if (index > -1) {
    monitored.splice(index, 1);
  } else {
    monitored.push(competitorId);
  }
  localStorage.setItem(STORAGE_KEYS.monitored, JSON.stringify(monitored));
  return monitored.includes(competitorId);
}

export function isMonitored(competitorId: string): boolean {
  return getMonitoredCompetitors().includes(competitorId);
}

export function formatNumber(num: number, decimals = 0): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toFixed(decimals);
}

export function formatCurrency(num: number, currency: string = 'USD'): string {
  const symbols: Record<string, string> = { USD: '$', EUR: '€', MXN: 'MX$', BRL: 'R$', CLP: 'CLP$', RUB: '₽', SGD: 'S$' };
  const symbol = symbols[currency] || '$';
  return `${symbol}${num.toFixed(2)}`;
}

export function downloadCSV(csvContent: string, filename: string): void {
  if (typeof window === 'undefined') return;
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ==================== 禁运/限制产品库 - 本地持久化 ====================
const PA_RESTRICTED_KEY = 'pa_restricted_items';
const PA_DB_CONFIG_KEY = 'pa_external_db_config';

export function getLocalRestrictedItems(): RestrictedItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(PA_RESTRICTED_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveLocalRestrictedItems(items: RestrictedItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PA_RESTRICTED_KEY, JSON.stringify(items));
}

export function addLocalRestrictedItem(item: Omit<RestrictedItem, 'id' | 'createdAt' | 'updatedAt'>): RestrictedItem {
  const newItem: RestrictedItem = {
    ...item,
    id: `rest-local-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const items = getLocalRestrictedItems();
  items.unshift(newItem);
  saveLocalRestrictedItems(items);
  return newItem;
}

export function updateLocalRestrictedItem(id: string, updates: Partial<RestrictedItem>): boolean {
  const items = getLocalRestrictedItems();
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return false;
  items[idx] = { ...items[idx], ...updates, updatedAt: new Date().toISOString() };
  saveLocalRestrictedItems(items);
  return true;
}

export function deleteLocalRestrictedItem(id: string): boolean {
  const items = getLocalRestrictedItems();
  const filtered = items.filter(i => i.id !== id);
  if (filtered.length === items.length) return false;
  saveLocalRestrictedItems(filtered);
  return true;
}

// ==================== 第三方数据库配置 - 本地持久化 ====================
export function getExternalDBConfig(): ExternalDatabase[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(PA_DB_CONFIG_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveExternalDBConfig(configs: ExternalDatabase[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PA_DB_CONFIG_KEY, JSON.stringify(configs));
}

export function updateExternalDB(id: string, updates: Partial<ExternalDatabase>): boolean {
  const configs = getExternalDBConfig();
  const idx = configs.findIndex(c => c.id === id);
  if (idx === -1) return false;
  configs[idx] = { ...configs[idx], ...updates };
  saveExternalDBConfig(configs);
  return true;
}