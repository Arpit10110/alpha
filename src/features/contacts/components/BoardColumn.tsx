import React, { useState } from 'react';
import { Contact, ContactStage } from '../model/contact.types';
import { STAGE_CONFIG } from '../model/contact.constants';
import { ContactCard } from './ContactCard';

interface BoardColumnProps {
  stage: ContactStage;
  contacts: Contact[];
  onOpenContact: (id: string) => void;
  onMoveContact: (id: string, newStage: ContactStage) => void;
  onDeleteContact?: (contact: Contact) => void;
  onAddContactToStage?: (stage: ContactStage) => void;
}

export const BoardColumn: React.FC<BoardColumnProps> = ({
  stage,
  contacts,
  onOpenContact,
  onMoveContact,
  onDeleteContact,
  onAddContactToStage,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const cfg = STAGE_CONFIG[stage];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const contactId = e.dataTransfer.getData('text/plain');
    if (contactId) {
      onMoveContact(contactId, stage);
    }
  };

  return (
    <div
      data-stage={stage.toLowerCase()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col rounded-xl bg-surface-container-low/90 p-space-sm min-w-[280px] flex-1 transition-all border border-t-[3.5px] ${cfg.topBorder} ${
        isDragOver
          ? 'border-primary-container bg-primary-fixed/20 shadow-md ring-2 ring-primary-container/20'
          : 'border-surface-container-highest/60 shadow-xs'
      }`}
    >
      {/* Column Stage Header */}
      <div className="flex items-center justify-between px-space-2xs py-1 mb-space-sm select-none">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border shadow-2xs font-semibold text-xs ${cfg.badgeBg} ${cfg.badgeText} ${cfg.border}`}
          >
            <span className={`w-2 h-2 rounded-full ${cfg.dotBg} ring-2 ring-white shadow-xs`} />
            <span className="font-bold tracking-tight">{stage}</span>
          </div>
          <span
            className={`inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full font-mono text-xs font-bold shadow-2xs ${
              contacts.length > 0
                ? `${cfg.pillBg} ${cfg.pillText} ring-1 ${cfg.border}`
                : 'bg-surface-container-highest text-on-surface-variant'
            }`}
          >
            {contacts.length}
          </span>
        </div>
        {onAddContactToStage && (
          <button
            type="button"
            onClick={() => onAddContactToStage(stage)}
            title={`Add contact to ${stage}`}
            className="w-7 h-7 flex items-center justify-center text-outline hover:text-on-surface rounded-lg hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[1.125rem]">add</span>
          </button>
        )}
      </div>

      {/* Cards List or Empty Column State */}
      {contacts.length > 0 ? (
        <div className="flex flex-col gap-space-xs flex-1">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onOpenDetails={onOpenContact}
              onMoveStage={onMoveContact}
              onDeleteContact={onDeleteContact}
            />
          ))}
        </div>
      ) : (
        /* Empty Column Dropzone Container as designed in Stitch Screen 3 */
        <div className="flex flex-col items-center justify-center p-space-lg rounded-xl bg-surface-container/60 border border-dashed border-outline-variant/60 text-center flex-1 min-h-[300px]">
          <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mb-space-sm shadow-sm">
            <span className="material-symbols-outlined text-outline text-[1.5rem]">inventory_2</span>
          </div>
          <span className="font-headline-md text-headline-md text-on-surface font-medium mb-space-3xs">
            No contacts yet
          </span>
          <p className="font-caption text-caption text-on-surface-variant max-w-[190px] mb-space-md leading-relaxed">
            Drag contacts here or add a new {stage.toLowerCase()}
          </p>
          {onAddContactToStage && (
            <button
              type="button"
              onClick={() => onAddContactToStage(stage)}
              className="inline-flex items-center gap-space-2xs px-space-md py-space-xs rounded-lg font-body-compact text-body-compact bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container-high transition-all active:scale-[0.98] border border-outline-variant"
            >
              <span className="material-symbols-outlined text-[1rem]">add</span>
              <span>Add contact</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
