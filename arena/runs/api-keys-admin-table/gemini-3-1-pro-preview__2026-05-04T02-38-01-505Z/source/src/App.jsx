import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, Filter, MoreHorizontal, ShieldAlert, 
  KeyRound, AlertTriangle, Clock, ChevronDown, 
  RefreshCw, Trash2, Edit3, FileText, CheckSquare
} from 'lucide-react';
import { generateMockData, cn, formatRelative, formatDate } from './lib/utils';
import { StatusPill } from './components/StatusPill';
import { Drawer } from './components/Drawer';

const MOCK_DATA = generateMockData();

function App() {
  const [data, setData] = useState(MOCK_DATA);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState({ key: 'created', dir: 'desc' });
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [drawerKeyId, setDrawerKeyId] = useState(null);
  const [openActionMenuId, setOpenActionMenuId] = useState(null);

  // Close action menu on outside click
  useEffect(() => {
    const handleClick = () => setOpenActionMenuId(null);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const stats = useMemo(() => {
    return {
      total: data.length,
      active: data.filter(d => d.status === 'healthy').length,
      overScoped: data.filter(d => d.isOverScoped).length,
      expiring: data.filter(d => d.status === 'expiring').length,
    };
  }, [data]);

  const filteredAndSortedData = useMemo(() => {
    let result = data.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                            item.owner.toLowerCase().includes(search.toLowerCase()) ||
                            item.id.toLowerCase().includes(search.toLowerCase());
      if (!matchesSearch) return false;

      switch (filter) {
        case 'active': return item.status === 'healthy';
        case 'stale': return item.status === 'stale';
        case 'expiring': return item.status === 'expiring';
        case 'over-scoped': return item.isOverScoped;
        default: return true;
      }
    });

    result.sort((a, b) => {
      let valA = a[sort.key];
      let valB = b[sort.key];
      
      if (sort.key === 'lastUsed' || sort.key === 'created' || sort.key === 'expires') {
        valA = valA ? new Date(valA).getTime() : 0;
        valB = valB ? new Date(valB).getTime() : 0;
      }

      if (valA < valB) return sort.dir === 'asc' ? -1 : 1;
      if (valA > valB) return sort.dir === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [data, search, filter, sort]);

  const handleSort = (key) => {
    setSort(prev => ({
      key,
      dir: prev.key === key && prev.dir === 'desc' ? 'asc' : 'desc'
    }));
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredAndSortedData.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredAndSortedData.map(d => d.id)));
    }
  };

  const toggleSelect = (id, e) => {
    e.stopPropagation();
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const handleRowClick = (id) => {
    setDrawerKeyId(id);
  };

  const selectedKeyData = useMemo(() => 
    data.find(d => d.id === drawerKeyId), 
  [data, drawerKeyId]);

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col font-sans">
      
      {/* Top Navigation / Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gray-900 p-1.5 rounded-md">
                <KeyRound className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-gray-900">API Keys & Permissions</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900">Documentation</button>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
                Generate New Key
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        
        {/* Summary Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Keys', value: stats.total, icon: KeyRound, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Active & Healthy', value: stats.active, icon: CheckSquare, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Over-scoped', value: stats.overScoped, icon: ShieldAlert, color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Expiring Soon', value: stats.expiring, icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
              <div className={cn("p-3 rounded-lg", stat.bg)}>
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Controls: Search & Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search keys, owners, or IDs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-shadow"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto scrollbar-hide pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All Keys' },
              { id: 'active', label: 'Active' },
              { id: 'stale', label: 'Stale' },
              { id: 'expiring', label: 'Expiring' },
              { id: 'over-scoped', label: 'Over-scoped' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "whitespace-nowrap px-3.5 py-1.5 text-sm font-medium rounded-md transition-colors",
                  filter === f.id 
                    ? "bg-gray-900 text-white shadow-sm" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Table Area */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col relative">
          
          {/* Bulk Action Sticky Bar */}
          {selectedIds.size > 0 && (
            <div className="absolute top-0 left-0 right-0 bg-gray-900 text-white px-4 py-3 flex items-center justify-between z-10 animate-in slide-in-from-top-2">
              <span className="text-sm font-medium">{selectedIds.size} keys selected</span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-sm font-medium bg-white/10 hover:bg-white/20 rounded-md transition-colors flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" /> Rotate
                </button>
                <button className="px-3 py-1.5 text-sm font-medium bg-red-500/20 text-red-200 hover:bg-red-500/30 rounded-md transition-colors flex items-center gap-2">
                  <Trash2 className="w-4 h-4" /> Revoke
                </button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-4 py-3 w-12 text-center">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.size === filteredAndSortedData.length && filteredAndSortedData.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer"
                    />
                  </th>
                  {[
                    { key: 'name', label: 'Name & ID' },
                    { key: 'owner', label: 'Owner' },
                    { key: 'scopes', label: 'Scopes' },
                    { key: 'lastUsed', label: 'Last Used' },
                    { key: 'created', label: 'Created' },
                    { key: 'expires', label: 'Expires' },
                    { key: 'status', label: 'Status' },
                  ].map((col) => (
                    <th 
                      key={col.key}
                      className="px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors group select-none"
                      onClick={() => handleSort(col.key)}
                    >
                      <div className="flex items-center gap-1">
                        {col.label}
                        <ChevronDown className={cn(
                          "w-3.5 h-3.5 transition-transform opacity-0 group-hover:opacity-50",
                          sort.key === col.key && "opacity-100 text-gray-900",
                          sort.key === col.key && sort.dir === 'asc' && "rotate-180"
                        )} />
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-3 w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAndSortedData.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-12 text-center text-gray-500">
                      No API keys found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedData.map((row) => (
                    <tr 
                      key={row.id} 
                      onClick={() => handleRowClick(row.id)}
                      className={cn(
                        "group hover:bg-gray-50/80 transition-colors cursor-pointer",
                        selectedIds.has(row.id) && "bg-blue-50/30 hover:bg-blue-50/50"
                      )}
                    >
                      <td className="px-4 py-3 text-center" onClick={e => e.stopPropagation()}>
                        <input 
                          type="checkbox"
                          checked={selectedIds.has(row.id)}
                          onChange={(e) => toggleSelect(row.id, e)}
                          className="rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
                            {row.name}
                            {row.isOverScoped && (
                              <AlertTriangle className="w-3.5 h-3.5 text-purple-500" title="Over-scoped" />
                            )}
                          </span>
                          <span className="text-xs text-gray-500 font-mono mt-0.5">{row.prefix}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600">{row.owner}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                          {row.scopes.slice(0, 2).map(scope => (
                            <span key={scope} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[11px] font-mono rounded border border-gray-200 whitespace-nowrap">
                              {scope}
                            </span>
                          ))}
                          {row.scopes.length > 2 && (
                            <span className="px-1.5 py-0.5 bg-gray-50 text-gray-500 text-[11px] font-medium rounded border border-gray-200 whitespace-nowrap">
                              +{row.scopes.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600 whitespace-nowrap">{formatRelative(row.lastUsed)}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600 whitespace-nowrap">{formatDate(row.created)}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          "text-sm whitespace-nowrap",
                          row.status === 'expiring' ? "text-orange-600 font-medium" : "text-gray-600"
                        )}>
                          {formatDate(row.expires)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <StatusPill status={row.status} />
                      </td>
                      <td className="px-4 py-3 text-right relative" onClick={e => e.stopPropagation()}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenActionMenuId(openActionMenuId === row.id ? null : row.id);
                          }}
                          className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                        
                        {/* Row Actions Popover */}
                        {openActionMenuId === row.id && (
                          <div className="absolute right-8 top-10 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-30 animate-in fade-in zoom-in-95">
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                              <RefreshCw className="w-4 h-4 text-gray-400" /> Rotate Key
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                              <Edit3 className="w-4 h-4 text-gray-400" /> Edit Scopes
                            </button>
                            <button 
                              onClick={() => { setDrawerKeyId(row.id); setOpenActionMenuId(null); }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                              <FileText className="w-4 h-4 text-gray-400" /> View Audit Trail
                            </button>
                            <div className="h-px bg-gray-100 my-1" />
                            <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium">
                              <Trash2 className="w-4 h-4 text-red-500" /> Revoke Key
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Footer (Mock) */}
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-sm text-gray-500">
            <span>Showing {filteredAndSortedData.length} results</span>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 border border-gray-300 rounded-md bg-white hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
            </div>
          </div>
        </div>

      </main>

      <Drawer 
        isOpen={!!drawerKeyId} 
        onClose={() => setDrawerKeyId(null)} 
        data={selectedKeyData} 
      />
    </div>
  );
}

export default App;