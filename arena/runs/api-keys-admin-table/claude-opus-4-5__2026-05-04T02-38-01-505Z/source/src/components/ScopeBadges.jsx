import React from 'react'
import './ScopeBadges.css'

export function ScopeBadges({ scopes, overScoped }) {
  const displayScopes = scopes.slice(0, 2)
  const remaining = scopes.length - 2

  return (
    <div className={`scope-badges ${overScoped ? 'over-scoped' : ''}`}>
      {displayScopes.map((scope, i) => (
        <span key={i} className={`scope-badge ${scope.includes('admin') || scope.includes('*') ? 'scope-danger' : ''}`}>
          {scope}
        </span>
      ))}
      {remaining > 0 && (
        <span className="scope-badge scope-more" title={scopes.slice(2).join(', ')}>
          +{remaining}
        </span>
      )}
      {overScoped && (
        <span className="over-scoped-indicator" title="This key has excessive permissions">
          ⚠
        </span>
      )}
    </div>
  )
}