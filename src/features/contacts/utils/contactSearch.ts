import { Contact, ContactFiltersState } from '../model/contact.types';

export function matchesContactSearch(contact: Contact, rawQuery: string): boolean {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return true;

  const targetFields = [
    contact.name,
    contact.email,
    contact.company,
    contact.role,
    contact.owner,
    ...contact.labels,
    contact.notes,
  ];

  return targetFields.some((field) => field && field.toLowerCase().includes(query));
}

export function filterContacts(
  contacts: Contact[],
  filters: ContactFiltersState
): Contact[] {
  return contacts.filter((contact) => {
    // 1. Text Search
    if (!matchesContactSearch(contact, filters.search)) {
      return false;
    }

    // 2. Stage Filter (OR within stages)
    if (filters.stages.length > 0 && !filters.stages.includes(contact.stage)) {
      return false;
    }

    // 3. Owner Filter (OR within owners)
    if (filters.owners.length > 0 && !filters.owners.includes(contact.owner)) {
      return false;
    }

    // 4. Labels Filter (OR within selected labels, or AND)
    // Assignment: "multiple selected labels may use OR semantics within the label filter"
    if (filters.labels.length > 0) {
      const hasAnyLabel = filters.labels.some((l) => contact.labels.includes(l));
      if (!hasAnyLabel) return false;
    }

    return true;
  });
}
