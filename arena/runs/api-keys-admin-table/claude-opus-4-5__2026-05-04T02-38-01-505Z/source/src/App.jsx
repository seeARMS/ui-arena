import React, { useState, useMemo, useCallback } from 'react'
import { generateMockKeys } from './data/mockKeys.js'
import { SummaryHeader } from './components/SummaryHeader'
import { FilterBar } from './components/FilterBar'
import { KeysTable } from './components/KeysTable'
import { BulkActionBar } from './components/BulkActionBar'
import { AuditDrawer } from './components/AuditDrawer'
import './App.css'

const mockKeys = generateMockKeys(30)

export default function App() {
  const [keys, setKeys] = useState(mockKeys)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [sortConfig, setSortConfig] = useState({ key: 'lastUsed', direction: 'desc' })
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [drawerKey, setDrawerKey] = useState(null)

  const filteredKeys = useMemo(() => {
    let result = keys

    if (search) {
      const s = search.toLowerCase()
      result = result.filter(k =>
        k.name.toLowerCase().includes(s) ||
        k.owner.toLowerCase().includes(s) ||
        k.scopes.some(sc => sc.toLowerCase().includes(s))
      )
    }

    if (filter !== 'all') {
      result = result.filter(k => {
        if (filter === 'active') return k.status === 'healthy'
        if (filter === 'stale') return k.status === 'stale'
        if (filter === 'expiring') return k.status === 'expiring'
        if (filter === 'over-scoped') return k.overScoped
        return true
      })
    }

    if (sortConfig.key) {
      result = [...result].sort((a, b) => {
        let aVal = a[sortConfig.key]
        let bVal = b[sortConfig.key]
        if (sortConfig.key === 'scopes') {
          aVal = a.scopes.length
          bVal = b.scopes.length
        }
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
    }

    return result
  }, [keys, search, filter, sortConfig])

  const stats = useMemo(() => {
    const now = new Date()
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    return {
      total: keys.length,
      active: keys.filter(k => k.status === 'healthy').length,
      overScoped: keys.filter(k => k.overScoped).length,
      expiringThisWeek: keys.filter(k => new Date(k.expires) <= weekFromNow && new Date(k.expires) > now).length
    }
  }, [keys])

  const handleSort = useCallback((key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }, [])

  const handleSelect = useCallback((id) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const handleSelectAll = useCallback(() => {
    if (selectedIds.size === filteredKeys.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filteredKeys.map(k => k.id)))
    }
  }, [filteredKeys, selectedIds.size])

  const handleBulkAction = useCallback((action) => {
    if (action === 'revoke') {
      setKeys(prev => prev.map(k =>
        selectedIds.has(k.id) ? { ...k, status: 'revoked' } : k
      ))
    }
    setSelectedIds(new Set())
  }, [selectedIds])

  const handleRowAction = useCallback((id, action) => {
    if (action === 'revoke') {
      setKeys(prev => prev.map(k => k.id === id ? { ...k, status: 'revoked' } : k))
    } else if (action === 'rotate') {
      setKeys(prev => prev.map(k => k.id === id ? {
        ...k,
        created: new Date().toISOString(),
        lastRotated: new Date().toISOString(),
        status: 'healthy'
      } : k))
    }
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>API Keys</h1>
        <span className="header-subtitle">Workspace key management & audit</span>
      </header>

      <SummaryHeader stats={stats} />

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        filter={filter}
        onFilterChange={setFilter}
      />

      <div className="table-container">
        <KeysTable
          keys={filteredKeys}
          sortConfig={sortConfig}
          onSort={handleSort}
          selectedIds={selectedIds}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
          onRowClick={setDrawerKey}
          onRowAction={handleRowAction}
        />
      </div>

      {selectedIds.size > 0 && (
        <BulkActionBar
          count={selectedIds.size}
          onAction={handleBulkAction}
          onClear={() => setSelectedIds(new Set())}
        />
      )}

      {drawerKey && (
        <AuditDrawer
          keyData={keys.find(k => k.id === drawerKey)}
          onClose={() => setDrawerKey(null)}
        />
      )}
    </div>
  )
}