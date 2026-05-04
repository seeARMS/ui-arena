import React, { useState, useRef, useEffect } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import { StatusPill } from './StatusPill'
import { ScopeBadges } from './ScopeBadges'
import './KeysTable.css'

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'owner', label: 'Owner', sortable: true },
  { key: 'scopes', label: 'Scopes', sortable: true },
  { key: 'lastUsed', label: 'Last Used', sortable: true },
  { key: 'created', label: 'Created', sortable: true },
  { key: 'expires', label: 'Expires', sortable: true },
  { key: 'status', label: 'Status', sortable: true }
]

export function KeysTable({ keys, sortConfig, onSort, selectedIds, onSelect, onSelectAll, onRowClick, onRowAction }) {
  const [openPopover, setOpenPopover] = useState(null)
  const popoverRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setOpenPopover(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleAction = (e, keyId, action) => {
    e.stopPropagation()
    onRowAction(keyId, action)
    setOpenPopover(null)
  }

  const allSelected = keys.length > 0 && selectedIds.size === keys.length

  return (
    <>
      <table className="keys-table" role="grid">
        <thead>
          <tr>
            <th className="col-checkbox">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onSelectAll}
                aria-label="Select all keys"
              />
            </th>
            {columns.map(col => (
              <th
                key={col.key}
                className={`col-${col.key} ${col.sortable ? 'sortable' : ''}`}
                onClick={() => col.sortable && onSort(col.key)}
                aria-sort={sortConfig.key === col.key ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending') : undefined}
              >
                <span className="th-content">
                  {col.label}
                  {sortConfig.key === col.key && (
                    <span className="sort-indicator">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                  )}
                </span>
              </th>
            ))}
            <th className="col-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {keys.map(key => (
            <tr
              key={key.id}
              className={`${selectedIds.has(key.id) ? 'selected' : ''} ${key.status === 'leaked-suspected' ? 'row-danger' : ''}`}
              onClick={() => onRowClick(key.id)}
            >
              <td className="col-checkbox" onClick={e => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={selectedIds.has(key.id)}
                  onChange={() => onSelect(key.id)}
                  aria-label={`Select ${key.name}`}
                />
              </td>
              <td className="col-name">
                <div className="name-cell">
                  <span className="key-name">{key.name}</span>
                  <span className="key-prefix">{key.keyPrefix}</span>
                </div>
              </td>
              <td className="col-owner">{key.owner}</td>
              <td className="col-scopes">
                <ScopeBadges scopes={key.scopes} overScoped={key.overScoped} />
              </td>
              <td className="col-lastUsed" title={format(new Date(key.lastUsed), 'PPpp')}>
                {formatDistanceToNow(new Date(key.lastUsed), { addSuffix: true })}
              </td>
              <td className="col-created" title={format(new Date(key.created), 'PPpp')}>
                {format(new Date(key.created), 'MMM d, yyyy')}
              </td>
              <td className="col-expires" title={format(new Date(key.expires), 'PPpp')}>
                {format(new Date(key.expires), 'MMM d, yyyy')}
              </td>
              <td className="col-status">
                <StatusPill status={key.status} />
              </td>
              <td className="col-actions" onClick={e => e.stopPropagation()}>
                <div className="actions-wrapper">
                  <button
                    className="action-trigger"
                    onClick={() => setOpenPopover(openPopover === key.id ? null : key.id)}
                    aria-label="Row actions"
                    aria-expanded={openPopover === key.id}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM1.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm13 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/>
                    </svg>
                  </button>
                  {openPopover === key.id && (
                    <div className="action-popover" ref={popoverRef} role="menu">
                      <button role="menuitem" onClick={e => handleAction(e, key.id, 'rotate')}>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                        </svg>
                        Rotate key
                      </button>
                      <button role="menuitem" onClick={e => handleAction(e, key.id, 'edit-scopes')}>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z"/>
                        </svg>
                        Edit scopes
                      </button>
                      <button role="menuitem" onClick={() => { onRowClick(key.id); setOpenPopover(null) }}>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16Zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287ZM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/>
                        </svg>
                        View audit trail
                      </button>
                      <hr />
                      <button role="menuitem" className="danger" onClick={e => handleAction(e, key.id, 'revoke')}>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M11 1.75V3h2.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75ZM4.496 6.675l.66 6.6a.25.25 0 0 0 .249.225h5.19a.25.25 0 0 0 .249-.225l.66-6.6a.75.75 0 0 1 1.492.149l-.66 6.6A1.748 1.748 0 0 1 10.595 15h-5.19a1.75 1.75 0 0 1-1.741-1.575l-.66-6.6a.75.75 0 1 1 1.492-.15ZM6.5 1.75V3h3V1.75a.25.25 0 0 0-.25-.25h-2.5a.25.25 0 0 0-.25.25Z"/>
                        </svg>
                        Revoke key
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="keys-cards">
        {keys.map(key => (
          <div
            key={key.id}
            className={`key-card ${selectedIds.has(key.id) ? 'selected' : ''} ${key.status === 'leaked-suspected' ? 'card-danger' : ''}`}
            onClick={() => onRowClick(key.id)}
          >
            <div className="card-header">
              <input
                type="checkbox"
                checked={selectedIds.has(key.id)}
                onChange={() => onSelect(key.id)}
                onClick={e => e.stopPropagation()}
                aria-label={`Select ${key.name}`}
              />
              <div className="card-title">
                <span className="key-name">{key.name}</span>
                <span className="key-prefix">{key.keyPrefix}</span>
              </div>
              <StatusPill status={key.status} />
            </div>
            <div className="card-body">
              <div className="card-row">
                <span className="card-label">Owner</span>
                <span>{key.owner}</span>
              </div>
              <div className="card-row">
                <span className="card-label">Scopes</span>
                <ScopeBadges scopes={key.scopes} overScoped={key.overScoped} />
              </div>
              <div className="card-row">
                <span className="card-label">Last used</span>
                <span>{formatDistanceToNow(new Date(key.lastUsed), { addSuffix: true })}</span>
              </div>
              <div className="card-row">
                <span className="card-label">Expires</span>
                <span>{format(new Date(key.expires), 'MMM d, yyyy')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {keys.length === 0 && (
        <div className="empty-state">
          <p>No API keys match your filters</p>
        </div>
      )}
    </>
  )
}