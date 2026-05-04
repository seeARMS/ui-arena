const OWNERS = [
  'alice@company.com',
  'bob@company.com',
  'charlie@company.com',
  'diana@company.com',
  'evan@company.com',
  'fiona@company.com',
  'george@company.com',
  'hannah@company.com'
];

const SCOPE_POOL = [
  'read:users',
  'write:users',
  'delete:users',
  'read:projects',
  'write:projects',
  'delete:projects',
  'read:billing',
  'write:billing',
  'admin:all',
  'read:logs',
  'write:logs',
  'read:analytics',
  'write:analytics',
  'read:deployments',
  'write:deployments',
  'read:secrets',
  'write:secrets',
  'admin:security'
];

const STATUSES = ['healthy', 'stale', 'expiring', 'leaked-suspected', 'revoked'];

const KEY_PREFIXES = [
  'prod-api',
  'staging-api',
  'dev-api',
  'ci-pipeline',
  'monitoring',
  'backup-service',
  'webhook-handler',
  'data-sync',
  'integration',
  'analytics'
];

const EVENT_TYPES = [
  'Key Created',
  'Key Rotated',
  'Scopes Modified',
  'Key Used',
  'Failed Auth Attempt',
  'Key Revoked',
  'Permissions Updated'
];

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateAuditEvents(count) {
  const events = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const daysAgo = Math.floor(Math.random() * 90);
    const timestamp = new Date(now);
    timestamp.setDate(timestamp.getDate() - daysAgo);
    
    const type = EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)];
    const actor = OWNERS[Math.floor(Math.random() * OWNERS.length)];
    
    let details = '';
    switch (type) {
      case 'Key Created':
        details = 'API key created with initial scopes';
        break;
      case 'Key Rotated':
        details = 'Key rotated successfully, old key invalidated';
        break;
      case 'Scopes Modified':
        details = `Added ${Math.floor(Math.random() * 3) + 1} new scopes`;
        break;
      case 'Key Used':
        details = `Authenticated request from ${['10.0.1.', '10.0.2.', '10.0.3.'][Math.floor(Math.random() * 3)]}${Math.floor(Math.random() * 255)}`;
        break;
      case 'Failed Auth Attempt':
        details = 'Invalid key signature detected';
        break;
      case 'Key Revoked':
        details = 'Key manually revoked by administrator';
        break;
      case 'Permissions Updated':
        details = 'Scope permissions modified';
        break;
    }
    
    events.push({
      type,
      timestamp: timestamp.toISOString(),
      details,
      actor
    });
  }
  
  return events.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

export function generateMockKeys(count) {
  const keys = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const createdDaysAgo = Math.floor(Math.random() * 365);
    const created = new Date(now);
    created.setDate(created.getDate() - createdDaysAgo);
    
    const lastUsedDaysAgo = Math.floor(Math.random() * createdDaysAgo);
    const lastUsed = new Date(now);
    lastUsed.setDate(lastUsed.getDate() - lastUsedDaysAgo);
    
    const expiresInDays = Math.floor(Math.random() * 180) - 30;
    const expires = new Date(now);
    expires.setDate(expires.getDate() + expiresInDays);
    
    const lastRotatedDaysAgo = Math.floor(Math.random() * 90);
    const lastRotated = new Date(now);
    lastRotated.setDate(lastRotated.getDate() - lastRotatedDaysAgo);
    
    const scopeCount = Math.floor(Math.random() * 8) + 1;
    const scopes = [];
    const shuffled = [...SCOPE_POOL].sort(() => 0.5 - Math.random());
    for (let j = 0; j < scopeCount; j++) {
      scopes.push(shuffled[j]);
    }
    
    let status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
    
    // Make status more realistic based on dates
    if (lastUsedDaysAgo > 60) {
      status = 'stale';
    } else if (expiresInDays < 7 && expiresInDays >= 0) {
      status = 'expiring';
    } else if (expiresInDays < 0) {
      status = 'revoked';
    } else if (Math.random() < 0.7) {
      status = 'healthy';
    }
    
    const prefix = KEY_PREFIXES[Math.floor(Math.random() * KEY_PREFIXES.length)];
    const suffix = Math.random().toString(36).substring(2, 6);
    
    keys.push({
      id: `sk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      name: `${prefix}-${suffix}`,
      owner: OWNERS[Math.floor(Math.random() * OWNERS.length)],
      scopes,
      lastUsed: lastUsed.toISOString(),
      created: created.toISOString(),
      expires: expires.toISOString(),
      lastRotated: lastRotated.toISOString(),
      status,
      auditEvents: generateAuditEvents(Math.floor(Math.random() * 10) + 5)
    });
  }
  
  return keys;
}