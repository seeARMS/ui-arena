import React from 'react';
import { cn } from '../lib/utils';
import { CheckCircle2, AlertTriangle, Clock, ShieldAlert, XCircle } from 'lucide-react';

const config = {
  healthy: { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2, label: 'Healthy' },
  stale: { color: 'bg-amber-50 text-amber-700 border-amber-200', icon: Clock, label: 'Stale' },
  expiring: { color: 'bg-orange-50 text-orange-700 border-orange-200', icon: AlertTriangle, label: 'Expiring' },
  leaked: { color: 'bg-red-50 text-red-700 border-red-200', icon: ShieldAlert, label: 'Leaked' },
  revoked: { color: 'bg-gray-100 text-gray-600 border-gray-200', icon: XCircle, label: 'Revoked' },
};

export function StatusPill({ status, className }) {
  const { color, icon: Icon, label } = config[status] || config.healthy;
  
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border", color, className)}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}