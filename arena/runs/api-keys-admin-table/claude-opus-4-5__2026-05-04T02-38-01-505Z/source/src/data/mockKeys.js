const owners = [
  'alice@company.com', 'bob@company.com', 'charlie@company.com',
  'diana@company.com', 'eve@company.com', 'frank@company.com',
  'grace@company.com', 'henry@company.com', 'iris@company.com',
  'jack@company.com'
]

const scopeSets = [
  ['read:users'],
  ['read:users', 'write:users'],
  ['read:*'],
  ['admin:*'],
  ['read:billing', 'write:billing'],
  ['read:analytics'],
  ['read:users', 'read:billing', 'read:analytics'],
  ['write:deployments'],
  ['admin:users', 'admin:billing', 'admin:deployments'],
  ['read:users', 'write:users', 'read:billing', 'write:billing', 'admin:*']
]

const statuses = ['healthy', 'healthy', 'healthy', 'stale', 'expiring', 'leaked-suspected', 'revoked']

const eventTypes = ['created', 'used', 'rotated', 'scope-modified']

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function generateAuditEvents(created) {
  const events = [
    {
      type: 'created',
      timestamp: created,
      actor: owners[Math.floor(Math.random() * owners.length)],
      details: 'Key created via API'
    }
  ]
  
  const numEvents = 2 + Math.floor(Math.random() * 5)
  const now = new Date()
  
  for (let i = 0; i < numEvents; i++) {
    const eventDate = randomDate(new Date(created), now)
    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)]
    events.push({
      type,
      timestamp: eventDate.toISOString(),
      actor: type === 'used' ? 'system' : owners[Math.floor(Math.random() * owners.length)],
      details: type === 'used' ? `IP: 192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}` :
               type === 'rotated' ? 'Manual rotation' :
               type === 'scope-modified' ? 'Scopes updated' : null
    })
  }
  
  return events.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
}

export function generateMockKeys(count) {
  const keys = []
  const now = new Date()
  
  for (let i = 0; i < count; i++) {
    const created = randomDate(new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000), now)
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    const scopes = scopeSets[Math.floor(Math.random() * scopeSets.length)]
    const overScoped = scopes.some(s => s.includes('admin') || s.includes('*'))
    
    let lastUsed
    if (status === 'stale') {
      lastUsed = randomDate(new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000), new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000))
    } else if (status === 'revoked') {
      lastUsed = randomDate(new Date(created), new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000))
    } else {
      lastUsed = randomDate(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), now)
    }
    
    let expires
    if (status === 'expiring') {
      expires = randomDate(now, new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000))
    } else if (status === 'revoked') {
      expires = randomDate(new Date(created), now)
    } else {
      expires = randomDate(new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000))
    }
    
    const keyNames = [
      'Production API', 'Staging API', 'CI/CD Pipeline', 'Analytics Service',
      'Billing Integration', 'User Sync', 'Backup Service', 'Monitoring',
      'Deploy Bot', 'Test Runner', 'Data Export', 'Webhook Handler',
      'Mobile App', 'Web Dashboard', 'Internal Tools', 'Partner API'
    ]
    
    keys.push({
      id: `key_${i.toString().padStart(3, '0')}_${Math.random().toString(36).substr(2, 8)}`,
      name: `${keyNames[i % keyNames.length]} ${Math.floor(i / keyNames.length) + 1}`,
      keyPrefix: `sk_${status === 'healthy' ? 'live' : 'test'}_${Math.random().toString(36).substr(2, 8)}...`,
      owner: owners[i % owners.length],
      scopes,
      overScoped,
      created: created.toISOString(),
      lastUsed: lastUsed.toISOString(),
      expires: expires.toISOString(),
      lastRotated: Math.random() > 0.5 ? randomDate(new Date(created), now).toISOString() : null,
      status,
      auditEvents: generateAuditEvents(created.toISOString())
    })
  }
  
  return keys
}