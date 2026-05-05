'use client';

import React from 'react';
import { X, Search } from 'lucide-react';
import { FilterState } from '@/lib/types';

interface FiltersProps {
  state: FilterState;
  setState: React.Dispatch<React.SetStateAction<FilterState>>;
}

const PURPOSES = ['Working Capital', 'Expansion', 'Asset Purchase', 'Infrastructure', 'Agri-processing', 'Inventory'];
const SECTORS = ['Retail', 'Manufacturing', 'Agriculture', 'Wholesale', 'Textile', 'Food', 'Services'];
const CITIES = ['Karachi', 'Lahore', 'Islamabad', 'Quetta', 'Peshawar', 'All Cities'];
const BANKS = ['HBL', 'Meezan Bank', 'Bank Alfalah', 'NBP', 'UBL', 'MCB'];

export default function Filters({ state, setState }: FiltersProps) {
  const toggleFilter = (key: keyof FilterState, value: string) => {
    setState(prev => {
      const current = prev[key] as string[];
      if (current.includes(value)) {
        return { ...prev, [key]: current.filter(v => v !== value) };
      }
      return { ...prev, [key]: [...current, value] };
    });
  };

  const clearAll = () => {
    setState({
      purpose: [],
      sector: [],
      bank: [],
      city: [],
      loanAmount: null
    });
  };

  const removeIndividualFilter = (key: keyof FilterState, value: string) => {
    setState(prev => ({
      ...prev,
      [key]: (prev[key] as string[]).filter(v => v !== value)
    }));
  };

  const filterByGroup = (key: keyof FilterState, values: string[], action: 'all' | 'none') => {
    setState(prev => ({
      ...prev,
      [key]: action === 'all' ? values : []
    }));
  };

  const activeFiltersCount = Object.values(state).flat().filter(v => v !== null).length;

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-smeda-blue">Filters</h2>
          {activeFiltersCount > 0 && (
            <button onClick={clearAll} className="text-xs font-bold text-red-500 hover:underline px-2 py-1 rounded-md hover:bg-red-50 transition-all">
              CLEAR ALL
            </button>
          )}
        </div>

        {/* Applied Filters Section */}
        {activeFiltersCount > 0 && (
          <div className="mb-6 space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Applied Filters</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(state).map(([key, values]) => {
                if (key === 'loanAmount') return null;
                return (values as string[]).map(val => (
                  <span key={`${key}-${val}`} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-[11px] font-semibold border border-blue-100">
                    {val}
                    <button onClick={() => removeIndividualFilter(key as keyof FilterState, val)}>
                      <X className="w-3 h-3 hover:text-blue-900" />
                    </button>
                  </span>
                ));
              })}
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Purpose */}
          <FilterGroup
            title="Purpose of loan"
            options={PURPOSES}
            selected={state.purpose}
            onToggle={(val) => toggleFilter('purpose', val)}
            onSelectAll={() => filterByGroup('purpose', PURPOSES, 'all')}
            onDeselectAll={() => filterByGroup('purpose', PURPOSES, 'none')}
          />

          {/* Sector */}
          <FilterGroup
            title="Sector of Business"
            options={SECTORS}
            selected={state.sector}
            onToggle={(val) => toggleFilter('sector', val)}
            onSelectAll={() => filterByGroup('sector', SECTORS, 'all')}
            onDeselectAll={() => filterByGroup('sector', SECTORS, 'none')}
          />

          {/* Financial Institution */}
          <FilterGroup
            title="Financial Institution"
            options={BANKS}
            selected={state.bank}
            onToggle={(val) => toggleFilter('bank', val)}
            onSelectAll={() => filterByGroup('bank', BANKS, 'all')}
            onDeselectAll={() => filterByGroup('bank', BANKS, 'none')}
          />

          {/* City */}
          <FilterGroup
            title="City"
            options={CITIES}
            selected={state.city}
            onToggle={(val) => toggleFilter('city', val)}
            onSelectAll={() => filterByGroup('city', CITIES, 'all')}
            onDeselectAll={() => filterByGroup('city', CITIES, 'none')}
          />

          {/* Loan Amount Range */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Max Loan Amount</label>
            <input
              type="range"
              min="100000"
              max="50000000"
              step="100000"
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-smeda-blue"
              onChange={(e) => setState(prev => ({ ...prev, loanAmount: parseInt(e.target.value) }))}
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-400">
              <span>PKR 100k</span>
              <span>PKR 50m+</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function FilterGroup({ 
  title, 
  options, 
  selected, 
  onToggle, 
  onSelectAll, 
  onDeselectAll 
}: { 
  title: string, 
  options: string[], 
  selected: string[], 
  onToggle: (val: string) => void,
  onSelectAll: () => void,
  onDeselectAll: () => void
}) {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between w-full group/title">
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 flex-grow text-left">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer group-hover/title:text-smeda-blue transition-colors">
            {title}
          </label>
          <span className="text-[10px] font-bold text-slate-300 tracking-widest">{isOpen ? '−' : '+'}</span>
        </button>
        
        {isOpen && (
          <div className="flex items-center gap-2">
            <button 
              onClick={onSelectAll}
              className="text-[9px] font-bold text-slate-400 hover:text-smeda-blue uppercase"
            >
              All
            </button>
            <span className="text-slate-200 text-[9px]">|</span>
            <button 
              onClick={onDeselectAll}
              className="text-[9px] font-bold text-slate-400 hover:text-red-500 uppercase"
            >
              None
            </button>
          </div>
        )}
      </div>
      {isOpen && (
        <div className="grid grid-cols-1 gap-2">
          {options.map(option => (
            <label key={option} className="flex items-center gap-3 group cursor-pointer">
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${selected.includes(option) ? 'bg-smeda-blue border-smeda-blue shadow-sm' : 'border-slate-300 group-hover:border-smeda-blue/50'}`}>
                {selected.includes(option) && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
              </div>
              <input
                type="checkbox"
                className="hidden"
                checked={selected.includes(option)}
                onChange={() => onToggle(option)}
              />
              <span className={`text-xs font-medium transition-colors ${selected.includes(option) ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-700'}`}>
                {option}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
