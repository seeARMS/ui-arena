import React, { useState, useMemo } from 'react';
import './styles.css';

const MOCK_DATA = Array.from({ length: 25 }, (_, i) => ({
  id: `key_${i}`,
  name: ['Production-Read', 'Staging-Write', 'CI-CD-Runner', 'Analytics-Bot', 'Internal-Tool'][i % 5],
  owner: ['Alice', 'Bob', 'Charlie', 'Dana', 'Eve'][i % 5],
  scopes: ['read:all', 'write:logs', 'admin:keys', 'read:metrics'][i % 4],
  lastUsed: i % 3 === 0 ? '2 mins ago' : i % 5 === 0 ? '3 months ago' : '1 day ago',
  created: '2023-10-01',
  expires: i % 4 === 0 ? '2023-12-01' : '2024-05-20',
  status: ['healthy', 'stale', 'expiring', 'leaked-suspected', 'revoked'][i % 5],
}));

export default function App() {
  const [selected, setSelected] = useState([]);
  const [filter, setFilter] = useState('all');
  const [drawer, setDrawer] = useState(null);

  const filteredData = useMemo(() => {
    if (filter === 'all') return MOCK_DATA;
    return MOCK_DATA.filter(d => d.status === filter || (filter === 'over-scoped' && d.scopes === 'admin:keys'));
  }, [filter]);

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="admin-container">
      <header className="summary-strip">
        <div><span>Total Keys</span><strong>{MOCK_DATA.length}</strong></div>
        <div><span>Active</span><strong>{MOCK_DATA.filter(x => x.status === 'healthy').length}</strong></div>
        <div><span>Over-scoped</span><strong>{MOCK_DATA.filter(x => x.scopes === 'admin:keys').length}</strong></div>
        <div><span>Expiring</span><strong>{MOCK_DATA.filter(x => x.status === 'expiring').length}</strong></div>
      </header>

      <div className="controls">
        <input type="search" placeholder="Search keys..." />
        <div className="filters">
          {['all', 'active', 'stale', 'expiring', 'over-scoped'].map(f => (
            <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
      </div>

      <table className="key-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Name</th><th>Owner</th><th>Scopes</th><th>Last Used</th><th>Expires</th><th>Status</th><th></th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(row => (
            <tr key={row.id} onClick={() => setDrawer(row)}>
              <td><input type="checkbox" checked={selected.includes(row.id)} onChange={() => toggleSelect(row.id)} /></td>
              <td>{row.name}</td>
              <td>{row.owner}</td>
              <td><code>{row.scopes}</code></td>
              <td>{row.lastUsed}</td>
              <td>{row.expires}</td>
              <td><span className={`pill ${row.status}`}>{row.status}</span></td>
              <td><button className="action-btn">⋮</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {drawer && (
        <div className="drawer">
          <div className="drawer-header">
            <h3>{drawer.name}</h3>
            <button onClick={() => setDrawer(null)}>✕</button>
          </div>
          <div className="drawer-body">
            <p><strong>Owner:</strong> {drawer.owner}</p>
            <p><strong>Status:</strong> {drawer.status}</p>
            <hr />
            <h4>Audit Trail</h4>
            <ul><li>Key rotated 2 days ago</li><li>Access granted by Admin</li></ul>
          </div>
        </div>
      )}

      {selected.length > 0 && (
        <div className="sticky-bar">
          <span>{selected.length} keys selected</span>
          <button>Revoke Selected</button>
        </div>
      )}
    </div>
  );
}