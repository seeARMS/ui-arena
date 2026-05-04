const OWNERS = [
  'sarah.chen@company.com',
  'mike.johnson@company.com',
  'alex.kumar@company.com',
  'emma.wilson@company.com',
  'david.park@company.com',
  'lisa.rodriguez@company.com',
  'james.taylor@company.com',
  'sophia.martinez@company.com',
  'ryan.anderson@company.com',
  'olivia.thomas@company.com'
];

const SCOPE_GROUPS = [
  ['read:users', 'write:users'],
  ['read:repos', 'write:repos', 'delete:repos'],
  ['read:analytics', 'write:analytics'],
  ['read:billing', 'write:billing'],
  ['admin:org', 'admin:team'],
  ['read:logs', 'write:logs'],
  ['read:secrets', 'write:secrets'],
  ['deploy:production', 'deploy:staging'],
  ['read:metrics', 'write:metrics'],
  ['read:webhooks', 'write:webhooks', 'delete:webhooks']
];

const KEY_NAMES = [
  'prod-api-gateway',
  'staging-deployment',
  'ci-pipeline-main',
  'monitoring-service',
  'data-sync-job',
  'webhook-processor',
  'analytics-collector',
  'backup-automation',
  'integration-test',
  'mobile-app-prod',
  'web-dashboard',
  'reporting-service',
  'notification-worker',
  'search-indexer',
  'cache-warmer',
  'log-aggregator',
  'metrics-exporter',
  'auth-service',
  'payment-processor',
  'email-sender'
];

const STATUSES = ['healthy', 'stale', 'expiring', 'leaked-suspected', 'revoked'];

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomScopes() {
  const baseScopes = randomElement(SCOPE_GROUPS);
  const extraScopes = Math.random() > 0.7 ? randomElement(SCOPE_GROUPS) : [];
  return [...new Set([...baseScopes, ...extraScopes])];
}

function generateAuditTrail(created, lastUsed) {
  const events = [
    {
      type: 'created',
      action: 'API key created',
      user: randomElement(OWNERS),
      timestamp: created,
      details: 'Initial key generation'
    }
  ];

  const usageCount = Math.floor(Math.random() * 5) + 1;
  for (let i = 0; i < usageCount; i++) {
    const timestamp = randomDate(new Date(created), new Date(lastUsed));
    events.push({
      type: 'used',
      action: 'Key authenticated request',
      user: 'system',
      timestamp: timestamp.toISOString(),
      details: `Request from ${['10.0.1.${Math.floor(Math.random() * 255)}', '172.16.0.${Math.floor(Math.random() * 255)}'][Math.floor(Math.random() * 2)]}`
    });
  }

  if (Math.random() > 0.7) {
    const rotateDate = randomDate(new Date(created), new Date(lastUsed));
    events.push({
      type: 'rotated',
      action: 'Key rotated',
      user: randomElement(OWNERS),
      timestamp: rotateDate.toISOString(),
      details: 'Scheduled rotation'
    });
  }

  if (Math.random() > 0.8) {
    const modifyDate = randomDate(new Date(created), new Date(lastUsed));
    events.push({
      type: 'scope_modified',
      action: 'Scopes updated',
      user: randomElement(OWNERS),
      timestamp: modifyDate.toISOString(),
      details: 'Removed write:secrets scope'
    });
  }

  return events.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

export function generateMockKeys(count) {
  const keys = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const created = randomDate(new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000), new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000));
    const lastUsed = randomDate(created, now);
    const expires = new Date(created.getTime() + (Math.random() > 0.3 ? 365 : 90) * 24 * 60 * 60 * 1000);
    
    const daysSinceUsed = Math.floor((now - lastUsed) / (1000 * 60 * 60 * 24));
    const daysUntilExpiry = Math.floor((expires - now) / (1000 * 60 * 60 * 24));
    
    let status;
    if (Math.random() > 0.95) {
      status = 'revoked';
    } else if (Math.random() > 0.97) {
      status = 'leaked-suspected';
    } else if (daysUntilExpiry <= 7 && daysUntilExpiry >= 0) {
      status = 'expiring';
    } else if (daysSinceUsed > 30) {
      status = 'stale';
    } else {
      status = 'healthy';
    }

    const scopes = randomScopes();
    const overScoped = scopes.length > 5 && Math.random() > 0.7;

    keys.push({
      id: `sk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      name: `${randomElement(KEY_NAMES)}-${i + 1}`,
      owner: randomElement(OWNERS),
      scopes,
      lastUsed: lastUsed.toISOString(),
      created: created.toISOString(),
      expires: expires.toISOString(),
      status,
      overScoped,
      auditTrail: generateAuditTrail(created.toISOString(), lastUsed.toISOString())
    });
  }

  return keys;
}