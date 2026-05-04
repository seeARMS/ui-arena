import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, MoreVertical, RotateCw, XCircle, Edit3, FileText, X, AlertTriangle, CheckCircle2, Clock, Shield } from 'lucide-react';
import { generateMockKeys } from './mockData';
import './App.css';

const FILTERS = ['all', 'active', 'stale', 'expiring', 'over-scoped'];

function App() {
  const [keys, setKeys] = useState(generateMockKeys(25));
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'lastUsed', direction: 'desc' });
  const [selectedKeys, setSelectedKeys] = useState(new Set());
  const [openPopover, setOpenPopover] = useState(null);
  const [drawerKey, setDrawerKey] = useState(null);

  const filteredAndSortedKeys = useMemo(() => {
    let filtered = keys.filter(key => {
      const matchesSearch = 
        key.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        key.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        key.scopes.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      switch (activeFilter) {
        case 'active':
          return key.status === 'healthy';
        case 'stale':
          return key.status === 'stale';
        case 'expiring':
          return key.status === 'expiring';
        case 'over-scoped':
          return key.overScoped;
        default:
          return true;
      }
    });

    filtered.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === 'lastUsed' || sortConfig.key === 'created' || sortConfig.key === 'expires') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      if (sortConfig.key === 'scopes') {
        aVal = a.scopes.length;
        bVal = b.scopes.length;
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [keys, searchQuery, activeFilter, sortConfig]);

  const stats = useMemo(() => {
    const total = keys.length;
    const active = keys.filter(k => k.status === 'healthy').length;
    const overScoped = keys.filter(k => k.overScoped).length;
    const expiringThisWeek = keys.filter(k => {
      const daysUntilExpiry = Math.floor((new Date(k.expires) - new Date()) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry <= 7 && daysUntilExpiry >= 0;
    }).length;

    return { total, active, overScoped, expiringThisWeek };
  }, [keys]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedKeys(new Set(filteredAndSortedKeys.map(k => k.id)));
    } else {
      setSelectedKeys(new Set());
    }
  };

  const handleSelectKey = (id) => {
    const newSelected = new Set(selectedKeys);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedKeys(newSelected);
  };

  const handleAction = (action, keyId) => {
    setOpenPopover(null);
    
    if (action === 'view') {
      const key = keys.find(k => k.id === keyId);
      setDrawerKey(key);
      return;
    }

    setKeys(prev => prev.map(k => {
      if (k.id === keyId) {
        switch (action) {
          case 'rotate':
            return { ...k, status: 'healthy', lastUsed: new Date().toISOString(), created: new Date().toISOString() };
          case 'revoke':
            return { ...k, status: 'revoked' };
          case 'edit':
            return { ...k, overScoped: false };
          default:
            return k;
        }
      }
      return k;
    }));
  };

  const handleBulkAction = (action) => {
    setKeys(prev => prev.map(k => {
      if (selectedKeys.has(k.id)) {
        switch (action) {
          case 'revoke':
            return { ...k, status: 'revoked' };
          case 'rotate':
            return { ...k, status: 'healthy', lastUsed: new Date().toISOString(), created: new Date().toISOString() };
          default:
            return k;
        }
      }
      return k;
    }));
    setSelectedKeys(new Set());
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>API Key Management</h1>
          <div className="stats-strip">
            <div className="stat">
              <span className="stat-label">Total Keys</span>
              <span className="stat-value">{stats.total}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Active</span>
              <span className="stat-value stat-success">{stats.active}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Over-scoped</span>
              <span className="stat-value stat-warning">{stats.overScoped}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Expiring This Week</span>
              <span className="stat-value stat-danger">{stats.expiringThisWeek}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="controls">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search keys, owners, scopes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filters">
            {FILTERS.map(filter => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th className="checkbox-col">
                  <input
                    type="checkbox"
                    checked={selectedKeys.size === filteredAndSortedKeys.length && filteredAndSortedKeys.length > 0}
                    onChange={handleSelectAll}
                    aria-label="Select all keys"
                  />
                </th>
                <th onClick={() => handleSort('name')} className="sortable">
                  Name {sortConfig.key === 'name' && <ChevronDown size={14} className={sortConfig.direction === 'asc' ? 'flip' : ''} />}
                </th>
                <th onClick={() => handleSort('owner')} className="sortable">
                  Owner {sortConfig.key === 'owner' && <ChevronDown size={14} className={sortConfig.direction === 'asc' ? 'flip' : ''} />}
                </th>
                <th onClick={() => handleSort('scopes')} className="sortable">
                  Scopes {sortConfig.key === 'scopes' && <ChevronDown size={14} className={sortConfig.direction === 'asc' ? 'flip' : ''} />}
                </th>
                <th onClick={() => handleSort('lastUsed')} className="sortable">
                  Last Used {sortConfig.key === 'lastUsed' && <ChevronDown size={14} className={sortConfig.direction === 'asc' ? 'flip' : ''} />}
                </th>
                <th onClick={() => handleSort('created')} className="sortable">
                  Created {sortConfig.key === 'created' && <ChevronDown size={14} className={sortConfig.direction === 'asc' ? 'flip' : ''} />}
                </th>
                <th onClick={() => handleSort('expires')} className="sortable">
                  Expires {sortConfig.key === 'expires' && <ChevronDown size={14} className={sortConfig.direction === 'asc' ? 'flip' : ''} />}
                </th>
                <th>Status</th>
                <th className="actions-col"></th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedKeys.map(key => (
                <tr key={key.id} onClick={() => setDrawerKey(key)} className="clickable-row">
                  <td className="checkbox-col" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedKeys.has(key.id)}
                      onChange={() => handleSelectKey(key.id)}
                      aria-label={`Select ${key.name}`}
                    />
                  </td>
                  <td className="key-name">
                    <div className="name-cell">
                      <span className="name">{key.name}</span>
                      {key.overScoped && <AlertTriangle size={14} className="warning-icon" />}
                    </div>
                  </td>
                  <td>{key.owner}</td>
                  <td>
                    <div className="scopes">
                      {key.scopes.slice(0, 2).map((scope, i) => (
                        <span key={i} className="scope-badge">{scope}</span>
                      ))}
                      {key.scopes.length > 2 && (
                        <span className="scope-badge more">+{key.scopes.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="date-cell">{formatRelativeTime(key.lastUsed)}</td>
                  <td className="date-cell">{formatDate(key.created)}</td>
                  <td className="date-cell">{formatDate(key.expires)}</td>
                  <td>
                    <StatusPill status={key.status} />
                  </td>
                  <td className="actions-col" onClick={(e) => e.stopPropagation()}>
                    <button
                      className="icon-btn"
                      onClick={() => setOpenPopover(openPopover === key.id ? null : key.id)}
                      aria-label="Actions"
                    >
                      <MoreVertical size={16} />
                    </button>
                    {openPopover === key.id && (
                      <Popover onClose={() => setOpenPopover(null)}>
                        <button onClick={() => handleAction('rotate', key.id)}>
                          <RotateCw size={16} /> Rotate Key
                        </button>
                        <button onClick={() => handleAction('revoke', key.id)} className="danger">
                          <XCircle size={16} /> Revoke
                        </button>
                        <button onClick={() => handleAction('edit', key.id)}>
                          <Edit3 size={16} /> Edit Scopes
                        </button>
                        <button onClick={() => handleAction('view', key.id)}>
                          <FileText size={16} /> View Audit Trail
                        </button>
                      </Popover>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredAndSortedKeys.length === 0 && (
            <div className="empty-state">
              <p>No API keys found matching your criteria</p>
            </div>
          )}
        </div>

        <div className="mobile-list">
          {filteredAndSortedKeys.map(key => (
            <div key={key.id} className="mobile-card" onClick={() => setDrawerKey(key)}>
              <div className="mobile-card-header">
                <input
                  type="checkbox"
                  checked={selectedKeys.has(key.id)}
                  onChange={() => handleSelectKey(key.id)}
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Select ${key.name}`}
                />
                <div className="mobile-card-title">
                  <span className="name">{key.name}</span>
                  {key.overScoped && <AlertTriangle size={14} className="warning-icon" />}
                </div>
                <StatusPill status={key.status} />
              </div>
              <div className="mobile-card-body">
                <div className="mobile-row">
                  <span className="label">Owner:</span>
                  <span>{key.owner}</span>
                </div>
                <div className="mobile-row">
                  <span className="label">Scopes:</span>
                  <div className="scopes">
                    {key.scopes.slice(0, 2).map((scope, i) => (
                      <span key={i} className="scope-badge">{scope}</span>
                    ))}
                    {key.scopes.length > 2 && (
                      <span className="scope-badge more">+{key.scopes.length - 2}</span>
                    )}
                  </div>
                </div>
                <div className="mobile-row">
                  <span className="label">Last Used:</span>
                  <span>{formatRelativeTime(key.lastUsed)}</span>
                </div>
                <div className="mobile-row">
                  <span className="label">Expires:</span>
                  <span>{formatDate(key.expires)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedKeys.size > 0 && (
        <div className="bulk-actions">
          <div className="bulk-actions-content">
            <span className="bulk-count">{selectedKeys.size} selected</span>
            <div className="bulk-buttons">
              <button onClick={() => handleBulkAction('rotate')} className="bulk-btn">
                <RotateCw size={16} /> Rotate
              </button>
              <button onClick={() => handleBulkAction('revoke')} className="bulk-btn danger">
                <XCircle size={16} /> Revoke
              </button>
              <button onClick={() => setSelectedKeys(new Set())} className="bulk-btn">
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {drawerKey && (
        <Drawer key={drawerKey.id} keyData={drawerKey} onClose={() => setDrawerKey(null)} />
      )}
    </div>
  );
}

function StatusPill({ status }) {
  const config = {
    healthy: { icon: CheckCircle2, label: 'Healthy', className: 'status-healthy' },
    stale: { icon: Clock, label: 'Stale', className: 'status-stale' },
    expiring: { icon: AlertTriangle, label: 'Expiring', className: 'status-expiring' },
    'leaked-suspected': { icon: AlertTriangle, label: 'Leaked?', className: 'status-leaked' },
    revoked: { icon: XCircle, label: 'Revoked', className: 'status-revoked' },
  };

  const { icon: Icon, label, className } = config[status] || config.healthy;

  return (
    <span className={`status-pill ${className}`}>
      <Icon size={12} />
      {label}
    </span>
  );
}

function Popover({ children, onClose }) {
  return (
    <>
      <div className="popover-backdrop" onClick={onClose} />
      <div className="popover">
        {children}
      </div>
    </>
  );
}

function Drawer({ keyData, onClose }) {
  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="drawer">
        <div className="drawer-header">
          <div>
            <h2>{keyData.name}</h2>
            <p className="drawer-subtitle">{keyData.owner}</p>
          </div>
          <button onClick={onClose} className="icon-btn" aria-label="Close drawer">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-content">
          <section className="drawer-section">
            <h3>Key Details</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Status</span>
                <StatusPill status={keyData.status} />
              </div>
              <div className="detail-item">
                <span className="detail-label">Created</span>
                <span>{formatDate(keyData.created)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Last Used</span>
                <span>{formatRelativeTime(keyData.lastUsed)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Expires</span>
                <span>{formatDate(keyData.expires)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Key ID</span>
                <code className="key-id">{keyData.id}</code>
              </div>
            </div>
          </section>

          <section className="drawer-section">
            <h3>Scopes ({keyData.scopes.length})</h3>
            {keyData.overScoped && (
              <div className="warning-banner">
                <AlertTriangle size={16} />
                <span>This key has more scopes than typical for its usage pattern</span>
              </div>
            )}
            <div className="scopes-list">
              {keyData.scopes.map((scope, i) => (
                <span key={i} className="scope-badge large">{scope}</span>
              ))}
            </div>
          </section>

          <section className="drawer-section">
            <h3>Audit Trail</h3>
            <div className="audit-trail">
              {keyData.auditTrail.map((event, i) => (
                <div key={i} className="audit-event">
                  <div className="audit-icon">
                    {event.type === 'created' && <Shield size={14} />}
                    {event.type === 'used' && <CheckCircle2 size={14} />}
                    {event.type === 'rotated' && <RotateCw size={14} />}
                    {event.type === 'scope_modified' && <Edit3 size={14} />}
                  </div>
                  <div className="audit-details">
                    <div className="audit-action">{event.action}</div>
                    <div className="audit-meta">
                      {event.user} • {formatRelativeTime(event.timestamp)}
                    </div>
                    {event.details && (
                      <div className="audit-extra">{event.details}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  return formatDate(dateString);
}

export default App;