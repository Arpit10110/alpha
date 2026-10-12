import React, { useState } from 'react';
import { Contact, ContactStage } from '../model/contact.types';
import { getInitials } from '../utils/contactIds';
import { StageBadge, LabelBadge } from '../../../components/ui/Badge';
import { AVAILABLE_OWNERS, CONTACT_STAGES, STAGE_CONFIG } from '../model/contact.constants';

interface ContactTableRowProps {
  contact: Contact;
  isSelected: boolean;
  onSelectRow: (id: string, selected: boolean) => void;
  onOpenDetails: (id: string) => void;
  onUpdateStage: (id: string, stage: ContactStage) => void;
  onDeleteContact: (contact: Contact) => void;
}

export const ContactTableRow: React.FC<ContactTableRowProps> = ({
  contact,
  isSelected,
  onSelectRow,
  onOpenDetails,
  onUpdateStage,
  onDeleteContact,
}) => {
  const [showStageMenu, setShowStageMenu] = useState(false);
  const initials = getInitials(contact.name);
  const ownerObj = AVAILABLE_OWNERS.find((o) => o.name === contact.owner);

  return (
    <tr
      onClick={() => onOpenDetails(contact.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenDetails(contact.id);
        }
      }}
      tabIndex={0}
      role="row"
      className={`border-b border-surface-container-highest/60 hover:bg-surface-container-low transition-colors group cursor-pointer select-none focus:outline-none focus:bg-surface-container-low focus:ring-1 focus:ring-inset focus:ring-primary-container ${
        isSelected ? 'bg-primary-fixed/20' : ''
      }`}
    >
      {/* Checkbox */}
      <td
        className="w-10 px-3 py-3.5 text-center align-middle"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelectRow(contact.id, e.target.checked)}
          aria-label={`Select ${contact.name}`}
          className="row-select rounded w-4 h-4 text-primary-container focus:ring-primary-container accent-primary-container cursor-pointer transition"
        />
      </td>

      {/* Name & Email */}
      <td className="px-3 py-3 align-middle max-w-[220px]">
        <div className="flex items-center gap-space-sm min-w-0">
          <span className="w-7 h-7 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-mono-metric text-xs font-bold flex-shrink-0">
            {initials}
          </span>
          <div className="min-w-0 flex flex-col leading-snug">
            <span className="font-body-medium text-body-medium text-on-surface truncate font-semibold group-hover:text-primary transition-colors">
              {contact.name}
            </span>
            {contact.email ? (
              <span className="font-caption text-caption text-outline truncate">
                {contact.email}
              </span>
            ) : (
              <span className="font-caption text-caption text-outline/60 italic truncate">
                No email set
              </span>
            )}
          </div>
        </div>
      </td>

      {/* Company */}
      <td className="px-2.5 py-3 align-middle font-body-compact text-body-compact text-on-surface truncate max-w-[140px]">
        {contact.company || <span className="text-outline/60 font-mono">—</span>}
      </td>

      {/* Role */}
      <td className="px-2.5 py-3 align-middle font-body-compact text-body-compact text-on-surface-variant truncate max-w-[130px]">
        {contact.role || <span className="text-outline/60 font-mono">—</span>}
      </td>

      {/* Owner */}
      <td className="px-2.5 py-3 align-middle">
        <div className="flex items-center gap-space-2xs min-w-0">
          {ownerObj?.avatar ? (
            <img
              src={ownerObj.avatar}
              alt={contact.owner}
              className="w-5 h-5 rounded-full object-cover flex-shrink-0"
            />
          ) : (
            <span className="w-5 h-5 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-mono-keycap text-mono-keycap flex-shrink-0">
              {ownerObj ? ownerObj.initials : getInitials(contact.owner)}
            </span>
          )}
          <span className="font-body-compact text-body-compact text-on-surface truncate">
            {contact.owner || <span className="text-outline/60 font-mono">—</span>}
          </span>
        </div>
      </td>

      {/* Labels */}
      <td className="px-2.5 py-3 align-middle">
        {contact.labels.length > 0 ? (
          <div className="flex items-center gap-1 flex-wrap py-1">
            {contact.labels.map((l) => (
              <LabelBadge key={l} label={l} />
            ))}
          </div>
        ) : (
          <span className="text-outline/60 font-mono text-caption">—</span>
        )}
      </td>

      {/* Stage with inline stage menu */}
      <td className="px-2.5 py-3 align-middle relative" onClick={(e) => e.stopPropagation()}>
        <div className="relative inline-block">
          <StageBadge
            stage={contact.stage}
            onClick={() => setShowStageMenu(!showStageMenu)}
            className="cursor-pointer hover:shadow-sm"
          />

          {showStageMenu && (
            <div className="absolute left-0 top-full mt-1.5 w-40 bg-surface-container-lowest rounded-xl shadow-xl border border-surface-container-highest py-1.5 z-30 animate-in fade-in">
              <div className="px-3 py-1 text-[10px] uppercase font-semibold text-outline">
                Change stage
              </div>
              {CONTACT_STAGES.map((st) => {
                const cfg = STAGE_CONFIG[st];
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      onUpdateStage(contact.id, st);
                      setShowStageMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between ${
                      st === contact.stage
                        ? `${cfg.badgeBg} ${cfg.badgeText} font-semibold`
                        : 'hover:bg-surface-container-high text-on-surface'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${cfg.dotBg}`} />
                      <span>{st}</span>
                    </div>
                    {st === contact.stage && (
                      <span className="material-symbols-outlined text-[0.875rem]">check</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </td>

      {/* Row action buttons: Eye, Change Status, Trash */}
      <td
        className={`w-28 px-3 py-3 align-middle text-right whitespace-nowrap sticky right-0 shadow-[-2px_0_4px_rgba(0,0,0,0.04)] transition-colors ${
          isSelected
            ? 'bg-[#f0ebe3]'
            : 'bg-surface-container-lowest group-hover:bg-surface-container-low'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-end gap-1">
          {/* Eye button */}
          <button
            type="button"
            onClick={() => onOpenDetails(contact.id)}
            title="View contact details"
            className="p-1.5 text-outline hover:text-primary hover:bg-surface-container rounded-lg transition"
            aria-label={`View details for ${contact.name}`}
          >
            <span className="material-symbols-outlined text-[1.125rem]">visibility</span>
          </button>

          {/* Change Status button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowStageMenu(!showStageMenu)}
              title="Change status"
              className="p-1.5 text-outline hover:text-indigo-600 hover:bg-surface-container rounded-lg transition"
              aria-label={`Change status for ${contact.name}`}
            >
              <span className="material-symbols-outlined text-[1.125rem]">swap_horiz</span>
            </button>
          </div>

          {/* Delete / Trash button */}
          <button
            type="button"
            onClick={() => onDeleteContact(contact)}
            title="Delete contact"
            className="p-1.5 text-outline hover:text-error hover:bg-red-50 rounded-lg transition"
            aria-label={`Delete ${contact.name}`}
          >
            <span className="material-symbols-outlined text-[1.125rem]">delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
};
