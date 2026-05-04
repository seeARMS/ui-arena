import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const owners = [
  ['Maya Chen', 'platform'],
  ['Theo Banks', 'payments'],
  ['Priya Rao', 'infra'],
  ['Sam Okafor', 'data'],
  ['Nina Park', 'mobile'],
  ['Luis Gomez', 'security'],
  ['Ari Singh', 'growth'],
  ['Elena Voss', 'reliability']
];

const scopeSets = [
  ['deploy:read', 'logs:read'],
  ['deploy:write', 'deploy:read', 'env:read'],
  ['billing:read', 'billing:write'],
  ['secrets:read', 'secrets:write', 'admin:*'],
  ['users:read', 'users:write', 'tokens:write'],
  ['metrics:read'],
  ['audit:read', 'logs:read', 'incidents:write'],
  ['repo:read', 'repo:write', 'deploy:write', 'admin:*'],
  ['webhooks:write', 'events:read'],
  ['secrets:read', 'env:write', 'tokens:write', 'admin:*']
];

const statuses = [
  'healthy',
  'healthy',
  'healthy',
  'stale',
  'expiring',
  'leaked-suspected',
  'revoked',
  'over-scoped'
];

function daysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

function daysFromNow(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

function makeKeys() {
  const names = [
    'prod-deploy-gha',
    'stripe-recon-worker',
    'terraform-cloud-prod',
    'datadog-log-forwarder',
    'mobile-release-bot',
    'incident-automation',
    'warehouse-loader',
    'preview-env-factory',
    'billing-export-cron',
    'security-scanner',
    'support-readonly',
    'internal-cli-v2',
    'webhook-dispatcher',
    'k8s-secret-sync',
    'audit-archive-writer',
    'payments-canary',
    'growth-experiment-api',
    'sre-runbook-bot',
    'legacy-ci-token',
    'vendor-snowflake-sync',
    'prod-admin-breakglass',
    'edge-config-publisher',
    'observability-ingest',
    'sandbox-test-key',
    'release-notes-bot',
    'customer-importer',
    'fraud-signals-etl',
    'staging-deploy-gha'
  ];

  return names.map((name, index) => {
    const owner = owners[index % owners.length];
    const status = statuses[(index * 3) % statuses.length];
    const createdDays = 18 + index * 13;
    const lastUsedDays =
      status === 'stale' ? 97 + index : status === 'revoked' ? 180 + index : status === 'leaked-suspected' ? 1 : (index * 5) % 44;
    const expiresIn =
      status === 'expiring' ? 1 + (index % 6) : status === 'revoked' ? -12 : status === 'stale' ? 21 + index : 18 + ((index * 9) % 150);
    const scopes = scopeSets[index % scopeSets.length];
    const overScoped = scopes.some((s) => s.includes('*')) || scopes.length >= 4 || status === 'over-scoped';

    return {
      id: `key_${String(index + 1).padStart(3, '0')}`,
      name,
      fingerprint: `ak_live_${(98231 + index * 761).toString(16)}…${(4830 + index * 37).toString(16)}`,
      owner: owner[0],
      team: owner[1],
      scopes,
      lastUsed: daysAgo(lastUsedDays),
      created: daysAgo(createdDays),
      expires: daysFromNow(expiresIn),
      status,
      overScoped,
      origin: index % 4 === 0 ? 'GitHub Actions' : index % 4 === 1 ? 'Kubernetes secret' : index % 4 === 2 ? 'Terraform variable' : 'Manual console',
      ip: `10.${22 + (index % 9)}.${40 + index}.${80 + (index % 90)}`,
      events: [
        { time: daysAgo(Math.max(0, lastUsedDays)), type: 'key.used', actor: owner[0], detail: `Authenticated from ${index % 2 ? 'us-east-1' : 'eu-west-1'} via ${index % 4 === 0 ? 'CI runner' : 'service account'}` },
        { time: daysAgo(Math.max(2, Math.floor(createdDays / 3))), type: overScoped ? 'scope.changed' : 'key.rotated', actor: index % 3 ? 'Automation' : 'Luis Gomez', detail: overScoped ? `Added ${scopes[scopes.length - 1]}` : 'Rotated according to 60-day policy' },
        { time: daysAgo(createdDays), type: 'key.created', actor: owner[0], detail: `Created for ${name} from ${index % 2 ? 'API' : 'admin console'}` }
      ]
    };
  });
}

const mockKeys = makeKeys();

function formatDate(iso) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(iso));
}

function relative(iso) {
  const now = new Date();
  const date = new Date(iso);
  const diff = Math.round((date - now) / 86400000);
  if (Math.abs(diff) === 0) return 'today';
  if (diff > 0) return `in ${diff}d`;
  return `${Math.abs(diff)}d ago`;
}

function statusLabel(status) {
  return status === 'leaked-suspected' ? 'leaked suspected' : status === 'over-scoped' ? 'over-scoped' : status;
}

function effectiveStatus(key) {
  if (key.status === 'over-scoped') return 'healthy';
  return key.status;
}

function isExpiring(key) {
  const days = (new Date(key.expires) - new Date()) / 86400000;
  return days >= 0 && days <= 7 && key.status !== 'revoked';
}

function isStale(key) {
  return (new Date() - new Date(key.lastUsed)) / 86400000 > 60 && key.status !== 'revoked';
}

function App() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState({ key: 'status', dir: 'asc' });
  const [selected, setSelected] = useState(new Set());
  const [drawerKey, setDrawerKey] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = mockKeys.filter((key) => {
      const haystack = `${key.name} ${key.owner} ${key.team} ${key.scopes.join(' ')} ${key.status} ${key.fingerprint}`.toLowerCase();
      if (q && !haystack.includes(q)) return false;
      if (filter === 'active') return !['revoked', 'stale'].includes(key.status);
      if (filter === 'stale') return key.status === 'stale' || isStale(key);
      if (filter === 'expiring') return key.status === 'expiring' || isExpiring(key);
      if (filter === 'over-scoped') return key.overScoped;
      return true;
    });

    rows.sort((a, b) => {
      const dir = sort.dir === 'asc' ? 1 : -1;
      const val = (row) => {
        if (sort.key === 'scopes') return row.scopes.length;
        if (sort.key === 'lastUsed' || sort.key === 'created' || sort.key === 'expires') return new Date(row[sort.key]).getTime();
        if (sort.key === 'owner') return `${row.owner} ${row.team}`;
        if (sort.key === 'status') return row.status;
        return row[sort.key];
      };
      return String(val(a)).localeCompare(String(val(b)), undefined, { numeric: true }) * dir;
    });

    return rows;
  }, [query, filter, sort]);

  const summary = useMemo(() => ({
    total: mockKeys.length,
    active: mockKeys.filter((k) => !['revoked', 'stale'].includes(k.status)).length,
    overScoped: mockKeys.filter((k) => k.overScoped).length,
    expiring: mockKeys.filter(isExpiring).length
  }), []);

  function toggleSort(key) {
    setSort((current) => ({ key, dir: current.key === key && current.dir === 'asc' ? 'desc' : 'asc' }));
  }

  function toggleSelected(id) {
    setSelected((current) => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected((current) => current.size === filtered.length ? new Set() : new Set(filtered.map((k) => k.id)));
  }

  function doAction(action, key) {
    setOpenMenu(null);
    if (action === 'audit') setDrawerKey(key);
  }

  const selectedRows = mockKeys.filter((k) => selected.has(k.id));

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <p className="eyebrow">Engineering workspace</p>
          <h1>API keys & permissions</h1>
        </div>
        <button className="primary">Create key</button>
      </header>

      <section className="summary-strip" aria-label="API key summary">
        <Summary label="Total keys" value={summary.total} />
        <Summary label="Active" value={summary.active} tone="good" />
        <Summary label="Over-scoped" value={summary.overScoped} tone="warn" />
        <Summary label="Expiring this week" value={summary.expiring} tone="danger" />
      </section>

      <section className="toolbar" aria-label="Table controls">
        <label className="search">
          <span className="sr-only">Search keys</span>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, owner, team, scope, fingerprint…" />
        </label>
        <div className="segments" role="group" aria-label="Filter keys">
          {['all', 'active', 'stale', 'expiring', 'over-scoped'].map((item) => (
            <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>
              {item.replace('-', ' ')}
            </button>
          ))}
        </div>
      </section>

      <main className="table-wrap">
        <table>
          <caption>{filtered.length} keys shown</caption>
          <thead>
            <tr>
              <th className="check">
                <input type="checkbox" aria-label="Select all visible keys" checked={filtered.length > 0 && selected.size === filtered.length} onChange={toggleAll} />
              </th>
              <Sortable label="Name" sortKey="name" sort={sort} onSort={toggleSort} />
              <Sortable label="Owner" sortKey="owner" sort={sort} onSort={toggleSort} />
              <Sortable label="Scopes" sortKey="scopes" sort={sort} onSort={toggleSort} />
              <Sortable label="Last used" sortKey="lastUsed" sort={sort} onSort={toggleSort} />
              <Sortable label="Created" sortKey="created" sort={sort} onSort={toggleSort} />
              <Sortable label="Expires" sortKey="expires" sort={sort} onSort={toggleSort} />
              <Sortable label="Status" sortKey="status" sort={sort} onSort={toggleSort} />
              <th className="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((key) => (
              <tr key={key.id} onClick={() => setDrawerKey(key)} className={selected.has(key.id) ? 'selected-row' : ''}>
                <td className="check" onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" aria-label={`Select ${key.name}`} checked={selected.has(key.id)} onChange={() => toggleSelected(key.id)} />
                </td>
                <td>
                  <div className="key-name">{key.name}</div>
                  <div className="muted mono">{key.fingerprint}</div>
                </td>
                <td>
                  <div>{key.owner}</div>
                  <div className="muted">{key.team}</div>
                </td>
                <td>
                  <div className="scope-list">
                    {key.scopes.slice(0, 3).map((scope) => <span key={scope} className={scope.includes('*') ? 'scope risk' : 'scope'}>{scope}</span>)}
                    {key.scopes.length > 3 && <span className="scope more">+{key.scopes.length - 3}</span>}
                  </div>
                </td>
                <td>
                  <div>{relative(key.lastUsed)}</div>
                  <div className="muted">{key.origin}</div>
                </td>
                <td>{formatDate(key.created)}</td>
                <td>
                  <div className={isExpiring(key) ? 'danger-text' : ''}>{relative(key.expires)}</div>
                  <div className="muted">{formatDate(key.expires)}</div>
                </td>
                <td>
                  <StatusPill status={effectiveStatus(key)} />
                  {key.overScoped && <span className="mini-alert">over-scoped</span>}
                </td>
                <td className="actions" onClick={(e) => e.stopPropagation()}>
                  <ActionMenu keyRow={key} open={openMenu === key.id} onToggle={() => setOpenMenu(openMenu === key.id ? null : key.id)} onAction={doAction} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="stacked-list" aria-label="API key list">
          {filtered.map((key) => (
            <article className="stacked-row" key={key.id} onClick={() => setDrawerKey(key)}>
              <div className="stacked-head">
                <input onClick={(e) => e.stopPropagation()} type="checkbox" aria-label={`Select ${key.name}`} checked={selected.has(key.id)} onChange={() => toggleSelected(key.id)} />
                <div>
                  <strong>{key.name}</strong>
                  <div className="muted mono">{key.fingerprint}</div>
                </div>
                <StatusPill status={effectiveStatus(key)} />
              </div>
              <dl>
                <div><dt>Owner</dt><dd>{key.owner} · {key.team}</dd></div>
                <div><dt>Scopes</dt><dd>{key.scopes.join(', ')}</dd></div>
                <div><dt>Last used</dt><dd>{relative(key.lastUsed)}</dd></div>
                <div><dt>Expires</dt><dd>{relative(key.expires)}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </main>

      {selected.size > 0 && (
        <div className="bulkbar" role="region" aria-label="Bulk actions">
          <strong>{selected.size} selected</strong>
          <span>{selectedRows.filter((k) => k.overScoped).length} over-scoped · {selectedRows.filter(isExpiring).length} expiring</span>
          <button>Rotate selected</button>
          <button>Edit scopes</button>
          <button className="danger">Revoke</button>
          <button className="ghost" onClick={() => setSelected(new Set())}>Clear</button>
        </div>
      )}

      {drawerKey && <Drawer keyRow={drawerKey} onClose={() => setDrawerKey(null)} />}
    </div>
  );
}

function Summary({ label, value, tone = '' }) {
  return (
    <div className={`summary ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Sortable({ label, sortKey, sort, onSort }) {
  const active = sort.key === sortKey;
  return (
    <th>
      <button className="sort" onClick={() => onSort(sortKey)} aria-sort={active ? sort.dir : 'none'}>
        {label} <span>{active ? (sort.dir === 'asc' ? '↑' : '↓') : '↕'}</span>
      </button>
    </th>
  );
}

function StatusPill({ status }) {
  return <span className={`pill ${status}`}>{statusLabel(status)}</span>;
}

function ActionMenu({ keyRow, open, onToggle, onAction }) {
  const actions = [
    ['rotate', 'Rotate'],
    ['revoke', 'Revoke'],
    ['scopes', 'Edit scopes'],
    ['audit', 'View audit trail']
  ];

  return (
    <div className="menu">
      <button className="icon-btn" aria-haspopup="menu" aria-expanded={open} onClick={onToggle}>⋯</button>
      {open && (
        <div className="popover" role="menu">
          {actions.map(([id, label]) => (
            <button key={id} role="menuitem" className={id === 'revoke' ? 'danger-item' : ''} onClick={() => onAction(id, keyRow)}>
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Drawer({ keyRow, onClose }) {
  return (
    <div className="drawer-backdrop" role="presentation" onMouseDown={onClose}>
      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title" onMouseDown={(e) => e.stopPropagation()}>
        <header>
          <div>
            <p className="eyebrow">Audit detail</p>
            <h2 id="drawer-title">{keyRow.name}</h2>
            <p className="muted mono">{keyRow.fingerprint}</p>
          </div>
          <button className="icon-btn" aria-label="Close audit drawer" onClick={onClose}>×</button>
        </header>

        <section className="drawer-grid">
          <div><span>Owner</span><strong>{keyRow.owner}</strong></div>
          <div><span>Team</span><strong>{keyRow.team}</strong></div>
          <div><span>Last used</span><strong>{relative(keyRow.lastUsed)}</strong></div>
          <div><span>Expires</span><strong>{relative(keyRow.expires)}</strong></div>
          <div><span>Source</span><strong>{keyRow.origin}</strong></div>
          <div><span>Last IP</span><strong>{keyRow.ip}</strong></div>
        </section>

        <section>
          <h3>Permissions</h3>
          <div className="drawer-scopes">
            {keyRow.scopes.map((scope) => <span key={scope} className={scope.includes('*') ? 'scope risk' : 'scope'}>{scope}</span>)}
          </div>
        </section>

        <section>
          <h3>Rotation health</h3>
          <div className="health-line">
            <StatusPill status={effectiveStatus(keyRow)} />
            <span>{keyRow.overScoped ? 'High privilege surface detected. Review wildcard and write scopes.' : 'No hygiene exception currently open.'}</span>
          </div>
        </section>

        <section>
          <h3>Event trail</h3>
          <ol className="timeline">
            {keyRow.events.map((event, index) => (
              <li key={index}>
                <time>{formatDate(event.time)} · {relative(event.time)}</time>
                <strong>{event.type}</strong>
                <p>{event.detail}</p>
                <span>Actor: {event.actor}</span>
              </li>
            ))}
          </ol>
        </section>

        <footer>
          <button>Rotate key</button>
          <button>Edit scopes</button>
          <button className="danger">Revoke key</button>
        </footer>
      </aside>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);