import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { mockKeys } from './mockData.js'
import { format, formatDistanceToNow, isAfter, isBefore, addDays } from 'date-fns'
import './styles.css'

const STATUS_CONFIG = {
  'healthy': { label: 'Healthy', color: '#238636', bg: '#0d1f0d' },
  'stale': { label: 'Stale', color: '#d29922', bg: '#2a1f00' },
  'expiring': { label: 'Expiring', color: '#db6d28', bg: '#2a1500' },
  'leaked-suspected': { label: 'Leak Suspected', color: '#f85149', bg: '#2d0a0a' },
  'revoked': { label: 'Revoked', color: '#8b949e', bg: '#161b22' },
}

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'stale', label: 'Stale' },
  { key: 'expiring', label: 'Expiring' },
  { key: 'over-scoped', label: 'Over-scoped' },
]

function StatusPill({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.healthy
  return (
    <span className="status-pill" style={{ color: cfg.color, background: cfg.bg, borderColor: cfg.color }}>
      <span className="status-dot" style={{ background: cfg.color }} />
      {cfg.label}
    </span>
  )
}

function ScopeBadges({ scopes, max = 3 }) {
  const shown = scopes.slice(0, max)
  const rest = scopes.length - max
  return (
    <span className="scope-badges">
      {shown.map(s => <span key={s} className="scope-badge">{s}</span>)}
      {rest > 0 && <span className="scope-badge scope-more">+{rest}</span>}
    </span>
  )
}

function ActionPopover({ keyData, onClose, onAction }) {
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onClose])

  const actions = [
    { id: 'rotate', label: '↻ Rotate Key', disabled: keyData.status === 'revoked' },
    { id: 'revoke', label: '⊘ Revoke', disabled: keyData.status === 'revoked' },
    { id: 'edit-scopes', label: '✎ Edit Scopes', disabled: keyData.status === 'revoked' },
    { id: 'audit', label: '⊞ View Audit Trail' },
  ]

  return (
    <div className="action-popover" ref={ref} role="menu">
      {actions.map(a => (
        <button
          key={a.id}
          className="action-item"
          role="menuitem"
          disabled={a.disabled}
          onClick={(e) => { e.stopPropagation(); onAction(a.id, keyData); onClose() }}
        >
          {a.label}
        </button>
      ))}
    </div>
  )
}

function AuditDrawer({ keyData, onClose }) {
  if (!keyData) return null

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <aside className="audit-drawer" role="dialog" aria-label="Audit details">
        <div className="drawer-header">
          <div>
            <h2 className="drawer-title">{keyData.name}</h2>
            <span className="drawer-subtitle">{keyData.keyPrefix}</span>
          </div>
          <button className="drawer-close" onClick={onClose} aria-label="Close drawer">✕</button>
        </div>

        <div className="drawer-body">
          <div className="drawer-meta">
            <div className="meta-row">
              <span className="meta-label">Owner</span>
              <span className="meta-value">{keyData.owner}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Status</span>
              <span className="meta-value"><StatusPill status={keyData.status} /></span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Created</span>
              <span className="meta-value">{format(keyData.created, 'MMM d, yyyy HH:mm')}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Expires</span>
              <span className="meta-value">{format(keyData.expires, 'MMM d, yyyy HH:mm')}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Last Used</span>
              <span className="meta-value">{formatDistanceToNow(keyData.lastUsed, { addSuffix: true })}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Rotations</span>
              <span className="meta-value">{keyData.rotationCount}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">Scopes</span>
              <span className="meta-value"><ScopeBadges scopes={keyData.scopes} max={10} /></span>
            </div>
          </div>

          <h3 className="drawer-section-title">Audit Trail ({keyData.auditEvents.length} events)</h3>
          <div className="audit-timeline">
            {keyData.auditEvents.map((evt, i) => (
              <div key={i} className={`audit-event ${evt.type === 'leak_detected' ? 'audit-event-danger' : ''}`}>
                <div className="audit-event-header">
                  <span className={`audit-event-type audit-type-${evt.type}`}>{evt.type.replace(/_/g, ' ')}</span>
                  <span className="audit-event-time">{format(evt.timestamp, 'MMM d, HH:mm:ss')}</span>
                </div>
                <div className="audit-event-detail">{evt.detail}</div>
                <div className="audit-event-actor">by {evt.actor}</div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}

function SummaryStrip({ keys }) {
  const now = new Date()
  const weekFromNow = addDays(now, 7)

  const total = keys.length
  const active = keys.filter(k => k.status !== 'revoked').length
  const overScoped = keys.filter(k => k.isOverScoped && k.status !== 'revoked').length
  const expiringThisWeek = keys.filter(k =>
    k.status !== 'revoked' && isBefore(k.expires, weekFromNow) && isAfter(k.expires, now)
  ).length
  const leaked = keys.filter(k => k.status === 'leaked-suspected').length

  return (
    <div className="summary-strip">
      <div className="summary-item">
        <span className="summary-value">{total}</span>
        <span className="summary-label">Total Keys</span>
      </div>
      <div className="summary-item">
        <span className="summary-value summary-active">{active}</span>
        <span className="summary-label">Active</span>
      </div>
      <div className="summary-item">
        <span className="summary-value summary-warn">{overScoped}</span>
        <span className="summary-label">Over-scoped</span>
      </div>
      <div className="summary-item">
        <span className="summary-value summary-expiring">{expiringThisWeek}</span>
        <span className="summary-label">Expiring 7d</span>
      </div>
      {leaked > 0 && (
        <div className="summary-item summary-item-danger">
          <span className="summary-value summary-danger">{leaked}</span>
          <span className="summary-label">Leak Suspected</span>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [sortCol, setSortCol] = useState('status')
  const [sortDir, setSortDir] = useState('asc')
  const [selected, setSelected] = useState(new Set())
  const [popoverKey, setPopoverKey] = useState(null)
  const [drawerKey, setDrawerKey] = useState(null)
  const [toast, setToast] = useState(null)

  const showToast = useCallback((msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }, [])

  const handleAction = useCallback((action, keyData) => {
    if (action === 'audit') {
      setDrawerKey(keyData)
    } else {
      showToast(`${action} → ${keyData.name}`)
    }
  }, [showToast])

  const statusOrder = { 'leaked-suspected': 0, 'expiring': 1, 'stale': 2, 'healthy': 3, 'revoked': 4 }

  const filteredKeys = useMemo(() => {
    let result = [...mockKeys]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(k =>
        k.name.toLowerCase().includes(q) ||
        k.owner.toLowerCase().includes(q) ||
        k.keyPrefix.toLowerCase().includes(q) ||
        k.scopes.some(s => s.toLowerCase().includes(q))
      )
    }

    switch (filter) {
      case 'active': result = result.filter(k => k.status !== 'revoked'); break
      case 'stale': result = result.filter(k => k.status === 'stale'); break
      case 'expiring': result = result.filter(k => k.status === 'expiring'); break
      case 'over-scoped': result = result.filter(k => k.isOverScoped); break
    }

    result.sort((a, b) => {
      let cmp = 0
      switch (sortCol) {
        case 'name': cmp = a.name.localeCompare(b.name); break
        case 'owner': cmp = a.owner.localeCompare(b.owner); break
        case 'scopes': cmp = a.scopes.length - b.scopes.length; break
        case 'lastUsed': cmp = a.lastUsed - b.lastUsed; break
        case 'created': cmp = a.created - b.created; break
        case 'expires': cmp = a.expires - b.expires; break
        case 'status': cmp = (statusOrder[a.status] ?? 5) - (statusOrder[b.status] ?? 5); break
        default: cmp = 0
      }
      return sortDir === 'asc' ? cmp : -cmp
    })

    return result
  }, [search, filter, sortCol, sortDir])

  const toggleSort = (col) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortCol(col); setSortDir('asc') }
  }

  const toggleSelect = (id) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  const toggleAll = () => {
    if (selected.size === filteredKeys.length) setSelected(new Set())
    else setSelected(new Set(filteredKeys.map(k => k.id)))
  }

  const SortHeader = ({ col, children }) => (
    <th
      className="sortable-th"
      onClick={() => toggleSort(col)}
      aria-sort={sortCol === col ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
    >
      <span className="th-content">
        {children}
        {sortCol === col && <span className="sort-arrow">{sortDir === 'asc' ? '↑' : '↓'}</span>}
      </span>
    </th>
  )

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-top">
          <h1 className="app-title">API Keys</h1>
          <span className="header-env">production</span>
        </div>
        <SummaryStrip keys={mockKeys} />
      </header>

      <div className="toolbar">
        <div className="toolbar-left">
          <input
            type="search"
            className="search-input"
            placeholder="Search keys, owners, scopes…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search API keys"
          />
          <div className="filter-segments" role="tablist">
            {FILTERS.map(f => (
              <button
                key={f.key}
                role="tab"
                aria-selected={filter === f.key}
                className={`filter-btn ${filter === f.key ? 'filter-active' : ''}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <span className="result-count">{filteredKeys.length} keys</span>
      </div>

      {selected.size > 0 && (
        <div className="bulk-bar">
          <span className="bulk-count">{selected.size} selected</span>
          <button className="bulk-btn" onClick={() => { showToast(`Rotating ${selected.size} keys`); setSelected(new Set()) }}>Rotate Selected</button>
          <button className="bulk-btn bulk-btn-danger" onClick={() => { showToast(`Revoking ${selected.size} keys`); setSelected(new Set()) }}>Revoke Selected</button>
          <button className="bulk-btn-ghost" onClick={() => setSelected(new Set())}>Clear</button>
        </div>
      )}

      <div className="table-wrapper">
        <table className="keys-table" role="grid">
          <thead>
            <tr>
              <th className="th-check">
                <input
                  type="checkbox"
                  checked={filteredKeys.length > 0 && selected.size === filteredKeys.length}
                  onChange={toggleAll}
                  aria-label="Select all"
                />
              </th>
              <SortHeader col="name">Name</SortHeader>
              <SortHeader col="owner">Owner</SortHeader>
              <SortHeader col="scopes">Scopes</SortHeader>
              <SortHeader col="lastUsed">Last Used</SortHeader>
              <SortHeader col="created">Created</SortHeader>
              <SortHeader col="expires">Expires</SortHeader>
              <SortHeader col="status">Status</SortHeader>
              <th className="th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredKeys.map(k => (
              <tr
                key={k.id}
                className={`table-row ${selected.has(k.id) ? 'row-selected' : ''} ${k.status === 'leaked-suspected' ? 'row-danger' : ''}`}
                onClick={() => setDrawerKey(k)}
              >
                <td className="td-check" onClick={e => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selected.has(k.id)}
                    onChange={() => toggleSelect(k.id)}
                    aria-label={`Select ${k.name}`}
                  />
                </td>
                <td className="td-name">
                  <div className="name-cell">
                    <span className="key-name">{k.name}</span>
                    <span className="key-prefix">{k.keyPrefix}</span>
                  </div>
                </td>
                <td className="td-owner">{k.owner}</td>
                <td className="td-scopes">
                  <ScopeBadges scopes={k.scopes} />
                  {k.isOverScoped && <span className="overscoped-flag" title="Over-scoped">⚠</span>}
                </td>
                <td className="td-time">{formatDistanceToNow(k.lastUsed, { addSuffix: true })}</td>
                <td className="td-time">{format(k.created, 'MMM d, yyyy')}</td>
                <td className="td-time">{format(k.expires, 'MMM d, yyyy')}</td>
                <td className="td-status"><StatusPill status={k.status} /></td>
                <td className="td-actions" onClick={e => e.stopPropagation()}>
                  <div className="actions-cell">
                    <button
                      className="action-trigger"
                      onClick={() => setPopoverKey(popoverKey === k.id ? null : k.id)}
                      aria-label={`Actions for ${k.name}`}
                      aria-haspopup="menu"
                    >
                      ⋯
                    </button>
                    {popoverKey === k.id && (
                      <ActionPopover
                        keyData={k}
                        onClose={() => setPopoverKey(null)}
                        onAction={handleAction}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile stacked list */}
        <div className="mobile-list">
          {filteredKeys.map(k => (
            <div
              key={k.id}
              className={`mobile-card ${k.status === 'leaked-suspected' ? 'mobile-card-danger' : ''}`}
              onClick={() => setDrawerKey(k)}
            >
              <div className="mobile-card-header">
                <input
                  type="checkbox"
                  checked={selected.has(k.id)}
                  onChange={(e) => { e.stopPropagation(); toggleSelect(k.id) }}
                  aria-label={`Select ${k.name}`}
                />
                <div className="mobile-card-title">
                  <span className="key-name">{k.name}</span>
                  <span className="key-prefix">{k.keyPrefix}</span>
                </div>
                <StatusPill status={k.status} />
              </div>
              <div className="mobile-card-body">
                <div className="mobile-meta">
                  <span className="mobile-label">Owner:</span> {k.owner}
                </div>
                <div className="mobile-meta">
                  <span className="mobile-label">Last used:</span> {formatDistanceToNow(k.lastUsed, { addSuffix: true })}
                </div>
                <div className="mobile-meta">
                  <span className="mobile-label">Expires:</span> {format(k.expires, 'MMM d, yyyy')}
                </div>
                <div className="mobile-meta">
                  <span className="mobile-label">Scopes:</span> <ScopeBadges scopes={k.scopes} max={2} />
                  {k.isOverScoped && <span className="overscoped-flag">⚠</span>}
                </div>
              </div>
              <div className="mobile-card-actions" onClick={e => e.stopPropagation()}>
                <button className="mobile-action-btn" onClick={() => handleAction('rotate', k)}>Rotate</button>
                <button className="mobile-action-btn" onClick={() => handleAction('revoke', k)}>Revoke</button>
                <button className="mobile-action-btn" onClick={() => handleAction('audit', k)}>Audit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {drawerKey && <AuditDrawer keyData={drawerKey} onClose={() => setDrawerKey(null)} />}

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}