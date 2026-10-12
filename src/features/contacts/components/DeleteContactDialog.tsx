import React, { useEffect, useRef } from 'react';
import { Contact } from '../model/contact.types';
import { getInitials } from '../utils/contactIds';

interface DeleteContactDialogProps {
  contact?: Contact | null;
  bulkContacts?: Contact[] | null;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const DeleteContactDialog: React.FC<DeleteContactDialogProps> = ({
  contact,
  bulkContacts,
  isOpen,
  onCancel,
  onConfirm,
}) => {
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    cancelBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const isBulk = Boolean(bulkContacts && bulkContacts.length > 0);
  const count = bulkContacts ? bulkContacts.length : 1;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-space-md transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
    >
      <div className="w-full max-w-[460px] bg-surface-container-lowest rounded-xl shadow-2xl p-space-xl transition-all border border-surface-container-highest animate-in fade-in zoom-in-95 flex flex-col">
        <div className="flex items-start gap-space-md">
          <div className="w-10 h-10 rounded-full bg-error-container/60 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-error text-[1.375rem]">error</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2
              id="delete-dialog-title"
              className="font-headline-md text-headline-md text-on-surface font-semibold tracking-tight"
            >
              {isBulk ? `Delete ${count} contacts?` : 'Delete contact?'}
            </h2>
            <p className="font-body-default text-body-default text-on-surface-variant mt-space-2xs leading-relaxed">
              {isBulk ? (
                <>
                  Are you sure you want to delete these{' '}
                  <span className="font-semibold text-on-surface">{count} contacts</span>? This
                  action will permanently remove them from this workspace.
                </>
              ) : (
                <>
                  Are you sure you want to delete{' '}
                  <span className="font-semibold text-on-surface">{contact?.name}</span>? This
                  action will permanently remove this contact, along with all associated notes and
                  stage history.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Contact preview card */}
        {!isBulk && contact && (
          <div className="mt-space-md bg-surface-container-low rounded-lg p-space-sm flex items-center justify-between border border-surface-container-highest/60">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-9 h-9 rounded-full bg-primary-fixed text-primary font-mono-metric text-mono-metric font-semibold flex items-center justify-center flex-shrink-0">
                {getInitials(contact.name)}
              </div>
              <div className="min-w-0">
                <div className="font-body-medium text-body-medium text-on-surface truncate font-semibold">
                  {contact.name}
                </div>
                <div className="font-caption text-caption text-outline truncate flex items-center gap-1">
                  <span>{contact.company || 'No company'}</span>
                  {contact.role && (
                    <>
                      <span className="inline-block w-1 h-1 rounded-full bg-outline" />
                      <span>{contact.role}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="font-mono-metric text-mono-metric text-on-surface-variant bg-surface-container px-space-xs py-space-3xs rounded border border-outline-variant">
                {contact.id}
              </span>
            </div>
          </div>
        )}

        {isBulk && bulkContacts && (
          <div className="mt-space-md bg-surface-container-low rounded-lg p-space-sm max-h-36 overflow-y-auto border border-surface-container-highest/60 divide-y divide-surface-container-highest/40">
            {bulkContacts.map((c) => (
              <div key={c.id} className="py-1 flex items-center justify-between text-xs">
                <span className="font-semibold text-on-surface truncate">{c.name}</span>
                <span className="text-outline truncate">{c.company || c.stage}</span>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="mt-space-lg flex items-center justify-end gap-space-sm select-none">
          <button
            ref={cancelBtnRef}
            type="button"
            onClick={onCancel}
            className="px-space-md py-space-xs bg-surface-container hover:bg-surface-container-high text-on-surface font-body-medium text-body-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-container"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center gap-space-2xs bg-error hover:bg-red-700 text-on-error font-body-medium text-body-medium px-space-md py-space-xs rounded-lg shadow-sm transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-error font-medium"
          >
            <span className="material-symbols-outlined text-[1rem]">delete</span>
            <span>{isBulk ? `Delete ${count} contacts` : 'Delete contact'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
