import React, { useEffect } from 'react';
import { X, Key, Shield, Clock, Activity, AlertTriangle } from 'lucide-react';
import { formatDate, formatRelative, cn } from '../lib/utils';
import { StatusPill } from './StatusPill';

export function Drawer({ isOpen, onClose, data }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const mockAuditLogs = [
    { action: 'Key rotated', actor: 'system', date: new Date(Date.now() - 86400000 * 2).toISOString() },
    { action: 'Scope added: write:billing', actor: 'admin@company.com', date: new Date(Date.now() - 86400000 * 15).toISOString() },
    { action: 'Key created', actor: data?.owner, date: data?.created },
  ];

  return (
    <>
      <div 
        className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out border-l border-gray-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
              <Key className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">{data?.name}</h2>
              <p className="text-xs text-gray-500 font-mono mt-0.5">{data?.id}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Status Section */}
          <section>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Current Status</h3>
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
              <StatusPill status={data?.status} className="text-sm px-3 py-1.5" />
              {data?.isOverScoped && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Over-scoped
                </span>
              )}
            </div>
          </section>

          {/* Details Grid */}
          <section>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Key Details</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
              <div>
                <p className="text-gray-500 mb-1 flex items-center gap-1.5"><Shield className="w-3.5 h-3.5"/> Owner</p>
                <p className="font-medium text-gray-900">{data?.owner}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1 flex items-center gap-1.5"><Activity className="w-3.5 h-3.5"/> Last Used</p>
                <p className="font-medium text-gray-900">{formatRelative(data?.lastUsed)}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> Created</p>
                <p className="font-medium text-gray-900">{formatDate(data?.created)}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> Expires</p>
                <p className={cn("font-medium", data?.status === 'expiring' ? 'text-orange-600' : 'text-gray-900')}>
                  {formatDate(data?.expires)}
                </p>
              </div>
            </div>
          </section>

          {/* Scopes */}
          <section>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Permissions ({data?.scopes.length})</h3>
            <div className="flex flex-wrap gap-2">
              {data?.scopes.map(scope => (
                <span key={scope} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-mono rounded-md border border-gray-200">
                  {scope}
                </span>
              ))}
            </div>
          </section>

          {/* Audit Trail */}
          <section>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Recent Audit Trail</h3>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
              {mockAuditLogs.map((log, i) => (
                <div key={i} className="relative flex items-start gap-4">
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-white border-2 border-gray-300 -translate-x-1.5 md:-translate-x-2 mt-1 z-10" />
                  <div className="ml-6 md:ml-0 md:w-1/2 md:pr-8 md:text-right">
                    <p className="text-sm font-medium text-gray-900">{log.action}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{log.actor}</p>
                  </div>
                  <div className="hidden md:block md:w-1/2 md:pl-8">
                    <p className="text-xs text-gray-500 mt-1">{formatDate(log.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-3">
          <button className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            Rotate Key
          </button>
          <button className="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm">
            Revoke
          </button>
        </div>
      </div>
    </>
  );
}