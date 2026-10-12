import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { WorkspaceHeader } from './WorkspaceHeader';

interface AppShellProps {
  children: React.ReactNode;
  onFilterByLabel?: (label: string) => void;
  onSelectContacts?: () => void;
  activeLabel?: string;
  labelCounts?: Record<string, number>;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  onFilterByLabel,
  onSelectContacts,
  activeLabel,
  labelCounts,
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface flex flex-col antialiased">
      {/* Sidebar Navigation Rail */}
      <Sidebar
        onFilterByLabel={onFilterByLabel}
        onSelectContacts={onSelectContacts}
        activeLabel={activeLabel}
        labelCounts={labelCounts}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Layout Area */}
      <div
        className={`min-h-screen flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'pl-0 md:pl-16' : 'pl-0 md:pl-sidebar-width'
        }`}
      >
        <WorkspaceHeader
          onToggleSidebar={() => setIsMobileOpen((prev) => !prev)}
        />
        <div className="pt-16 flex flex-col flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};
