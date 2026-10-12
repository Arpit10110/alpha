import { Contact } from '../model/contact.types';
import { STORAGE_KEY } from '../model/contact.constants';
import { SEED_CONTACTS } from '../data/seedContacts';

function isValidContact(item: unknown): item is Contact {
  if (!item || typeof item !== 'object') return false;
  const c = item as Record<string, unknown>;
  return (
    typeof c.id === 'string' &&
    typeof c.name === 'string' &&
    typeof c.stage === 'string' &&
    Array.isArray(c.labels)
  );
}

export function loadContacts(): Contact[] {
  if (typeof window === 'undefined') {
    return SEED_CONTACTS;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed missing storage
      saveContacts(SEED_CONTACTS);
      return SEED_CONTACTS;
    }

    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every(isValidContact)) {
      return parsed;
    }

    console.warn('Malformed contacts payload in localStorage, resetting to seed data.');
    saveContacts(SEED_CONTACTS);
    return SEED_CONTACTS;
  } catch (err) {
    console.error('Error reading contacts from localStorage:', err);
    return SEED_CONTACTS;
  }
}

export function saveContacts(contacts: Contact[]): boolean {
  if (typeof window === 'undefined') return false;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    return true;
  } catch (err) {
    console.error('Error writing contacts to localStorage:', err);
    return false;
  }
}

export function resetContactsToSeed(): Contact[] {
  saveContacts(SEED_CONTACTS);
  return SEED_CONTACTS;
}
