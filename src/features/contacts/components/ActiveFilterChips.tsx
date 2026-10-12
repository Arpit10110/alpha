import React from 'react';
import { ContactStage } from '../model/contact.types';

interface ActiveFilterChipsProps {
  searchQuery: string;
  onClearSearch: () => void;
  selectedStages: ContactStage[];
  onRemoveStage: (stage: ContactStage) => void;
  selectedOwners: string[];
  onRemoveOwner: (owner: string) => void;
  selectedLabels: string[];
  onRemoveLabel: (label: string) => void;
  onClearAll: () => void;
}

export const ActiveFilterChips: React.FC<ActiveFilterChipsProps> = ({
  searchQuery,
  onClearSearch,
  selectedStages,
  onRemoveStage,
  selectedOwners,
  onRemoveOwner,
  selectedLabels,
  onRemoveLabel,
  onClearAll,
}) => {
  const hasFilters =
    Boolean(searchQuery.trim()) ||
    selectedStages.length > 0 ||
    selectedOwners.length > 0 ||
    selectedLabels.length > 0;

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-space-2xs py-2 animate-in fade-in">
      <span className="font-caption text-caption text-outline mr-1">Active filters:</span>

      {searchQuery.trim() && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-body-compact text-[12px] border border-outline-variant">
          <span>Search: &ldquo;{searchQuery}&rdquo;</span>
          <button
            type="button"
            onClick={onClearSearch}
            className="hover:text-error transition-colors p-0.5"
            aria-label="Clear search"
          >
            <span className="material-symbols-outlined text-[0.875rem]">close</span>
          </button>
        </span>
      )}

      {selectedStages.map((stage) => (
        <span
          key={stage}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-fixed/50 text-primary font-body-compact text-[12px] border border-outline-variant"
        >
          <span>Stage: {stage}</span>
          <button
            type="button"
            onClick={() => onRemoveStage(stage)}
            className="hover:text-error transition-colors p-0.5"
            aria-label={`Remove stage ${stage}`}
          >
            <span className="material-symbols-outlined text-[0.875rem]">close</span>
          </button>
        </span>
      ))}

      {selectedOwners.map((owner) => (
        <span
          key={owner}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-body-compact text-[12px] border border-outline-variant"
        >
          <span>Owner: {owner}</span>
          <button
            type="button"
            onClick={() => onRemoveOwner(owner)}
            className="hover:text-error transition-colors p-0.5"
            aria-label={`Remove owner ${owner}`}
          >
            <span className="material-symbols-outlined text-[0.875rem]">close</span>
          </button>
        </span>
      ))}

      {selectedLabels.map((label) => (
        <span
          key={label}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-body-compact text-[12px] border border-outline-variant"
        >
          <span>Label: {label}</span>
          <button
            type="button"
            onClick={() => onRemoveLabel(label)}
            className="hover:text-error transition-colors p-0.5"
            aria-label={`Remove label ${label}`}
          >
            <span className="material-symbols-outlined text-[0.875rem]">close</span>
          </button>
        </span>
      ))}

      <button
        type="button"
        onClick={onClearAll}
        className="text-primary hover:underline font-caption text-caption ml-1 font-medium"
      >
        Clear all
      </button>
    </div>
  );
};
