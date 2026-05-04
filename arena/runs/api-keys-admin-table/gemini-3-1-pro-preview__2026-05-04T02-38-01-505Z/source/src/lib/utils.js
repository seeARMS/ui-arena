import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, format } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatRelative(date) {
  if (!date) return 'Never';
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function formatDate(date) {
  if (!date) return '-';
  return format(new Date(date), 'MMM d, yyyy');
}

export function generateMockData() {
  const teams = ['core-infra', 'billing', 'growth', 'data-eng', 'security', 'frontend-platform'];
  const scopesList = ['read:users', 'write:users', 'read:billing', 'write:billing', 'admin:all', 'read:audit', 'execute:jobs'];
  
  const statuses = [
    { status: 'healthy', weight: 60 },
    { status: 'stale', weight: 15 },
    { status: 'expiring', weight: 15 },
    { status: 'leaked', weight: 5 },
    { status: 'revoked', weight: 5 },
  ];

  const getRandomStatus = () => {
    const rand = Math.random() * 100;
    let sum = 0;
    for (const s of statuses) {
      sum += s.weight;
      if (rand <= sum) return s.status;
    }
    return 'healthy';
  };

  const data = [];
  const now = new Date();

  for (let i = 1; i <= 35; i++) {
    const status = getRandomStatus();
    const team = teams[Math.floor(Math.random() * teams.length)];
    const numScopes = Math.floor(Math.random() * 4) + 1;
    const scopes = [...scopesList].sort(() => 0.5 - Math.random()).slice(0, numScopes);
    
    const isOverScoped = scopes.includes('admin:all') || scopes.length > 3;
    
    let created = new Date(now.getTime() - Math.random() * 10000000000 * (status === 'stale' ? 3 : 1));
    let lastUsed = new Date(now.getTime() - Math.random() * 1000000000);
    let expires = new Date(now.getTime() + Math.random() * 10000000000);

    if (status === 'stale') {
      lastUsed = new Date(now.getTime() - (90 * 24 * 60 * 60 * 1000) - Math.random() * 10000000000); // Older than 90 days
    }
    if (status === 'expiring') {
      expires = new Date(now.getTime() + (5 * 24 * 60 * 60 * 1000) - Math.random() * 100000000); // Expiring in < 7 days
    }
    if (status === 'revoked') {
      expires = new Date(now.getTime() - Math.random() * 1000000000); // Already expired/revoked
    }

    data.push({
      id: `key_${Math.random().toString(36).substr(2, 9)}`,
      name: `${team}-${status === 'healthy' ? 'prod' : 'dev'}-key-${i}`,
      owner: `${team}@company.com`,
      scopes,
      isOverScoped,
      lastUsed: status === 'revoked' && Math.random() > 0.5 ? null : lastUsed.toISOString(),
      created: created.toISOString(),
      expires: expires.toISOString(),
      status,
      prefix: `sk_live_${Math.random().toString(36).substr(2, 4)}...`
    });
  }

  return data.sort((a, b) => new Date(b.created) - new Date(a.created));
}