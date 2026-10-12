import React, { useState } from 'react';
import { Contact, ContactStage } from '../model/contact.types';
import { getInitials } from '../utils/contactIds';
import { LabelBadge } from '../../../components/ui/Badge';
import { AVAILABLE_OWNERS, CONTACT_STAGES, STAGE_CONFIG } from '../model/contact.constants';

interface ContactDetailsViewProps {
  contact: Contact;
  onEdit: () => void;
  onClose: () => void;
  onDelete: () => void;
  onUpdateStage: (stage: ContactStage) => void;
}

export const ContactDetailsView: React.FC<ContactDetailsViewProps> = ({
  contact,
  onEdit,
  onClose,
  onDelete,
  onUpdateStage,
}) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const initials = getInitials(contact.name);
  const ownerObj = AVAILABLE_OWNERS.find((o) => o.name === contact.owner);

  const handleCopyEmail = () => {
    if (!contact.email) return;
    navigator.clipboard?.writeText(contact.email);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-surface-container-lowest">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between px-space-xl py-space-md bg-surface-container-low/50 border-b border-surface-container-highest/60 select-none">
        {/* Title */}
        <div className="flex items-center gap-space-2xs font-caption text-caption text-outline">
          <span className="text-on-surface font-semibold truncate max-w-[200px]">
            {contact.name}
          </span>
          <span>· Details</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-space-xs">
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-space-2xs px-space-xs py-1 rounded-lg bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-body-compact text-body-compact border border-outline-variant shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[1rem]">edit</span>
            <span>Edit</span>
          </button>

          {/* Close button with Esc hint */}
          <div className="relative group">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close drawer"
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container text-outline hover:text-on-surface transition-colors focus:outline-none focus:ring-1 focus:ring-primary-container"
            >
              <span className="material-symbols-outlined text-[1.25rem]">close</span>
            </button>
            <div className="absolute right-0 top-full mt-1 hidden group-hover:flex items-center bg-inverse-surface text-inverse-on-surface font-caption text-[11px] px-space-xs py-0.5 rounded shadow-md whitespace-nowrap z-50">
              Close drawer <span className="ml-1 opacity-70 font-mono-keycap">Esc</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Profile Section */}
      <div className="px-space-xl pt-space-lg pb-space-md flex flex-col border-b border-surface-container-highest/40 bg-surface-container-lowest">
        <div className="flex items-start gap-space-md">
          <div className="w-14 h-14 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-headline-lg text-headline-lg font-bold shadow-sm flex-shrink-0">
            {initials}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight truncate">
              {contact.name}
            </h2>
            <p className="font-body-default text-body-default text-on-surface-variant truncate">
              {contact.role && contact.company
                ? `${contact.role} at ${contact.company}`
                : contact.role || contact.company || 'Contact'}
            </p>
          </div>
        </div>

        {/* Prominent Lifecycle Stage Selector / Highlight */}
        <div className="mt-space-md w-full">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-caption text-caption uppercase tracking-wider text-outline font-semibold">
              Current Stage
            </span>
            <span className="font-caption text-[11px] text-outline font-medium">
              Click to update stage
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 bg-surface-container-low p-1.5 rounded-xl border border-surface-container-highest/80 select-none">
            {CONTACT_STAGES.map((st) => {
              const isCurrent = contact.stage === st;
              const cfg = STAGE_CONFIG[st];
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => onUpdateStage(st)}
                  title={`Set stage to ${st}`}
                  className={`py-1.5 px-2 rounded-lg font-caption text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                    isCurrent
                      ? `${cfg.activeBg} ${cfg.activeText} shadow-md ring-2 ring-offset-1 ring-offset-white ${cfg.border} scale-[1.02]`
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-white' : cfg.dotBg}`} />
                  <span className="truncate">{st}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto px-space-xl py-space-md space-y-space-lg">
        {/* Properties Grid */}
        <section className="flex flex-col">
          <div className="flex items-center justify-between pb-space-xs">
            <span className="font-caption text-caption uppercase tracking-wider text-outline font-medium">
              Contact Details
            </span>
          </div>
          <div className="bg-surface-container-low rounded-xl p-space-sm space-y-space-xs border border-surface-container-highest/40">
            {/* Email */}
            <div className="flex items-center justify-between py-space-2xs px-space-xs rounded-lg hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-space-xs w-28 text-outline font-caption text-caption">
                <span className="material-symbols-outlined text-[1rem]">mail</span>
                <span>Email</span>
              </div>
              <div className="flex items-center gap-space-xs flex-1 justify-end min-w-0">
                {contact.email ? (
                  <>
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-mono-metric text-mono-metric text-primary hover:underline truncate"
                    >
                      {contact.email}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      title={copySuccess ? 'Copied!' : 'Copy email'}
                      className="text-outline hover:text-on-surface p-0.5 rounded transition-colors"
                    >
                      <span className="material-symbols-outlined text-[0.9375rem]">
                        {copySuccess ? 'check' : 'content_copy'}
                      </span>
                    </button>
                  </>
                ) : (
                  <span className="font-mono-metric text-mono-metric text-outline/60 italic">
                    Not set
                  </span>
                )}
              </div>
            </div>

            {/* Company */}
            <div className="flex items-center justify-between py-space-2xs px-space-xs rounded-lg hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-space-xs w-28 text-outline font-caption text-caption">
                <span className="material-symbols-outlined text-[1rem]">business</span>
                <span>Company</span>
              </div>
              <div className="flex items-center gap-space-2xs flex-1 justify-end min-w-0">
                <span className="font-body-compact text-body-compact text-on-surface font-medium truncate">
                  {contact.company || <span className="text-outline/60 font-mono">Not set</span>}
                </span>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center justify-between py-space-2xs px-space-xs rounded-lg hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-space-xs w-28 text-outline font-caption text-caption">
                <span className="material-symbols-outlined text-[1rem]">badge</span>
                <span>Role</span>
              </div>
              <div className="flex-1 text-right font-body-compact text-body-compact text-on-surface truncate">
                {contact.role || <span className="text-outline/60 font-mono">Not set</span>}
              </div>
            </div>

            {/* Owner */}
            <div className="flex items-center justify-between py-space-2xs px-space-xs rounded-lg hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-space-xs w-28 text-outline font-caption text-caption">
                <span className="material-symbols-outlined text-[1rem]">person</span>
                <span>Owner</span>
              </div>
              <div className="flex items-center gap-space-xs flex-1 justify-end">
                {ownerObj?.avatar ? (
                  <img
                    src={ownerObj.avatar}
                    alt={contact.owner}
                    className="w-4 h-4 rounded-full object-cover"
                  />
                ) : (
                  <span className="w-4 h-4 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-mono-keycap text-[9px]">
                    {ownerObj ? ownerObj.initials : getInitials(contact.owner)}
                  </span>
                )}
                <span className="font-body-compact text-body-compact text-on-surface">
                  {contact.owner || 'Unassigned'}
                </span>
              </div>
            </div>

            {/* Labels */}
            <div className="flex items-center justify-between py-space-2xs px-space-xs rounded-lg hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-space-xs w-28 text-outline font-caption text-caption">
                <span className="material-symbols-outlined text-[1rem]">label</span>
                <span>Labels</span>
              </div>
              <div className="flex items-center gap-1 flex-wrap justify-end">
                {contact.labels.length > 0 ? (
                  contact.labels.map((l) => <LabelBadge key={l} label={l} />)
                ) : (
                  <span className="text-outline/60 font-caption text-caption italic">
                    None
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Notes Section */}
        <section className="flex flex-col gap-space-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[1rem] text-outline">
                description
              </span>
              <span className="font-headline-md text-headline-md text-on-surface font-semibold">
                Notes
              </span>
            </div>
            <span className="font-caption text-caption text-outline">
              Last saved {new Date(contact.updatedAt).toLocaleDateString()}
            </span>
          </div>
          <div className="bg-surface-container-low border border-surface-container-highest/60 p-space-md rounded-xl text-on-surface font-body-default text-body-default leading-relaxed min-h-[90px]">
            {contact.notes ? (
              <p className="whitespace-pre-wrap">{contact.notes}</p>
            ) : (
              <p className="text-outline/60 italic font-body-compact">
                No notes entered yet. Click &ldquo;Edit&rdquo; above to add meeting context or observations.
              </p>
            )}
          </div>
        </section>

        {/* Activity Timeline Preview */}
        <section className="flex flex-col gap-space-xs pb-space-lg">
          <div className="flex items-center justify-between">
            <span className="font-caption text-caption uppercase tracking-wider text-outline font-medium">
              Activity Stream
            </span>
          </div>
          <div className="flex flex-col pl-space-xs relative">
            <div className="absolute left-[13px] top-2 bottom-3 w-px bg-surface-container-highest" />

            <div className="flex items-start gap-space-sm relative py-space-xs">
              <div className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0 z-10 border border-surface-container-highest">
                <span className="material-symbols-outlined text-[0.75rem] text-outline">flag</span>
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <p className="font-body-compact text-body-compact text-on-surface">
                  Stage currently set to{' '}
                  <span className="font-semibold text-primary">{contact.stage}</span>
                </p>
                <span className="font-caption text-caption text-outline">
                  {new Date(contact.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-space-sm relative py-space-xs">
              <div className="w-5 h-5 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0 z-10 border border-surface-container-highest">
                <span className="material-symbols-outlined text-[0.75rem] text-outline">add</span>
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <p className="font-body-compact text-body-compact text-on-surface">
                  Contact created by <span className="font-medium">{contact.owner}</span>
                </p>
                <span className="font-caption text-caption text-outline">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Drawer Footer */}
      <div className="px-space-xl py-space-md bg-surface-container-low border-t border-surface-container-highest/60 flex items-center justify-between select-none">
        <div className="flex items-center gap-space-xs text-outline font-caption text-caption font-mono">
          <span className="material-symbols-outlined text-[0.875rem]">tag</span>
          <span>{contact.id}</span>
        </div>

        <button
          type="button"
          onClick={onDelete}
          className="text-error hover:text-red-700 text-body-compact font-medium transition-colors py-1 px-2 rounded hover:bg-error-container/40 flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[1.125rem]">delete</span>
          <span>Delete contact</span>
        </button>
      </div>
    </div>
  );
};
