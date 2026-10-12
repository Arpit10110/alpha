import React, { useState } from 'react';
import { Contact, ContactStage } from '../model/contact.types';
import { CONTACT_STAGES, AVAILABLE_OWNERS } from '../model/contact.constants';
import { LabelBadge } from '../../../components/ui/Badge';
import { getInitials } from '../utils/contactIds';

interface ContactCardProps {
  contact: Contact;
  onOpenDetails: (id: string) => void;
  onMoveStage?: (id: string, stage: ContactStage) => void;
  onDeleteContact?: (contact: Contact) => void;
  onDragStart?: (e: React.DragEvent, id: string) => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  onOpenDetails,
  onMoveStage,
  onDeleteContact,
  onDragStart,
}) => {
  const [showStageMenu, setShowStageMenu] = useState(false);
  const ownerObj = AVAILABLE_OWNERS.find((o) => o.name === contact.owner);

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', contact.id);
        onDragStart?.(e, contact.id);
      }}
      onClick={() => onOpenDetails(contact.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenDetails(contact.id);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Contact card for ${contact.name}`}
      className="group relative bg-surface-container-lowest rounded-lg p-space-sm shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing border border-surface-container-highest/60 focus:outline-none focus:ring-2 focus:ring-primary-container"
    >
      {/* Header: Name and Drag Indicator */}
      <div className="flex items-start justify-between gap-space-xs mb-space-2xs">
        <div className="min-w-0 flex-1">
          <span className="font-body-medium text-body-medium text-on-surface font-semibold tracking-tight block truncate group-hover:text-primary transition-colors">
            {contact.name}
          </span>
          <span className="font-caption text-caption text-on-surface-variant block truncate">
            {contact.company ? (
              <>
                {contact.company}
                {contact.role && <span> · {contact.role}</span>}
              </>
            ) : contact.role ? (
              contact.role
            ) : (
              contact.email || <span className="italic text-outline/60">No details</span>
            )}
          </span>
        </div>
        <span
          className="material-symbols-outlined text-outline/40 group-hover:text-outline text-[1.125rem] transition-colors select-none"
          title="Drag to change stage"
        >
          drag_indicator
        </span>
      </div>

      {/* Labels */}
      {contact.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-space-sm">
          {contact.labels.map((l) => (
            <LabelBadge key={l} label={l} />
          ))}
        </div>
      )}

      {/* Footer: Owner and Stage change shortcut */}
      <div className="flex items-center justify-between pt-space-xs border-t border-surface-container-highest/40 bg-surface-container-lowest text-on-surface-variant">
        <div className="flex items-center gap-space-2xs min-w-0">
          {ownerObj?.avatar ? (
            <img
              src={ownerObj.avatar}
              alt={contact.owner}
              className="w-4 h-4 rounded-full object-cover flex-shrink-0"
            />
          ) : (
            <span className="w-4 h-4 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-mono-keycap text-[9px] flex-shrink-0">
              {ownerObj ? ownerObj.initials : getInitials(contact.owner)}
            </span>
          )}
          <span className="font-caption text-caption text-on-surface-variant truncate">
            {contact.owner || 'Unassigned'}
          </span>
        </div>

        {/* Actions: stage quick-switch and trash button */}
        <div className="flex items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
          {/* Non-drag keyboard accessible stage quick-switch */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowStageMenu(!showStageMenu)}
              title="Move stage (accessible alternative to drag)"
              className="p-1 rounded text-outline hover:text-on-surface hover:bg-surface-container transition-colors flex items-center justify-center"
              aria-label={`Change stage for ${contact.name}`}
            >
              <span className="material-symbols-outlined text-[1rem]">swap_horiz</span>
            </button>

            {showStageMenu && onMoveStage && (
              <div className="absolute right-0 bottom-full mb-1 w-36 bg-surface-container-lowest rounded-lg shadow-xl border border-surface-container-highest py-1 z-30 animate-in fade-in">
                <div className="px-2 py-1 text-[10px] uppercase font-semibold text-outline">
                  Move to stage
                </div>
                {CONTACT_STAGES.map((st) => (
                  <button
                    key={st}
                    type="button"
                    disabled={st === contact.stage}
                    onClick={() => {
                      onMoveStage(contact.id, st);
                      setShowStageMenu(false);
                    }}
                    className={`w-full text-left px-2 py-1 text-xs transition-colors flex items-center justify-between ${
                      st === contact.stage
                        ? 'text-primary font-semibold bg-primary-fixed/40'
                        : 'hover:bg-surface-container-high text-on-surface'
                    }`}
                  >
                    <span>{st}</span>
                    {st === contact.stage && (
                      <span className="material-symbols-outlined text-[0.875rem]">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Delete / Trash button */}
          {onDeleteContact && (
            <button
              type="button"
              onClick={() => onDeleteContact(contact)}
              title="Delete contact"
              className="p-1 rounded text-outline hover:text-error hover:bg-red-50 transition-colors flex items-center justify-center"
              aria-label={`Delete ${contact.name}`}
            >
              <span className="material-symbols-outlined text-[1rem]">delete</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
