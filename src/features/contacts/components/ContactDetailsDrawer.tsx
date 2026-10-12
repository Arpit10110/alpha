import React, { useEffect, useState } from 'react';
import { Contact, ContactDraft, ContactStage } from '../model/contact.types';
import { validateContactDraft } from '../model/contact.validation';
import { Drawer } from '../../../components/ui/Drawer';
import { ContactDetailsView } from './ContactDetailsView';
import { ContactForm } from './ContactForm';

interface ContactDetailsDrawerProps {
  contact: Contact | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, updates: Partial<ContactDraft>) => void;
  onDelete: (contact: Contact) => void;
  onUpdateStage: (id: string, stage: ContactStage) => void;
}

export const ContactDetailsDrawer: React.FC<ContactDetailsDrawerProps> = ({
  contact,
  isOpen,
  onClose,
  onSave,
  onDelete,
  onUpdateStage,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<ContactDraft | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

  // Initialize draft when contact changes or entering edit mode
  useEffect(() => {
    if (contact) {
      setDraft({
        name: contact.name,
        email: contact.email,
        company: contact.company,
        role: contact.role,
        owner: contact.owner,
        labels: [...contact.labels],
        stage: contact.stage,
        notes: contact.notes,
      });
      setIsEditing(false);
      setErrors({});
      setShowDiscardConfirm(false);
    }
  }, [contact]);

  if (!contact || !draft) return null;

  const hasUnsavedChanges = () => {
    if (!isEditing) return false;
    return (
      draft.name !== contact.name ||
      draft.email !== contact.email ||
      draft.company !== contact.company ||
      draft.role !== contact.role ||
      draft.owner !== contact.owner ||
      draft.stage !== contact.stage ||
      draft.notes !== contact.notes ||
      JSON.stringify(draft.labels) !== JSON.stringify(contact.labels)
    );
  };

  const handleRequestClose = () => {
    if (isEditing && hasUnsavedChanges()) {
      setShowDiscardConfirm(true);
    } else {
      setIsEditing(false);
      onClose();
    }
  };

  const handleDiscardAndExit = () => {
    // Reset draft to current committed record
    setDraft({
      name: contact.name,
      email: contact.email,
      company: contact.company,
      role: contact.role,
      owner: contact.owner,
      labels: [...contact.labels],
      stage: contact.stage,
      notes: contact.notes,
    });
    setErrors({});
    setShowDiscardConfirm(false);
    setIsEditing(false);
  };

  const handleSave = () => {
    const validation = validateContactDraft(draft);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSave(contact.id, draft);
    setIsEditing(false);
    setErrors({});
  };

  const handleDraftChange = (updates: Partial<ContactDraft>) => {
    setDraft((prev) => (prev ? { ...prev, ...updates } : null));
    if (updates.name && errors.name) {
      setErrors((prev) => ({ ...prev, name: '' }));
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={handleRequestClose}>
      {isEditing ? (
        /* Edit Mode */
        <div className="flex flex-col h-full bg-surface-container-lowest">
          {/* Header */}
          <div className="flex items-center justify-between px-space-lg py-space-md border-b border-surface-container-highest/60 bg-surface-container-low select-none">
            <div className="flex items-center gap-space-2xs">
              <span className="font-headline-md text-headline-md text-on-surface font-semibold">
                Edit contact
              </span>
              <span className="font-mono-metric text-mono-metric text-outline">
                · {contact.name}
              </span>
            </div>

            <button
              type="button"
              onClick={handleRequestClose}
              aria-label="Close edit"
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container text-outline hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[1.25rem]">close</span>
            </button>
          </div>

          {/* Unsaved Warning Banner / Confirmation Modal as designed in Stitch Screen 4 */}
          {showDiscardConfirm && (
            <div className="p-space-md bg-amber-50 border-b border-amber-200 animate-in fade-in select-none">
              <div className="flex items-start gap-space-sm">
                <span className="material-symbols-outlined text-amber-700 text-[1.25rem]">
                  warning
                </span>
                <div className="flex-1">
                  <h4 className="font-body-medium font-semibold text-amber-900 text-sm">
                    Discard unsaved changes?
                  </h4>
                  <p className="font-caption text-caption text-amber-800 mt-1 leading-relaxed">
                    You have modified contact details. Any pending modifications will be discarded.
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() => setShowDiscardConfirm(false)}
                      className="px-2.5 py-1 rounded bg-white text-on-surface border border-amber-300 font-body-compact text-xs hover:bg-amber-100/50"
                    >
                      Keep Editing
                    </button>
                    <button
                      type="button"
                      onClick={handleDiscardAndExit}
                      className="px-2.5 py-1 rounded bg-error text-white font-body-compact text-xs hover:bg-red-700 font-medium"
                    >
                      Discard &amp; Exit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Body */}
          <div className="flex-1 overflow-y-auto">
            <ContactForm draft={draft} onChange={handleDraftChange} errors={errors} />
          </div>

          {/* Footer with Delete and Save/Cancel */}
          <div className="flex-shrink-0 px-space-lg py-4 bg-surface-container-lowest border-t border-surface-container-highest flex items-center justify-between z-10 select-none">
            <button
              type="button"
              onClick={() => onDelete(contact)}
              className="text-error hover:text-red-700 text-sm font-medium transition-colors py-1 px-1.5 rounded hover:bg-error-container/40 flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[1.125rem]">delete</span>
              <span>Delete contact</span>
            </button>

            <div className="flex items-center gap-space-xs">
              <button
                type="button"
                onClick={handleDiscardAndExit}
                className="px-space-md py-1.5 rounded-lg font-body-medium text-body-medium text-on-surface hover:bg-surface-container transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-1.5 rounded-lg bg-primary-container text-white font-body-medium text-body-medium font-medium shadow-sm hover:bg-primary active:scale-[0.98] transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[1rem]">check</span>
                <span>Save changes</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* View Mode */
        <ContactDetailsView
          contact={contact}
          onEdit={() => setIsEditing(true)}
          onClose={onClose}
          onDelete={() => onDelete(contact)}
          onUpdateStage={(newStage) => onUpdateStage(contact.id, newStage)}
        />
      )}
    </Drawer>
  );
};
