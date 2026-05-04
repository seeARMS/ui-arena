import React from 'react'
import './StatusPill.css'

const statusConfig = {
  healthy: { label: 'Healthy', className: 'status-healthy' },
  stale: { label: 'Stale', className: 'status-stale' },
  expiring: { label: 'Expiring', className: 'status-expiring' },
  'leaked-suspected': { label: 'Leaked?', className: 'status-leaked' },
  revoked: { label: 'Revoked', className: 'status-revoked' }
}

export function StatusPill({ status }) {
  const config = statusConfig[status] || { label: status, className: '' }
  return (
    <span className={`status-pill ${config.className}`}>
      {config.label}
    </span>
  )
}