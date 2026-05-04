import React from 'react'
import './FilterBar.css'

const filters = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'stale', label: 'Stale' },
  { id: 'expiring', label: 'Expiring' },
  { id: 'over-scoped', label: 'Over-scoped' }
]

export function FilterBar({ search, onSearchChange, filter, onFilterChange }) {
  return (
    <div className="filter-bar">
      <div className="search-wrapper">
        <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M11.5 7a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm-.82 4.74a6 6 0 1 1 1.06-1.06l3.04 3.04a.75.75 0 1 1-1.06 1.06l-3.04-3.04Z"/>
        </svg>
        <input
          type="search"
          placeholder="Search keys, owners, scopes..."
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          className="search-input"
          aria-label="Search API keys"
        />
      </div>
      <div className="filter-segments" role="group" aria-label="Filter keys">
        {filters.map(f => (
          <button
            key={f.id}
            className={`filter-segment ${filter === f.id ? 'active' : ''}`}
            onClick={() => onFilterChange(f.id)}
            aria-pressed={filter === f.id}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  )
}