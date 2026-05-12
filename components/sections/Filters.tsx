'use client';

import React from 'react';
import { X, Info } from 'lucide-react';
import Tooltip from '@/components/ui/Tooltip';
import { FilterState } from '@/lib/types';
import { useSettings } from '@/lib/context/SettingsContext';

interface FiltersProps {
  state: FilterState;
  setState: React.Dispatch<React.SetStateAction<FilterState>>;
  onClose?: () => void;
}

export default function Filters({ state, setState, onClose }: FiltersProps) {
  const { t } = useSettings();
  
  const PURPOSES = t.products.purposes;
  const SECTORS = t.products.sectors;
  const CITIES = t.products.cities;
  const BANKS = t.products.banks;

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
      <div className="bg-card-bg rounded-2xl shadow-sm border border-border p-6 sticky top-24 transition-colors max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-primary">{t.products.filters}</h2>
          </div>
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <button onClick={clearAll} className="text-[10px] font-bold text-red-500 hover:bg-red-50 px-2 py-1 rounded transition-all">
                {t.products.clearAll}
              </button>
            )}
            {onClose && (
              <button onClick={onClose} className="lg:hidden p-1 hover:bg-page-bg rounded-lg">
                <X className="w-5 h-5 text-text-muted" />
              </button>
            )}
          </div>
        </div>

        {/* Applied Filters Section */}
        {activeFiltersCount > 0 && (
          <div className="mb-6 space-y-2">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{t.products.appliedFilters}</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(state).map(([key, values]) => {
                if (key === 'loanAmount') return null;
                return (values as string[]).map(val => (
                  <span key={`${key}-${val}`} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-[11px] font-semibold border border-primary/20">
                    {val}
                    <button onClick={() => removeIndividualFilter(key as keyof FilterState, val)}>
                      <X className="w-3 h-3 hover:text-red-500" />
                    </button>
                  </span>
                ));
              })}
            </div>
          </div>
        )}

        <div className="space-y-8">
          {/* Purpose */}
          <FilterGroup
            title={t.products.purpose}
            tooltip={t.products.tooltips.purpose}
            options={PURPOSES}
            selected={state.purpose}
            onToggle={(val) => toggleFilter('purpose', val)}
            onSelectAll={() => filterByGroup('purpose', PURPOSES, 'all')}
            onDeselectAll={() => filterByGroup('purpose', PURPOSES, 'none')}
            allLabel={t.products.all}
            noneLabel={t.products.none}
          />

          {/* Sector */}
          <FilterGroup
            title={t.products.sector}
            tooltip={t.products.tooltips.sector}
            options={SECTORS}
            selected={state.sector}
            onToggle={(val) => toggleFilter('sector', val)}
            onSelectAll={() => filterByGroup('sector', SECTORS, 'all')}
            onDeselectAll={() => filterByGroup('sector', SECTORS, 'none')}
            allLabel={t.products.all}
            noneLabel={t.products.none}
          />

          {/* Financial Institution */}
          <FilterGroup
            title={t.products.institution}
            tooltip={t.products.tooltips.institution}
            options={BANKS}
            selected={state.bank}
            onToggle={(val) => toggleFilter('bank', val)}
            onSelectAll={() => filterByGroup('bank', BANKS, 'all')}
            onDeselectAll={() => filterByGroup('bank', BANKS, 'none')}
            allLabel={t.products.all}
            noneLabel={t.products.none}
          />

          {/* City */}
          <FilterGroup
            title={t.products.city}
            tooltip={t.products.tooltips.city}
            options={CITIES}
            selected={state.city}
            onToggle={(val) => toggleFilter('city', val)}
            onSelectAll={() => filterByGroup('city', CITIES, 'all')}
            onDeselectAll={() => filterByGroup('city', CITIES, 'none')}
            allLabel={t.products.all}
            noneLabel={t.products.none}
          />

          {/* Loan Amount Range */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider block">{t.products.maxLoan}</label>
              <Tooltip content={t.products.tooltips.amount}>
                <Info className="w-3 h-3 text-text-muted/40 cursor-help" />
              </Tooltip>
            </div>
            <input
              type="range"
              min="100000"
              max="50000000"
              step="100000"
              className="w-full h-2 bg-page-bg rounded-lg appearance-none cursor-pointer accent-primary border border-border"
              onChange={(e) => setState(prev => ({ ...prev, loanAmount: parseInt(e.target.value) }))}
            />
            <div className="flex justify-between text-[10px] font-bold text-text-muted">
              <span>{t.calculator.pkr} 100k</span>
              <span>{t.calculator.pkr} 50m+</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function FilterGroup({ 
  title, 
  tooltip,
  options, 
  selected, 
  onToggle, 
  onSelectAll, 
  onDeselectAll,
  allLabel,
  noneLabel
}: { 
  title: string, 
  tooltip?: string,
  options: string[], 
  selected: string[], 
  onToggle: (val: string) => void,
  onSelectAll: () => void,
  onDeselectAll: () => void,
  allLabel: string,
  noneLabel: string
}) {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between w-full group/title">
        <div className="flex items-center gap-2 flex-grow overflow-hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 text-left truncate">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider cursor-pointer group-hover/title:text-primary transition-colors">
              {title}
            </label>
            <span className="text-[10px] font-bold text-text-muted/30 tracking-widest">{isOpen ? '−' : '+'}</span>
          </button>
          {tooltip && (
            <Tooltip content={tooltip}>
              <Info className="w-3 h-3 text-text-muted/40 cursor-help hover:text-primary transition-colors" />
            </Tooltip>
          )}
        </div>
        
        {isOpen && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <button 
              onClick={onSelectAll}
              className="text-[9px] font-bold text-text-muted/60 hover:text-primary uppercase"
            >
              {allLabel}
            </button>
            <span className="text-text-muted/20 text-[9px]">|</span>
            <button 
              onClick={onDeselectAll}
              className="text-[9px] font-bold text-text-muted/60 hover:text-red-500 uppercase"
            >
              {noneLabel}
            </button>
          </div>
        )}
      </div>
      {isOpen && (
        <div className="grid grid-cols-1 gap-2 pt-1">
          {options.map(option => (
            <label key={option} className="flex items-center gap-3 group cursor-pointer">
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${selected.includes(option) ? 'bg-primary border-primary shadow-sm' : 'border-border group-hover:border-primary/50'}`}>
                {selected.includes(option) && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
              </div>
              <input
                type="checkbox"
                className="hidden"
                checked={selected.includes(option)}
                onChange={() => onToggle(option)}
              />
              <span className={`text-xs font-medium transition-colors ${selected.includes(option) ? 'text-text-main' : 'text-text-muted group-hover:text-text-main'}`}>
                {option}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
