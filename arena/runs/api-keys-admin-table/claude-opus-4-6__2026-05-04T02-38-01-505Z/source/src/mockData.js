import { subDays, subHours, addDays, subMinutes, format } from 'date-fns'

const owners = [
  'alice@eng.co', 'bob@eng.co', 'carol@eng.co', 'dave@eng.co',
  'eve@eng.co', 'frank@eng.co', 'grace@eng.co', 'heidi@eng.co',
  'ivan@eng.co', 'judy@eng.co', 'karl@eng.co', 'leo@eng.co',
  'mallory@eng.co', 'nina@eng.co', 'oscar@eng.co'
]

const scopeSets = [
  ['read:repos'],
  ['read:repos', 'write:repos'],
  ['read:repos', 'write:repos', 'admin:org'],
  ['read:repos', 'write:repos', 'admin:org', 'delete:repos'],
  ['read:repos', 'write:repos', 'admin:org', 'delete:repos', 'admin:billing'],
  ['read:repos', 'admin:org', 'admin:billing', 'write:repos', 'admin:hooks', 'delete:repos'],
  ['read:repos', 'write:deployments'],
  ['read:repos', 'write:deployments', 'admin:hooks'],
  ['admin:org', 'admin:billing', 'admin:hooks', 'delete:repos', 'write:repos', 'read:repos'],
  ['read:repos', 'write:repos', 'write:deployments'],
]

const prefixes = [
  'ci-pipeline', 'deploy-prod', 'staging-bot', 'monitoring-svc',
  'data-sync', 'backup-agent', 'test-runner', 'lint-bot',
  'release-mgr', 'infra-scanner', 'log-shipper', 'metrics-push',
  'webhook-relay', 'auth-proxy', 'cdn-purge', 'db-migrate',
  'secret-rotator', 'artifact-push', 'canary-deploy', 'rollback-svc',
  'perf-test', 'chaos-monkey', 'audit-logger', 'compliance-check',
  'api-gateway', 'service-mesh', 'config-sync', 'feature-flags'
]

const statuses = ['healthy', 'stale', 'expiring', 'leaked-suspected', 'revoked']

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function generateKeys(count) {
  const now = new Date()
  const keys = []

  for (let i = 0; i < count; i++) {
    const created = randomDate(subDays(now, 365), subDays(now, 1))
    const scopes = scopeSets[i % scopeSets.length]
    const isOverScoped = scopes.length >= 4

    let status
    if (i < 3) status = 'leaked-suspected'
    else if (i < 6) status = 'revoked'
    else if (i < 10) status = 'expiring'
    else if (i < 16) status = 'stale'
    else status = 'healthy'

    let lastUsed
    if (status === 'stale') {
      lastUsed = randomDate(subDays(now, 120), subDays(now, 31))
    } else if (status === 'revoked') {
      lastUsed = randomDate(subDays(now, 60), subDays(now, 5))
    } else if (status === 'leaked-suspected') {
      lastUsed = randomDate(subHours(now, 6), subMinutes(now, 5))
    } else {
      lastUsed = randomDate(subDays(now, 7), subMinutes(now, 10))
    }

    let expires
    if (status === 'expiring') {
      expires = randomDate(addDays(now, 1), addDays(now, 7))
    } else if (status === 'revoked') {
      expires = randomDate(subDays(now, 30), subDays(now, 1))
    } else {
      expires = randomDate(addDays(now, 30), addDays(now, 365))
    }

    const keyId = `sk_${Math.random().toString(36).substring(2, 10)}_${Math.random().toString(36).substring(2, 6)}`

    keys.push({
      id: `key-${i + 1}`,
      name: `${prefixes[i % prefixes.length]}-${String(i + 1).padStart(2, '0')}`,
      keyPrefix: keyId.substring(0, 12) + '...',
      owner: owners[i % owners.length],
      scopes,
      isOverScoped,
      lastUsed,
      created,
      expires,
      status,
      rotationCount: Math.floor(Math.random() * 12),
      auditEvents: generateAuditEvents(created, now, status),
    })
  }

  return keys
}

function generateAuditEvents(created, now, status) {
  const events = []
  const types = ['created', 'rotated', 'scopes_modified', 'used_from_new_ip', 'rate_limit_hit', 'revoked', 'restored']

  events.push({ type: 'created', timestamp: created, actor: 'system', detail: 'Key provisioned via API' })

  const eventCount = 3 + Math.floor(Math.random() * 8)
  for (let i = 0; i < eventCount; i++) {
    const ts = randomDate(created, now)
    const type = types[Math.floor(Math.random() * types.length)]
    const ips = ['192.168.1.42', '10.0.0.15', '203.0.113.77', '198.51.100.23', '172.16.0.8']
    let detail = ''
    switch (type) {
      case 'rotated': detail = 'Key rotated automatically'; break
      case 'scopes_modified': detail = 'Scopes updated by admin'; break
      case 'used_from_new_ip': detail = `First use from ${ips[Math.floor(Math.random() * ips.length)]}`; break
      case 'rate_limit_hit': detail = `Rate limit exceeded: ${100 + Math.floor(Math.random() * 900)} req/min`; break
      case 'revoked': detail = 'Key revoked by admin'; break
      case 'restored': detail = 'Key restored after investigation'; break
      default: detail = 'Event recorded'
    }
    events.push({
      type,
      timestamp: ts,
      actor: owners[Math.floor(Math.random() * owners.length)],
      detail,
    })
  }

  if (status === 'leaked-suspected') {
    events.push({
      type: 'leak_detected',
      timestamp: randomDate(subHours(now, 2), now),
      actor: 'security-scanner',
      detail: 'Key pattern found in public GitHub repository',
    })
  }

  return events.sort((a, b) => b.timestamp - a.timestamp)
}

export const mockKeys = generateKeys(30)