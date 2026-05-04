import React from 'react'
import './SummaryHeader.css'

export function SummaryHeader({ stats }) {
  return (
    <div className="summary-header">
      <div className="summary-stat">
        <span className="stat-value">{stats.total}</span>
        <span className="stat-label">Total Keys</span>
      </div>
      <div className="summary-stat">
        <span className="stat-value stat-healthy">{stats.active}</span>
        <span className="stat-label">Active</span>
      </div>
      <div className="summary-stat">
        <span className="stat-value stat-warning">{stats.overScoped}</span>
        <span className="stat-label">Over-scoped</span>
      </div>
      <div className="summary-stat">
        <span className="stat-value stat-danger">{stats.expiringThisWeek}</span>
        <span className="stat-label">Expiring this week</span>
      </div>
    </div>
  )
}