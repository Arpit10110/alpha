import React from 'react';

interface ContactsEmptyStateProps {
  onClearFilters: () => void;
  title?: string;
  description?: string;
}

export const ContactsEmptyState: React.FC<ContactsEmptyStateProps> = ({
  onClearFilters,
  title = 'No contacts match your search and filters',
  description = "We couldn't find any contact records matching the current parameters. Try clearing some filters or searching for another keyword.",
}) => {
  return (
    <div className="w-full bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container-highest/60 overflow-hidden flex flex-col min-h-[480px]">
      <div className="flex-1 flex flex-col items-center justify-center p-space-2xl text-center">
        <div className="max-w-md flex flex-col items-center">
          {/* Visual Icon Anchor */}
          <div className="relative w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-space-lg shadow-sm">
            <span className="material-symbols-outlined text-outline text-[2rem]">manage_search</span>
            <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center font-mono-keycap text-mono-keycap text-on-surface font-semibold shadow-sm border border-outline-variant">
              ?
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-headline-md text-headline-md text-on-surface font-semibold mb-space-2xs">
            {title}
          </h2>

          {/* Description */}
          <p className="font-body-default text-body-default text-on-surface-variant max-w-sm mb-space-lg leading-relaxed">
            {description}
          </p>

          {/* Action button */}
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-space-2xs px-space-md py-space-xs rounded-lg font-body-compact text-body-compact bg-primary-container text-on-primary shadow-sm hover:bg-primary transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[1.125rem]">filter_alt_off</span>
            <span>Reset filters &amp; search</span>
          </button>
        </div>
      </div>
    </div>
  );
};
