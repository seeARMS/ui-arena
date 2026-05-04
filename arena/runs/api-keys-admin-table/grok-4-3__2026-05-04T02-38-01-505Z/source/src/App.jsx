import React, { useState, useMemo } from 'react'

const generateMockKeys = () => {
  const owners = [
    'alice@eng.company.com', 'bob@platform.company.com', 'carol@security.company.com',
    'dave@dev.company.com', 'eve@ops.company.com', 'frank@eng.company.com',
    'grace@data.company.com', 'henry@infra.company.com'
  ]
  const scopeOptions = [
    'read:users', 'write:repos', 'admin:keys', 'read:analytics', 'write:deploy',
    'read:logs', 'admin:org', 'read:metrics', 'write:secrets', 'read:audit'
  ]
  const now = new Date()
  const keys = []

  for (let i = 1; i <= 28; i++) {
    const owner = owners[i % owners.length]
    const numScopes = Math.floor(Math.random() * 4) + 1
    const scopes = []
    const used = new Set()
    for (let s = 0; s < numScopes; s++) {
      let idx = (i + s) % scopeOptions.length
      while (used.has(idx)) idx = (idx + 1) % scopeOptions.length
      used.add(idx)
      scopes.push(scopeOptions[idx])
    }

    const createdDays = Math.floor(Math.random() * 380) + 5
    const created = new Date(now.getTime() - createdDays * 86400000)

    const lastUsedDays = Math.floor(Math.random() * 95)
    const lastUsed = new Date(now.getTime() - lastUsedDays * 86400000)

    let expires = null
    let status = 'healthy'

    if (lastUsedDays > 55) status = 'stale'

    const expiresDays = Math.floor(Math.random() * 380) - 5
    if (expiresDays > 0) {
      expires = new Date(now.getTime() + expiresDays * 86400000)
      if (expiresDays < 7) status = 'expiring'
    }

    if (i % 5 === 0) status = 'leaked-suspected'
    if (i % 9 === 0) status = 'revoked'
    if (status === 'revoked') expires = null

    const overScoped = scopes.length > 3

    keys.push({
      id: i,
      name: `svc-api-${String(i).padStart(3, '0')}`,
      owner,
      scopes,
      lastUsed,
      created,
      expires,
      status,
      overScoped
    })
  }
  return keys
}

function App() {
  const [keys, setKeys] = useState(generateMockKeys())
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' })
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [drawerKey, setDrawerKey] = useState(null)
  const [popoverOpen, setPopoverOpen] = useState(null)
  const [editModal, setEditModal] = useState(null)

  const filteredKeys = useMemo(() => {
    let result = [...keys]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(k =>
        k.name.toLowerCase().includes(q) ||
        k.owner.toLowerCase().includes(q) ||
        k.scopes.some(s => s.toLowerCase().includes(q))
      )
    }

    if (activeFilter !== 'all') {
      if (activeFilter === 'active') {
        result = result.filter(k => k.status === 'healthy')
      } else if (activeFilter === 'stale') {
        result = result.filter(k => k.status === 'stale')
      } else if (activeFilter === 'expiring') {
        result = result.filter(k => k.status === 'expiring')
      } else if (activeFilter === 'over-scoped') {
        result = result.filter(k => k.overScoped)
      }
    }

    result.sort((a, b) => {
      let valA = a[sortConfig.key]
      let valB = b[sortConfig.key]

      if (['lastUsed', 'created', 'expires'].includes(sortConfig.key)) {
        valA = valA ? valA.getTime() : 0
        valB = valB ? valB.getTime() : 0
      } else if (sortConfig.key === 'scopes') {
        valA = valA.length
        valB = valB.length
      }

      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })

    return result
  }, [keys, search, activeFilter, sortConfig])

  const summary = useMemo(() => {
    const total = keys.length
    const active = keys.filter(k => k.status === 'healthy').length
    const overScoped = keys.filter(k => k.overScoped).length
    const expiringThisWeek = keys.filter(k => {
      if (!k.expires) return false
      const days = (k.expires.getTime() - Date.now()) / (1000 * 3600 * 24)
      return days > 0 && days < 7
    }).length
    return { total, active, overScoped, expiringThisWeek }
  }, [keys])

  const handleSort = (key) => {
    if (sortConfig.key === key) {
      setSortConfig({ key, direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' })
    } else {
      setSortConfig({ key, direction: 'asc' })
    }
  }

  const toggleSelect = (id) => {
    const newSet = new Set(selectedIds)
    if (newSet.has(id)) newSet.delete(id)
    else newSet.add(id)
    setSelectedIds(newSet)
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredKeys.length && filteredKeys.length > 0) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filteredKeys.map(k => k.id)))
    }
  }

  const handleBulkRevoke = () => {
    setKeys(prev => prev.map(k => selectedIds.has(k.id) ? { ...k, status: 'revoked' } : k))
    setSelectedIds(new Set())
  }

  const handleRotate = (id) => {
    setKeys(prev => prev.map(k => {
      if (k.id === id) {
        return { ...k, lastUsed: new Date(), status: 'healthy' }
      }
      return k
    }))
    setPopoverOpen(null)
  }

  const handleRevoke = (id) => {
    setKeys(prev => prev.map(k => k.id === id ? { ...k, status: 'revoked' } : k))
    setPopoverOpen(null)
  }

  const handleEditScopes = (id) => {
    const key = keys.find(k => k.id === id)
    setEditModal({ id, scopes: [...key.scopes] })
    setPopoverOpen(null)
  }

  const handleViewAudit = (id) => {
    const key = keys.find(k => k.id === id)
    setDrawerKey(key)
    setPopoverOpen(null)
  }

  const closeDrawer = () => setDrawerKey(null)

  const saveEditScopes = (newScopes) => {
    if (!editModal) return
    setKeys(prev => prev.map(k => k.id === editModal.id ? { ...k, scopes: newScopes } : k))
    setEditModal(null)
  }

  const formatDate = (date) => {
    if (!date) return '—'
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const formatRelative = (date) => {
    if (!date) return '—'
    const diff = Date.now() - date.getTime()
    const days = Math.floor(diff / (1000 * 3600 * 24))
    if (days === 0) return 'today'
    if (days === 1) return 'yesterday'
    if (days < 7) return `${days}d ago`
    if (days < 30) return `${Math.floor(days / 7)}w ago`
    return `${Math.floor(days / 30)}mo ago`
  }

  const getExpiresLabel = (date) => {
    if (!date) return '—'
    const diff = date.getTime() - Date.now()
    const days = Math.floor(diff / (1000 * 3600 * 24))
    if (days < 0) return 'expired'
    if (days === 0) return 'today'
    if (days < 7) return `${days}d`
    return formatDate(date)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800'
      case 'stale': return 'bg-yellow-100 text-yellow-800'
      case 'expiring': return 'bg-orange-100 text-orange-800'
      case 'leaked-suspected': return 'bg-red-100 text-red-800'
      case 'revoked': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-gray-900">API Key Management</h1>
          <p className="text-sm text-gray-500">Platform Engineering • Key Hygiene Audit</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="bg-white border border-gray-200 rounded p-3">
            <div className="text-xs text-gray-500">TOTAL KEYS</div>
            <div className="text-2xl font-semibold">{summary.total}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded p-3">
            <div className="text-xs text-gray-500">ACTIVE</div>
            <div className="text-2xl font-semibold text-green-600">{summary.active}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded p-3">
            <div className="text-xs text-gray-500">OVER-SCOPED</div>
            <div className="text-2xl font-semibold text-orange-600">{summary.overScoped}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded p-3">
            <div className="text-xs text-gray-500">EXPIRING THIS WEEK</div>
            <div className="text-2xl font-semibold text-red-600">{summary.expiringThisWeek}</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-3 items-center">
          <input
            type="text"
            placeholder="Search keys, owners, scopes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
          />
          <div className="flex gap-1 text-sm flex-wrap">
            {['all', 'active', 'stale', 'expiring', 'over-scoped'].map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1 rounded ${activeFilter === f ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table-dense w-full text-sm">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="w-8 px-3 py-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.size === filteredKeys.length && filteredKeys.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="text-left px-3 py-2 font-medium cursor-pointer" onClick={() => handleSort('name')}>
                    Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-left px-3 py-2 font-medium cursor-pointer" onClick={() => handleSort('owner')}>
                    Owner {sortConfig.key === 'owner' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-left px-3 py-2 font-medium cursor-pointer" onClick={() => handleSort('scopes')}>
                    Scopes {sortConfig.key === 'scopes' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-left px-3 py-2 font-medium cursor-pointer" onClick={() => handleSort('lastUsed')}>
                    Last Used {sortConfig.key === 'lastUsed' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-left px-3 py-2 font-medium cursor-pointer" onClick={() => handleSort('created')}>
                    Created {sortConfig.key === 'created' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-left px-3 py-2 font-medium cursor-pointer" onClick={() => handleSort('expires')}>
                    Expires {sortConfig.key === 'expires' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="text-left px-3 py-2 font-medium cursor-pointer" onClick={() => handleSort('status')}>
                    Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="w-10 px-3 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredKeys.length === 0 ? (
                  <tr><td colSpan="9" className="px-3 py-8 text-center text-gray-500">No keys found</td></tr>
                ) : (
                  filteredKeys.map(key => (
                    <tr key={key.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setDrawerKey(key)}>
                      <td className="px-3 py-2" onClick={e => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedIds.has(key.id)}
                          onChange={() => toggleSelect(key.id)}
                        />
                      </td>
                      <td className="px-3 py-2 font-mono text-xs">{key.name}</td>
                      <td className="px-3 py-2 text-xs text-gray-600">{key.owner}</td>
                      <td className="px-3 py-2">
                        <div className="flex flex-wrap gap-1">
                          {key.scopes.slice(0, 3).map((s, i) => (
                            <span key={i} className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px]">{s}</span>
                          ))}
                          {key.scopes.length > 3 && <span className="text-[10px] text-gray-500">+{key.scopes.length - 3}</span>}
                        </div>
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-600">{formatRelative(key.lastUsed)}</td>
                      <td className="px-3 py-2 text-xs text-gray-600">{formatDate(key.created)}</td>
                      <td className="px-3 py-2 text-xs text-gray-600">{getExpiresLabel(key.expires)}</td>
                      <td className="px-3 py-2">
                        <span className={`status-pill px-2 py-0.5 rounded-full font-medium ${getStatusColor(key.status)}`}>
                          {key.status}
                        </span>
                        {key.overScoped && <span className="ml-1 text-[10px] text-orange-600">over</span>}
                      </td>
                      <td className="px-3 py-2 relative text-right" onClick={e => e.stopPropagation()}>
                        <button
                          onClick={() => setPopoverOpen(popoverOpen === key.id ? null : key.id)}
                          className="text-gray-400 hover:text-gray-600 px-1"
                        >
                          ⋮
                        </button>
                        {popoverOpen === key.id && (
                          <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded shadow-lg z-10 text-sm">
                            <button onClick={() => handleRotate(key.id)} className="block w-full text-left px-3 py-1.5 hover:bg-gray-50">Rotate key</button>
                            <button onClick={() => handleRevoke(key.id)} className="block w-full text-left px-3 py-1.5 hover:bg-gray-50 text-red-600">Revoke key</button>
                            <button onClick={() => handleEditScopes(key.id)} className="block w-full text-left px-3 py-1.5 hover:bg-gray-50">Edit scopes</button>
                            <button onClick={() => handleViewAudit(key.id)} className="block w-full text-left px-3 py-1.5 hover:bg-gray-50 border-t">View audit trail</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selectedIds.size > 0 && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white border border-gray-300 shadow-lg rounded px-4 py-2 flex items-center gap-4 text-sm z-50">
            <span>{selectedIds.size} selected</span>
            <button onClick={handleBulkRevoke} className="px-3 py-1 bg-red-600 text-white rounded text-xs">Revoke selected</button>
            <button onClick={() => setSelectedIds(new Set())} className="px-3 py-1 border rounded text-xs">Clear</button>
          </div>
        )}

        {drawerKey && (
          <div className="fixed inset-0 bg-black/30 z-50" onClick={closeDrawer}>
            <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-xl overflow-auto" onClick={e => e.stopPropagation()}>
              <div className="p-4 border-b flex justify-between items-center">
                <div>
                  <div className="font-semibold">{drawerKey.name}</div>
                  <div className="text-sm text-gray-500">{drawerKey.owner}</div>
                </div>
                <button onClick={closeDrawer} className="text-xl">×</button>
              </div>
              <div className="p-4 space-y-4 text-sm">
                <div>
                  <div className="font-medium mb-1">Details</div>
                  <div className="grid grid-cols-2 gap-y-2">
                    <div className="text-gray-500">Status</div>
                    <div><span className={`status-pill px-2 py-0.5 rounded-full ${getStatusColor(drawerKey.status)}`}>{drawerKey.status}</span></div>
                    <div className="text-gray-500">Created</div><div>{formatDate(drawerKey.created)}</div>
                    <div className="text-gray-500">Last used</div><div>{formatRelative(drawerKey.lastUsed)}</div>
                    <div className="text-gray-500">Expires</div><div>{getExpiresLabel(drawerKey.expires)}</div>
                    <div className="text-gray-500">Over-scoped</div><div>{drawerKey.overScoped ? 'Yes' : 'No'}</div>
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-1">Scopes</div>
                  <div className="flex flex-wrap gap-1">
                    {drawerKey.scopes.map((s, i) => <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-xs">{s}</span>)}
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-1">Audit Trail</div>
                  <div className="space-y-2 text-xs">
                    <div className="border-l-2 border-gray-300 pl-3">
                      <div className="text-gray-500">2024-04-28 14:22 • alice@eng</div>
                      <div>Key rotated</div>
                    </div>
                    <div className="border-l-2 border-gray-300 pl-3">
                      <div className="text-gray-500">2024-04-15 09:10 • system</div>
                      <div>Scopes updated: added admin:keys</div>
                    </div>
                    <div className="border-l-2 border-gray-300 pl-3">
                      <div className="text-gray-500">2024-03-22 11:45 • bob@platform</div>
                      <div>Key created</div>
                    </div>
                    <div className="border-l-2 border-gray-300 pl-3">
                      <div className="text-gray-500">2024-02-10 16:30 • carol@security</div>
                      <div>Accessed by service account</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-blue-600 cursor-pointer">View full audit log →</div>
                </div>
              </div>
              <div className="p-4 border-t flex gap-2">
                <button onClick={() => { handleRotate(drawerKey.id); closeDrawer() }} className="flex-1 py-2 border rounded text-sm">Rotate</button>
                <button onClick={() => { handleRevoke(drawerKey.id); closeDrawer() }} className="flex-1 py-2 border border-red-600 text-red-600 rounded text-sm">Revoke</button>
              </div>
            </div>
          </div>
        )}

        {editModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setEditModal(null)}>
            <div className="bg-white rounded p-5 w-full max-w-sm" onClick={e => e.stopPropagation()}>
              <div className="font-semibold mb-3">Edit Scopes</div>
              <div className="space-y-2 mb-4">
                {editModal.scopes.map((scope, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={scope}
                      onChange={e => {
                        const newScopes = [...editModal.scopes]
                        newScopes[idx] = e.target.value
                        setEditModal({ ...editModal, scopes: newScopes })
                      }}
                      className="flex-1 border px-2 py-1 text-sm"
                    />
                    <button onClick={() => {
                      const newScopes = editModal.scopes.filter((_, i) => i !== idx)
                      setEditModal({ ...editModal, scopes: newScopes })
                    }} className="text-red-500">×</button>
                  </div>
                ))}
              </div>
              <button onClick={() => {
                const newScopes = [...editModal.scopes, 'new:scope']
                setEditModal({ ...editModal, scopes: newScopes })
              }} className="text-sm text-blue-600 mb-4">+ Add scope</button>
              <div className="flex gap-2">
                <button onClick={() => setEditModal(null)} className="flex-1 py-2 border rounded">Cancel</button>
                <button onClick={() => saveEditScopes(editModal.scopes)} className="flex-1 py-2 bg-blue-600 text-white rounded">Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App