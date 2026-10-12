import React from 'react';

interface WorkspaceHeaderProps {
  onToggleSidebar?: () => void;
}

export const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  onToggleSidebar,
}) => {
  return (
    <header className="fixed top-0 left-0 md:left-sidebar-width right-0 h-16 bg-surface/90 backdrop-blur-xl border-b border-surface-container-highest z-40 px-margin flex items-center justify-between">
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant/60 shadow-sm transition-all active:scale-95"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[1.375rem]">menu</span>
          </button>
        )}
        <div className="flex items-center gap-2 md:hidden">
          <div className="w-7 h-7 rounded-lg bg-primary-container text-white flex items-center justify-center font-bold text-xs shadow-sm">
            α
          </div>
          <span className="font-semibold text-sm text-on-surface">Alpha Workspace</span>
        </div>
      </div>

      <div className="flex items-center gap-space-sm">
        <nav className="flex items-center gap-space-md">
          <a
            href="/"
            className="transition-colors text-on-surface font-semibold text-body-compact border-b-2 border-primary-container pb-0.5 hover:text-primary"
          >
            Overview
          </a>
        </nav>
      </div>
    </header>
  );
};
