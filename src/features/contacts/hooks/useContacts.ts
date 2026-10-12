import { useCallback, useState } from 'react';
import { Contact, ContactDraft, ContactStage } from '../model/contact.types';
import { loadContacts, resetContactsToSeed, saveContacts } from '../utils/contactStorage';
import { generateContactId } from '../utils/contactIds';

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>(() => loadContacts());

  const createContact = useCallback(
    (draft: ContactDraft): Contact => {
      const now = new Date().toISOString();
      const newContact: Contact = {
        id: generateContactId(),
        name: draft.name.trim(),
        email: draft.email.trim(),
        company: draft.company.trim(),
        role: draft.role.trim(),
        owner: draft.owner || 'Sarah Chen',
        labels: draft.labels,
        stage: draft.stage || 'Lead',
        notes: draft.notes.trim(),
        createdAt: now,
        updatedAt: now,
      };

      setContacts((prev) => {
        const next = [newContact, ...prev];
        saveContacts(next);
        return next;
      });

      return newContact;
    },
    []
  );

  const updateContact = useCallback(
    (id: string, updates: Partial<ContactDraft>): Contact | null => {
      let updatedContact: Contact | null = null;
      setContacts((prev) => {
        const target = prev.find((c) => c.id === id);
        if (!target) return prev;

        const now = new Date().toISOString();
        updatedContact = {
          ...target,
          ...updates,
          name: updates.name !== undefined ? updates.name.trim() : target.name,
          email: updates.email !== undefined ? updates.email.trim() : target.email,
          company: updates.company !== undefined ? updates.company.trim() : target.company,
          role: updates.role !== undefined ? updates.role.trim() : target.role,
          notes: updates.notes !== undefined ? updates.notes.trim() : target.notes,
          updatedAt: now,
        };

        const next = prev.map((c) => (c.id === id ? (updatedContact as Contact) : c));
        saveContacts(next);
        return next;
      });

      return updatedContact;
    },
    []
  );

  const updateContactStage = useCallback(
    (id: string, newStage: ContactStage) => {
      setContacts((prev) => {
        const target = prev.find((c) => c.id === id);
        if (!target || target.stage === newStage) return prev;

        const next = prev.map((c) =>
          c.id === id
            ? {
                ...c,
                stage: newStage,
                updatedAt: new Date().toISOString(),
              }
            : c
        );
        saveContacts(next);
        return next;
      });
    },
    []
  );

  const deleteContact = useCallback((id: string) => {
    setContacts((prev) => {
      const next = prev.filter((c) => c.id !== id);
      saveContacts(next);
      return next;
    });
  }, []);

  const deleteMultipleContacts = useCallback((ids: string[]) => {
    const idSet = new Set(ids);
    setContacts((prev) => {
      const next = prev.filter((c) => !idSet.has(c.id));
      saveContacts(next);
      return next;
    });
  }, []);

  const resetToSeed = useCallback(() => {
    const seed = resetContactsToSeed();
    setContacts(seed);
  }, []);

  return {
    contacts,
    createContact,
    updateContact,
    updateContactStage,
    deleteContact,
    deleteMultipleContacts,
    resetToSeed,
  };
}
