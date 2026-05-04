import React, { useEffect, useRef } from 'react'
import { format } from 'date-fns'
import { StatusPill } from './StatusPill'
import { ScopeBadges } from './ScopeBadges'
import './AuditDrawer.css'

export function AuditDrawer({ keyData, onClose }) {
  const drawerRef = useRef(null)

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    drawerRef.current?.focus()
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!keyData) return null

  const eventIcons = {
    created: '🔑',
    used: '→',
    rotated: '🔄',
    'scope-modified': '✏️'
  }

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <aside
        className="audit-drawer"
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-label={`Audit details for ${keyData.name}`}
      >
        <header className="drawer-header">
          <div className="drawer-title">
            <h2>{keyData.name}</h2>
            <StatusPill status={keyData.status} />
          </div>
          <button className="drawer-close" onClick={onClose} aria-label="Close drawer">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"/>
            </svg>
          </button>
        </header>

        <div className="drawer-content">
          <section className="drawer-section">
            <h3>Key Details</h3>
            <dl className="detail-grid">
              <dt>Key ID</dt>
              <dd className="mono">{keyData.id}</dd>
              <dt>Prefix</dt>
              <dd className="mono">{keyData.keyPrefix}</dd>
              <dt>Owner</dt>
              <dd>{keyData.owner}</dd>
              <dt>Created</dt>
              <dd>{format(new Date(keyData.created), 'PPpp')}</dd>
              <dt>Last Used</dt>
              <dd>{format(new Date(keyData.lastUsed), 'PPpp')}</dd>
              <dt>Expires</dt>
              <dd>{format(new Date(keyData.expires), 'PPpp')}</dd>
              {keyData.lastRotated && (
                <>
                  <dt>Last Rotated</dt>
                  <dd>{format(new Date(keyData.lastRotated), 'PPpp')}</dd>
                </>
              )}
            </dl>
          </section>

          <section className="drawer-section">
            <h3>Scopes</h3>
            <ScopeBadges scopes={keyData.scopes} overScoped={keyData.overScoped} />
            {keyData.overScoped && (
              <p className="warning-text">
                ⚠️ This key has excessive permissions. Consider reducing scope.
              </p>
            )}
          </section>

          <section className="drawer-section">
            <h3>Audit Trail</h3>
            <div className="audit-timeline">
              {keyData.auditEvents.map((event, i) => (
                <div key={i} className="audit-event">
                  <span className="event-icon">{eventIcons[event.type] || '•'}</span>
                  <div className="event-content">
                    <div className="event-header">
                      <span className="event-type">{event.type}</span>
                      <span className="event-time">{format(new Date(event.timestamp), 'MMM d, HH:mm')}</span>
                    </div>
                    <div className="event-details">
                      <span className="event-actor">{event.actor}</span>
                      {event.details && <span className="event-detail-text">{event.details}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <footer className="drawer-footer">
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-primary">Rotate Key</button>
          <button className="btn-danger">Revoke Key</button>
        </footer>
      </aside>
    </>
  )
}