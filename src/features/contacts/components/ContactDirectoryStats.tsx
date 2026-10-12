import React from 'react';
import { Contact } from '../model/contact.types';

interface ContactDirectoryStatsProps {
  contacts: Contact[];
}

export const ContactDirectoryStats: React.FC<ContactDirectoryStatsProps> = ({ contacts }) => {
  const total = contacts.length;
  const leads = contacts.filter((c) => c.stage === 'Lead').length;
  const prospects = contacts.filter((c) => c.stage === 'Prospect').length;
  const qualified = contacts.filter((c) => c.stage === 'Qualified').length;

  const leadPercentage = total > 0 ? Math.round((leads / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-sm mb-space-md select-none">
      {/* Total Directory */}
      <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm border border-surface-container-highest/60 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
            Total Directory
          </span>
          <span className="font-headline-lg text-headline-lg text-on-surface mt-space-3xs font-bold">
            {total}
          </span>
        </div>
        <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary-container">
          <span className="material-symbols-outlined text-[1.25rem]">contacts</span>
        </div>
      </div>

      {/* Active Leads */}
      <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm border border-surface-container-highest/60 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
            Active Leads
          </span>
          <div className="flex items-center gap-space-2xs mt-space-3xs">
            <span className="font-headline-lg text-headline-lg text-on-surface font-bold">
              {leads}
            </span>
            <span className="font-mono-metric text-mono-metric text-outline">
              {leadPercentage}% share
            </span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant">
          <span className="material-symbols-outlined text-[1.25rem]">inbox</span>
        </div>
      </div>

      {/* Prospects */}
      <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm border border-surface-container-highest/60 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
            Prospects
          </span>
          <div className="flex items-center gap-space-2xs mt-space-3xs">
            <span className="font-headline-lg text-headline-lg text-on-surface font-bold">
              {prospects}
            </span>
            <span className="font-mono-metric text-mono-metric text-secondary font-medium">
              In review
            </span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
          <span className="material-symbols-outlined text-[1.25rem]">timelapse</span>
        </div>
      </div>

      {/* Qualified */}
      <div className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm border border-surface-container-highest/60 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider font-semibold">
            Qualified
          </span>
          <div className="flex items-center gap-space-2xs mt-space-3xs">
            <span className="font-headline-lg text-headline-lg text-on-surface font-bold">
              {qualified}
            </span>
            <span className="font-mono-metric text-mono-metric text-primary font-medium">
              High Value
            </span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-[1.25rem]">verified</span>
        </div>
      </div>
    </div>
  );
};
