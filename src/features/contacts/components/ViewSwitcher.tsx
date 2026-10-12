import React from 'react';
import { ViewMode } from '../model/contact.types';

interface ViewSwitcherProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ view, onViewChange }) => {
  return (
    <div
      role="group"
      aria-label="View switch"
      className="flex items-center p-space-3xs bg-surface-container rounded-xl border border-outline-variant select-none"
    >
      <button
        type="button"
        onClick={() => onViewChange('table')}
        aria-pressed={view === 'table'}
        className={`inline-flex items-center gap-space-3xs px-space-xs py-space-3xs rounded-lg font-body-compact text-body-compact transition-all ${
          view === 'table'
            ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-[0_1px_2px_0_rgba(0,0,0,0.04)]'
            : 'text-on-surface-variant hover:text-on-surface'
        }`}
      >
        <span className="material-symbols-outlined text-[1rem]">table_rows</span>
        <span>Table</span>
      </button>

      <button
        type="button"
        onClick={() => onViewChange('board')}
        aria-pressed={view === 'board'}
        className={`inline-flex items-center gap-space-3xs px-space-xs py-space-3xs rounded-lg font-body-compact text-body-compact transition-all ${
          view === 'board'
            ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-[0_1px_2px_0_rgba(0,0,0,0.04)]'
            : 'text-on-surface-variant hover:text-on-surface'
        }`}
      >
        <span className="material-symbols-outlined text-[1rem]">view_kanban</span>
        <span>Board</span>
      </button>
    </div>
  );
};
