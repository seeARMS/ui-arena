import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, MoreVertical, RotateCw, XCircle, Edit3, FileText, AlertTriangle, CheckCircle2, Clock, Shield, Key } from 'lucide-react';
import { generateMockKeys } from './mockData';
import './App.css';

const FILTERS = ['all', 'active', 'stale', 'expiring', 'over-scoped'];

const STATUS_CONFIG = {
  healthy: { label: 'Healthy', color: '#10b981', icon: CheckCircle2 },
  stale: { label: 'Stale', color: '#f59e0b', icon: Clock },
  expiring: { label: 'Expiring', color: '#ef4444', icon: AlertTriangle },
  'leaked-suspected': { label: 'Leaked?', color: '#dc2626', icon: Shield },
  revoked: { label: 'Revoked', color: '#6b7280', icon: XCircle }
};

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
      const matchesSearch = searchQuery === '' || 
        key.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        key.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        key.scopes.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesFilter = activeFilter === 'all' || 
        (activeFilter === 'active' && key.status === 'healthy') ||
        (activeFilter === 'stale' && key.status === 'stale') ||
        (activeFilter === 'expiring' && key.status === 'expiring') ||
        (activeFilter === 'over-scoped' && key.scopes.length > 5);

      return matchesSearch && matchesFilter;
    });

    filtered.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

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
    const overScoped = keys.filter(k => k.scopes.length > 5).length;
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

  const toggleSelectKey = (id) => {
    const newSelected = new Set(selectedKeys);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedKeys(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedKeys.size === filteredAndSortedKeys.length) {
      setSelectedKeys(new Set());
    } else {
      setSelectedKeys(new Set(filteredAndSortedKeys.map(k => k.id)));
    }
  };

  const handleAction = (action, keyId) => {
    setOpenPopover(null);
    
    if (action === 'rotate') {
      setKeys(prev => prev.map(k => 
        k.id === keyId ? { ...k, lastRotated: new Date().toISOString(), status: 'healthy' } : k
      ));
    } else if (action === 'revoke') {
      setKeys(prev => prev.map(k => 
        k.id === keyId ? { ...k, status: 'revoked' } : k
      ));
    } else if (action === 'audit') {
      setDrawerKey(keys.find(k => k.id === keyId));
    }
  };

  const handleBulkAction = (action) => {
    if (action === 'revoke') {
      setKeys(prev => prev.map(k => 
        selectedKeys.has(k.id) ? { ...k, status: 'revoked' } : k
      ));
    } else if (action === 'rotate') {
      setKeys(prev => prev.map(k => 
        selectedKeys.has(k.id) ? { ...k, lastRotated: new Date().toISOString(), status: 'healthy' } : k
      ));
    }
    setSelectedKeys(new Set());
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
    return `${Math.floor(diffDays / 365)}y ago`;
  };

  const formatExpiry = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = date - now;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `${diffDays}d`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo`;
    return `${Math.floor(diffDays / 365)}y`;
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="header-title">
            <Key size={24} />
            <h1>API Key Management</h1>
          </div>
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
          <div className="search-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search keys, owners, scopes..."
              className="search-input"
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
                <th className="th-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedKeys.size === filteredAndSortedKeys.length && filteredAndSortedKeys.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th onClick={() => handleSort('name')} className="sortable">
                  Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('owner')} className="sortable">
                  Owner {sortConfig.key === 'owner' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('scopes')} className="sortable">
                  Scopes {sortConfig.key === 'scopes' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('lastUsed')} className="sortable">
                  Last Used {sortConfig.key === 'lastUsed' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('created')} className="sortable">
                  Created {sortConfig.key === 'created' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('expires')} className="sortable">
                  Expires {sortConfig.key === 'expires' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                </th>
                <th>Status</th>
                <th className="th-actions"></th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedKeys.map(key => {
                const StatusIcon = STATUS_CONFIG[key.status].icon;
                return (
                  <tr 
                    key={key.id} 
                    className={selectedKeys.has(key.id) ? 'selected' : ''}
                    onClick={(e) => {
                      if (!e.target.closest('input') && !e.target.closest('.actions-btn')) {
                        setDrawerKey(key);
                      }
                    }}
                  >
                    <td onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedKeys.has(key.id)}
                        onChange={() => toggleSelectKey(key.id)}
                      />
                    </td>
                    <td className="td-name">
                      <div className="key-name">{key.name}</div>
                      <div className="key-id">{key.id}</div>
                    </td>
                    <td>{key.owner}</td>
                    <td>
                      <div className="scopes">
                        {key.scopes.slice(0, 2).map((scope, i) => (
                          <span key={i} className="scope-badge">{scope}</span>
                        ))}
                        {key.scopes.length > 2 && (
                          <span className="scope-badge scope-more">+{key.scopes.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="td-date">{formatDate(key.lastUsed)}</td>
                    <td className="td-date">{formatDate(key.created)}</td>
                    <td className="td-date">{formatExpiry(key.expires)}</td>
                    <td>
                      <span 
                        className="status-pill" 
                        style={{ backgroundColor: `${STATUS_CONFIG[key.status].color}15`, color: STATUS_CONFIG[key.status].color }}
                      >
                        <StatusIcon size={12} />
                        {STATUS_CONFIG[key.status].label}
                      </span>
                    </td>
                    <td className="td-actions" onClick={(e) => e.stopPropagation()}>
                      <div className="actions-wrapper">
                        <button 
                          className="actions-btn"
                          onClick={() => setOpenPopover(openPopover === key.id ? null : key.id)}
                        >
                          <MoreVertical size={16} />
                        </button>
                        {openPopover === key.id && (
                          <div className="popover">
                            <button onClick={() => handleAction('rotate', key.id)}>
                              <RotateCw size={14} />
                              Rotate Key
                            </button>
                            <button onClick={() => handleAction('revoke', key.id)}>
                              <XCircle size={14} />
                              Revoke
                            </button>
                            <button onClick={() => handleAction('edit', key.id)}>
                              <Edit3 size={14} />
                              Edit Scopes
                            </button>
                            <button onClick={() => handleAction('audit', key.id)}>
                              <FileText size={14} />
                              View Audit Trail
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Mobile view */}
          <div className="mobile-list">
            {filteredAndSortedKeys.map(key => {
              const StatusIcon = STATUS_CONFIG[key.status].icon;
              return (
                <div 
                  key={key.id} 
                  className={`mobile-card ${selectedKeys.has(key.id) ? 'selected' : ''}`}
                  onClick={() => setDrawerKey(key)}
                >
                  <div className="mobile-card-header">
                    <input
                      type="checkbox"
                      checked={selectedKeys.has(key.id)}
                      onChange={() => toggleSelectKey(key.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="mobile-card-title">
                      <div className="key-name">{key.name}</div>
                      <div className="key-id">{key.id}</div>
                    </div>
                    <span 
                      className="status-pill" 
                      style={{ backgroundColor: `${STATUS_CONFIG[key.status].color}15`, color: STATUS_CONFIG[key.status].color }}
                    >
                      <StatusIcon size={12} />
                      {STATUS_CONFIG[key.status].label}
                    </span>
                  </div>
                  <div className="mobile-card-body">
                    <div className="mobile-row">
                      <span className="mobile-label">Owner:</span>
                      <span>{key.owner}</span>
                    </div>
                    <div className="mobile-row">
                      <span className="mobile-label">Scopes:</span>
                      <div className="scopes">
                        {key.scopes.slice(0, 2).map((scope, i) => (
                          <span key={i} className="scope-badge">{scope}</span>
                        ))}
                        {key.scopes.length > 2 && (
                          <span className="scope-badge scope-more">+{key.scopes.length - 2}</span>
                        )}
                      </div>
                    </div>
                    <div className="mobile-row">
                      <span className="mobile-label">Last Used:</span>
                      <span>{formatDate(key.lastUsed)}</span>
                    </div>
                    <div className="mobile-row">
                      <span className="mobile-label">Expires:</span>
                      <span>{formatExpiry(key.expires)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {selectedKeys.size > 0 && (
          <div className="bulk-actions">
            <div className="bulk-actions-content">
              <span className="bulk-count">{selectedKeys.size} selected</span>
              <div className="bulk-buttons">
                <button onClick={() => handleBulkAction('rotate')}>
                  <RotateCw size={16} />
                  Rotate
                </button>
                <button onClick={() => handleBulkAction('revoke')} className="danger">
                  <XCircle size={16} />
                  Revoke
                </button>
                <button onClick={() => setSelectedKeys(new Set())}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {drawerKey && (
          <div className="drawer-overlay" onClick={() => setDrawerKey(null)}>
            <div className="drawer" onClick={(e) => e.stopPropagation()}>
              <div className="drawer-header">
                <h2>Audit Trail</h2>
                <button onClick={() => setDrawerKey(null)} className="drawer-close">
                  <XCircle size={20} />
                </button>
              </div>
              <div className="drawer-body">
                <div className="drawer-section">
                  <h3>{drawerKey.name}</h3>
                  <p className="drawer-id">{drawerKey.id}</p>
                </div>
                
                <div className="drawer-section">
                  <div className="drawer-field">
                    <span className="drawer-label">Owner</span>
                    <span>{drawerKey.owner}</span>
                  </div>
                  <div className="drawer-field">
                    <span className="drawer-label">Status</span>
                    <span 
                      className="status-pill" 
                      style={{ backgroundColor: `${STATUS_CONFIG[drawerKey.status].color}15`, color: STATUS_CONFIG[drawerKey.status].color }}
                    >
                      {STATUS_CONFIG[drawerKey.status].label}
                    </span>
                  </div>
                  <div className="drawer-field">
                    <span className="drawer-label">Created</span>
                    <span>{new Date(drawerKey.created).toLocaleString()}</span>
                  </div>
                  <div className="drawer-field">
                    <span className="drawer-label">Last Used</span>
                    <span>{new Date(drawerKey.lastUsed).toLocaleString()}</span>
                  </div>
                  <div className="drawer-field">
                    <span className="drawer-label">Expires</span>
                    <span>{new Date(drawerKey.expires).toLocaleString()}</span>
                  </div>
                  <div className="drawer-field">
                    <span className="drawer-label">Last Rotated</span>
                    <span>{new Date(drawerKey.lastRotated).toLocaleString()}</span>
                  </div>
                </div>

                <div className="drawer-section">
                  <h4>Scopes ({drawerKey.scopes.length})</h4>
                  <div className="scopes-list">
                    {drawerKey.scopes.map((scope, i) => (
                      <span key={i} className="scope-badge">{scope}</span>
                    ))}
                  </div>
                </div>

                <div className="drawer-section">
                  <h4>Recent Activity</h4>
                  <div className="audit-events">
                    {drawerKey.auditEvents.map((event, i) => (
                      <div key={i} className="audit-event">
                        <div className="audit-event-header">
                          <span className="audit-event-type">{event.type}</span>
                          <span className="audit-event-time">{formatDate(event.timestamp)}</span>
                        </div>
                        <div className="audit-event-details">{event.details}</div>
                        <div className="audit-event-actor">by {event.actor}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;