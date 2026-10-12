import React, { useEffect, useState } from 'react';
import { ContactDraft, ContactStage } from '../model/contact.types';
import { validateContactDraft } from '../model/contact.validation';
import { Modal } from '../../../components/ui/Modal';
import { ContactForm } from './ContactForm';

interface CreateContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (draft: ContactDraft) => void;
  initialStage?: ContactStage;
}

export const CreateContactModal: React.FC<CreateContactModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  initialStage = 'Lead',
}) => {
  const [draft, setDraft] = useState<ContactDraft>({
    name: '',
    email: '',
    company: '',
    role: '',
    owner: 'Sarah Chen',
    labels: ['Inbound'],
    stage: initialStage,
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when opened
  useEffect(() => {
    if (isOpen) {
      setDraft({
        name: '',
        email: '',
        company: '',
        role: '',
        owner: 'Sarah Chen',
        labels: ['Inbound'],
        stage: initialStage,
        notes: '',
      });
      setErrors({});
    }
  }, [isOpen, initialStage]);

  // Handle ⌘+Enter shortcut
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, draft]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const validation = validateContactDraft(draft);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onCreate(draft);
    onClose();
  };

  const handleDraftChange = (updates: Partial<ContactDraft>) => {
    setDraft((prev) => ({ ...prev, ...updates }));
    if (updates.name && errors.name) {
      setErrors((prev) => ({ ...prev, name: '' }));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add contact"
      description="Add someone to your contact workspace."
      maxWidth="max-w-[620px]"
    >
      <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
        <div className="px-space-xl py-space-sm max-h-[calc(85vh-150px)] overflow-y-auto">
          <ContactForm
            draft={draft}
            onChange={handleDraftChange}
            errors={errors}
            isModal={true}
            autoFocus={true}
          />
        </div>

        {/* Modal Footer */}
        <div className="px-space-xl py-space-md bg-surface-container-low border-t border-surface-container-highest/60 flex items-center justify-between select-none">
          <div className="hidden sm:flex items-center gap-1 text-caption font-caption text-outline">
            <span>Press</span>
            <kbd className="font-mono-keycap text-mono-keycap bg-surface-container px-1 py-0.5 rounded text-on-surface-variant border border-outline-variant">
              Esc
            </kbd>
            <span>to cancel,</span>
            <kbd className="font-mono-keycap text-mono-keycap bg-surface-container px-1 py-0.5 rounded text-on-surface-variant border border-outline-variant">
              ⌘ + Enter
            </kbd>
            <span>to create</span>
          </div>

          <div className="flex items-center gap-space-xs ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-space-md py-1.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-medium text-body-medium hover:bg-surface-container-high transition-all border border-outline-variant"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-space-md py-1.5 rounded-lg bg-primary-container text-on-primary font-body-medium text-body-medium hover:bg-primary transition-all active:scale-[0.98] shadow-sm flex items-center gap-1.5"
            >
              <span>Create contact</span>
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
