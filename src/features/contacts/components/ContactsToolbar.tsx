import React, { useState } from 'react';
import { ContactStage, ViewMode } from '../model/contact.types';
import { ViewSwitcher } from './ViewSwitcher';
import { ContactFilters } from './ContactFilters';

interface ContactsToolbarProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
  searchInput: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  selectedStages: ContactStage[];
  onToggleStage: (stage: ContactStage) => void;
  selectedOwners: string[];
  onToggleOwner: (owner: string) => void;
  selectedLabels: string[];
  onToggleLabel: (label: string) => void;
  onClearAllFilters: () => void;
  activeFilterCount: number;
  onExport: () => void;
  filteredCount: number;
  totalCount: number;
}

export const ContactsToolbar: React.FC<ContactsToolbarProps> = ({
  view,
  onViewChange,
  searchInput,
  onSearchChange,
  onClearSearch,
  selectedStages,
  onToggleStage,
  selectedOwners,
  onToggleOwner,
  selectedLabels,
  onToggleLabel,
  onClearAllFilters,
  activeFilterCount,
  onExport,
  filteredCount,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="flex flex-wrap items-center justify-between gap-space-sm relative select-none">
      {/* Left cluster: Search + Filters + Export */}
      <div className="flex items-center gap-space-sm flex-1 max-w-3xl">
        {/* Search Input - Enlarged & comfortable */}
        <div className="relative flex-1 max-w-md sm:max-w-lg">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[1.25rem] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search contacts by name, email, company, role..."
            className="w-full h-10 bg-surface-container-lowest border border-outline-variant rounded-xl pl-11 pr-10 text-body-default text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 shadow-2xs transition-all"
          />
          {searchInput && (
            <button
              type="button"
              onClick={onClearSearch}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface p-1 rounded-md transition-colors"
              title="Clear search"
            >
              <span className="material-symbols-outlined text-[1.125rem]">close</span>
            </button>
          )}
        </div>

        {/* Filter Trigger */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            aria-expanded={isFilterOpen}
            className={`inline-flex items-center gap-space-2xs h-10 px-space-md bg-surface-container-lowest border rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors font-body-compact text-body-compact shadow-2xs ${
              activeFilterCount > 0
                ? 'border-primary-container text-on-surface font-semibold ring-1 ring-primary-container/20'
                : 'border-outline-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[1.125rem]">filter_list</span>
            <span>Filter</span>
            {activeFilterCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-primary-container" />
            )}
          </button>

          <ContactFilters
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            selectedStages={selectedStages}
            onToggleStage={onToggleStage}
            selectedOwners={selectedOwners}
            onToggleOwner={onToggleOwner}
            selectedLabels={selectedLabels}
            onToggleLabel={onToggleLabel}
            onClearAll={onClearAllFilters}
          />
        </div>

        {/* Export Button */}
        <button
          type="button"
          onClick={onExport}
          title={`Export ${filteredCount} visible contacts to CSV`}
          className="inline-flex items-center gap-space-2xs h-10 px-space-md bg-surface-container-lowest border border-outline-variant rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors font-body-compact text-body-compact shadow-2xs"
        >
          <span className="material-symbols-outlined text-[1.125rem]">ios_share</span>
          <span>Export</span>
        </button>
      </div>

      {/* Right cluster: View Switcher */}
      <ViewSwitcher view={view} onViewChange={onViewChange} />
    </div>
  );
};
