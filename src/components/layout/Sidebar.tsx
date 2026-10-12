import React from 'react';

interface SidebarProps {
  onFilterByLabel?: (label: string) => void;
  onSelectContacts?: () => void;
  activeLabel?: string;
  labelCounts?: Record<string, number>;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onFilterByLabel,
  onSelectContacts,
  activeLabel,
  labelCounts = {},
  isCollapsed = false,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar / Mobile Drawer */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-surface-container-low border-r border-surface-container-highest flex flex-col select-none transition-transform duration-300 md:transition-all z-50 ${
          isMobileOpen
            ? 'translate-x-0 w-72 shadow-2xl'
            : '-translate-x-full md:translate-x-0'
        } ${isCollapsed ? 'md:w-16' : 'md:w-sidebar-width'}`}
      >
        <div className="flex flex-col flex-1 min-h-0">
          {/* Workspace Brand Header */}
          <div className="p-space-sm border-b border-surface-container-highest/60 flex items-center justify-between">
            <div className="flex items-center gap-space-xs min-w-0">
              <div className="w-8 h-8 rounded-lg bg-primary-container text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
                α
              </div>
              {!isCollapsed && (
                <div className="min-w-0">
                  <span className="font-body-medium text-body-medium text-on-surface truncate block font-semibold">
                    Alpha Workspace
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant truncate block">
                    Contact Management
                  </span>
                </div>
              )}
            </div>

            {/* Mobile Cross Close Button */}
            {onCloseMobile && (
              <button
                type="button"
                onClick={onCloseMobile}
                className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
                aria-label="Close navigation"
              >
                <span className="material-symbols-outlined text-[1.25rem]">close</span>
              </button>
            )}
          </div>

          {/* Nav Sections */}
          <div className="flex-1 overflow-y-auto px-space-sm py-space-md space-y-space-md">
            {/* Views */}
            <section>
              {!isCollapsed && (
                <div className="px-space-xs mb-space-3xs">
                  <span className="font-caption text-caption uppercase tracking-wider text-outline font-medium">
                    Views
                  </span>
                </div>
              )}
              <nav className="space-y-space-3xs">
                <button
                  type="button"
                  onClick={() => {
                    onSelectContacts?.();
                    onCloseMobile?.();
                  }}
                  className={`w-full flex items-center gap-space-xs px-space-xs py-space-2xs rounded-lg transition-colors text-left ${
                    !activeLabel
                      ? 'bg-primary-fixed text-primary font-semibold shadow-2xs'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-medium'
                  }`}
                >
                  <span className="material-symbols-outlined text-[1.25rem]">contacts</span>
                  {!isCollapsed && <span>Contacts</span>}
                </button>
              </nav>
            </section>

            {/* Quick Labels filter */}
            {!isCollapsed && (
              <section>
                <div className="px-space-xs mb-space-3xs">
                  <span className="font-caption text-caption uppercase tracking-wider text-outline font-medium">
                    Labels
                  </span>
                </div>
                <div className="space-y-space-3xs">
                  {[
                    { label: 'Inbound', dot: 'bg-primary' },
                    { label: 'Enterprise', dot: 'bg-secondary' },
                    { label: 'Follow-up', dot: 'bg-tertiary-container' },
                    { label: 'High priority', dot: 'bg-error' },
                  ].map(({ label, dot }) => {
                    const count = labelCounts[label] ?? 0;
                    const isActive = activeLabel === label;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => {
                          onFilterByLabel?.(label);
                          onCloseMobile?.();
                        }}
                        className={`w-full flex items-center justify-between px-space-xs py-space-2xs rounded-lg font-body-compact text-body-compact transition-colors text-left ${
                          isActive
                            ? 'bg-primary-fixed/60 text-primary font-semibold ring-1 ring-primary/30'
                            : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                        }`}
                      >
                        <div className="flex items-center gap-space-xs">
                          <span className={`w-2 h-2 rounded-full ${dot}`} />
                          <span>{label}</span>
                        </div>
                        <span className="font-mono-metric text-mono-metric text-outline">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
