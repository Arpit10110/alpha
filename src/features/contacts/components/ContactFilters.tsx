import React, { useEffect, useRef } from 'react';
import { ContactStage } from '../model/contact.types';
import {
  AVAILABLE_LABELS,
  AVAILABLE_OWNERS,
  CONTACT_STAGES,
  STAGE_CONFIG,
  LABEL_COLORS,
} from '../model/contact.constants';

interface ContactFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStages: ContactStage[];
  onToggleStage: (stage: ContactStage) => void;
  selectedOwners: string[];
  onToggleOwner: (owner: string) => void;
  selectedLabels: string[];
  onToggleLabel: (label: string) => void;
  onClearAll: () => void;
}

export const ContactFilters: React.FC<ContactFiltersProps> = ({
  isOpen,
  onClose,
  selectedStages,
  onToggleStage,
  selectedOwners,
  onToggleOwner,
  selectedLabels,
  onToggleLabel,
  onClearAll,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasAnyFilter =
    selectedStages.length > 0 || selectedOwners.length > 0 || selectedLabels.length > 0;

  return (
    <div
      ref={popoverRef}
      className="absolute left-0 top-full mt-2 w-80 bg-surface-container-lowest border border-surface-container-highest rounded-xl shadow-xl p-space-md z-40 animate-in fade-in zoom-in-95"
    >
      <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-highest/60 mb-space-xs">
        <span className="font-caption text-caption uppercase tracking-wider text-outline font-semibold">
          Filters
        </span>
        {hasAnyFilter && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-primary hover:underline font-caption text-caption"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-space-md max-h-[420px] overflow-y-auto pr-1">
        {/* Stage Filter */}
        <div className="space-y-space-2xs">
          <label className="font-caption text-caption uppercase tracking-wider text-outline font-medium block">
            Stage
          </label>
          <div className="space-y-space-3xs">
            {CONTACT_STAGES.map((stage) => {
              const isChecked = selectedStages.includes(stage);
              const cfg = STAGE_CONFIG[stage];
              return (
                <label
                  key={stage}
                  className="flex items-center justify-between p-space-2xs rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors select-none"
                >
                  <div className="flex items-center gap-space-2xs">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleStage(stage)}
                      className="w-3.5 h-3.5 rounded text-primary focus:ring-primary-container accent-primary cursor-pointer"
                    />
                    <span className={`w-2 h-2 rounded-full ${cfg.dotBg}`} />
                    <span className="font-body-compact text-body-compact text-on-surface">
                      {stage}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Owner Filter */}
        <div className="space-y-space-2xs pt-space-xs border-t border-surface-container-highest/50">
          <label className="font-caption text-caption uppercase tracking-wider text-outline font-medium block">
            Owner
          </label>
          <div className="space-y-space-3xs">
            {AVAILABLE_OWNERS.map((owner) => {
              const isChecked = selectedOwners.includes(owner.name);
              return (
                <label
                  key={owner.id}
                  className="flex items-center justify-between p-space-2xs rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors select-none"
                >
                  <div className="flex items-center gap-space-2xs">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleOwner(owner.name)}
                      className="w-3.5 h-3.5 rounded text-primary focus:ring-primary-container accent-primary cursor-pointer"
                    />
                    <span className="w-5 h-5 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-caption text-[0.625rem] font-semibold">
                      {owner.initials}
                    </span>
                    <span className="font-body-compact text-body-compact text-on-surface">
                      {owner.name}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Labels Filter */}
        <div className="space-y-space-2xs pt-space-xs border-t border-surface-container-highest/50">
          <label className="font-caption text-caption uppercase tracking-wider text-outline font-medium block">
            Labels
          </label>
          <div className="flex flex-wrap gap-space-2xs">
            {AVAILABLE_LABELS.map((label) => {
              const isSelected = selectedLabels.includes(label);
              const color = LABEL_COLORS[label] || {
                bg: 'bg-surface-container',
                text: 'text-on-surface-variant',
                dot: 'bg-outline',
              };

              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => onToggleLabel(label)}
                  className={`inline-flex items-center gap-1.5 px-space-xs py-1 rounded-full font-body-compact text-body-compact font-medium transition-all ${
                    isSelected
                      ? `${color.bg} ${color.text} ring-1 ring-primary-container shadow-sm`
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${color.dot}`} />
                  <span>{label}</span>
                  {isSelected && (
                    <span className="material-symbols-outlined text-[0.875rem]">check</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pt-space-sm mt-space-sm border-t border-surface-container-highest/60 flex items-center justify-between">
        <span className="font-caption text-caption text-outline">Press ESC to dismiss</span>
        <button
          type="button"
          onClick={onClose}
          className="font-body-compact text-body-compact font-medium px-space-md py-1 bg-primary-container hover:bg-primary text-on-primary rounded-lg shadow-sm transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};
