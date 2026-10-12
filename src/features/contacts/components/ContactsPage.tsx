import React, { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { Contact, ContactDraft, ContactStage, ViewMode } from '../model/contact.types';
import { useContacts } from '../hooks/useContacts';
import { useContactFilters } from '../hooks/useContactFilters';
import { filterContacts } from '../utils/contactSearch';
import { exportContactsToCSV } from '../utils/contactExport';
import { ContactsToolbar } from './ContactsToolbar';
import { ActiveFilterChips } from './ActiveFilterChips';
import { ContactsTable } from './ContactsTable';
import { ContactsBoard } from './ContactsBoard';
import { ContactsEmptyState } from './ContactsEmptyState';
import { ContactDirectoryStats } from './ContactDirectoryStats';
import { ContactDetailsDrawer } from './ContactDetailsDrawer';
import { CreateContactModal } from './CreateContactModal';
import { DeleteContactDialog } from './DeleteContactDialog';

interface ContactsPageProps {
  contactsState?: ReturnType<typeof useContacts>;
  filterControls?: ReturnType<typeof useContactFilters>;
}

export const ContactsPage: React.FC<ContactsPageProps> = ({
  contactsState: externalContactsState,
  filterControls: externalFilterControls,
}) => {
  const localContacts = useContacts();
  const localFilters = useContactFilters();

  const {
    contacts,
    createContact,
    updateContact,
    updateContactStage,
    deleteContact,
    deleteMultipleContacts,
  } = externalContactsState || localContacts;

  // Active View ('table' | 'board')
  const [activeView, setActiveView] = useState<ViewMode>('table');

  // Drawer & Modal state
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createStageDefault, setCreateStageDefault] = useState<ContactStage>('Lead');

  // Deletion state (single or bulk)
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);
  const [bulkContactsToDelete, setBulkContactsToDelete] = useState<Contact[] | null>(null);

  // Filter & Search hook
  const {
    searchInput,
    setSearchInput,
    debouncedSearch,
    selectedStages,
    selectedOwners,
    selectedLabels,
    toggleStage,
    toggleOwner,
    toggleLabel,
    clearSearch,
    clearAllFilters,
    filtersState,
    activeFilterCount,
  } = externalFilterControls || localFilters;

  // Derived filtered contacts from single canonical collection
  const visibleContacts = useMemo(
    () => filterContacts(contacts, filtersState),
    [contacts, filtersState]
  );

  // Find currently selected contact for details drawer
  const selectedContact = useMemo(
    () => contacts.find((c) => c.id === selectedContactId) || null,
    [contacts, selectedContactId]
  );

  // Handlers
  const handleOpenContact = (id: string) => {
    setSelectedContactId(id);
  };

  const handleCloseDrawer = () => {
    setSelectedContactId(null);
  };

  const handleSaveContact = (id: string, updates: Partial<ContactDraft>) => {
    const updated = updateContact(id, updates);
    if (updated) {
      toast.success(`Changes saved for ${updated.name}`);
    }
  };

  const handleCreateContact = (draft: ContactDraft) => {
    const created = createContact(draft);
    toast.success(`Created contact ${created.name}`);
  };

  const handleDeleteContactConfirm = () => {
    if (bulkContactsToDelete && bulkContactsToDelete.length > 0) {
      const count = bulkContactsToDelete.length;
      const ids = bulkContactsToDelete.map((c) => c.id);
      deleteMultipleContacts(ids);
      if (selectedContactId && ids.includes(selectedContactId)) {
        setSelectedContactId(null);
      }
      setBulkContactsToDelete(null);
      toast.error(`Deleted ${count} ${count === 1 ? 'contact' : 'contacts'}`);
      return;
    }

    if (contactToDelete) {
      const name = contactToDelete.name;
      deleteContact(contactToDelete.id);
      if (selectedContactId === contactToDelete.id) {
        setSelectedContactId(null);
      }
      setContactToDelete(null);
      toast.error(`Deleted ${name}`);
    }
  };

  const handleDeleteMultiplePrompt = (ids: string[]) => {
    const targets = contacts.filter((c) => ids.includes(c.id));
    if (targets.length > 0) {
      setBulkContactsToDelete(targets);
    }
  };

  const handleMoveContactStage = (id: string, newStage: ContactStage) => {
    const target = contacts.find((c) => c.id === id);
    updateContactStage(id, newStage);
    toast.success(`Moved ${target?.name || 'contact'} to ${newStage}`);
  };

  const handleExport = () => {
    if (visibleContacts.length === 0) {
      toast.info('No contacts available to export');
      return;
    }
    exportContactsToCSV(visibleContacts);
    toast.success(`Exported ${visibleContacts.length} contacts to CSV`);
  };

  const handleAddContactToSpecificStage = (stage: ContactStage) => {
    setCreateStageDefault(stage);
    setIsCreateOpen(true);
  };

  const handleClearAll = () => {
    clearAllFilters();
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Page Title & Main Header */}
      <div className="w-full px-margin pt-space-lg pb-space-sm border-b border-surface-container-highest bg-surface">
        <div className="flex items-center justify-between gap-space-md mb-space-md">
          <div className="flex items-center gap-space-sm">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
              Contacts
            </h1>
            <span className="inline-flex items-center px-space-xs py-space-3xs rounded-full font-mono-metric text-mono-metric bg-surface-container text-on-surface-variant border border-outline-variant">
              {visibleContacts.length === contacts.length
                ? `${contacts.length} contacts`
                : `${visibleContacts.length} of ${contacts.length} contacts`}
            </span>
          </div>

          <div className="flex items-center gap-space-xs">
            <button
              type="button"
              onClick={() => {
                setCreateStageDefault('Lead');
                setIsCreateOpen(true);
              }}
              className="inline-flex items-center gap-space-2xs bg-primary-container text-on-primary font-body-medium text-body-medium px-space-md py-space-xs rounded-xl shadow-sm hover:bg-primary transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary-container"
            >
              <span className="material-symbols-outlined text-[1.125rem]">add</span>
              <span>Add contact</span>
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <ContactsToolbar
          view={activeView}
          onViewChange={setActiveView}
          searchInput={searchInput}
          onSearchChange={setSearchInput}
          onClearSearch={clearSearch}
          selectedStages={selectedStages}
          onToggleStage={toggleStage}
          selectedOwners={selectedOwners}
          onToggleOwner={toggleOwner}
          selectedLabels={selectedLabels}
          onToggleLabel={toggleLabel}
          onClearAllFilters={handleClearAll}
          activeFilterCount={activeFilterCount}
          onExport={handleExport}
          filteredCount={visibleContacts.length}
          totalCount={contacts.length}
        />

        {/* Active Filter Chips */}
        <ActiveFilterChips
          searchQuery={debouncedSearch}
          onClearSearch={clearSearch}
          selectedStages={selectedStages}
          onRemoveStage={toggleStage}
          selectedOwners={selectedOwners}
          onRemoveOwner={toggleOwner}
          selectedLabels={selectedLabels}
          onRemoveLabel={toggleLabel}
          onClearAll={handleClearAll}
        />
      </div>

      {/* Main Content Area with generous bottom space */}
      <main className="w-full flex-1 px-margin pt-space-md pb-28 bg-surface">
        {/* Metric Directory Stats */}
        <ContactDirectoryStats contacts={contacts} />

        {/* Views */}
        {visibleContacts.length > 0 ? (
          activeView === 'table' ? (
            <ContactsTable
              contacts={visibleContacts}
              onOpenContact={handleOpenContact}
              onUpdateStage={handleMoveContactStage}
              onDeleteContact={(c) => setContactToDelete(c)}
              onDeleteMultiple={handleDeleteMultiplePrompt}
            />
          ) : (
            <ContactsBoard
              contacts={visibleContacts}
              onOpenContact={handleOpenContact}
              onMoveContact={handleMoveContactStage}
              onDeleteContact={(c) => setContactToDelete(c)}
              onAddContactToStage={handleAddContactToSpecificStage}
            />
          )
        ) : (
          <ContactsEmptyState onClearFilters={handleClearAll} />
        )}
      </main>

      {/* Contact Details Drawer */}
      <ContactDetailsDrawer
        contact={selectedContact}
        isOpen={selectedContact !== null}
        onClose={handleCloseDrawer}
        onSave={handleSaveContact}
        onDelete={(c) => setContactToDelete(c)}
        onUpdateStage={(id, st) => handleMoveContactStage(id, st)}
      />

      {/* Create Contact Modal */}
      <CreateContactModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreateContact}
        initialStage={createStageDefault}
      />

      {/* Delete Confirmation Dialog (Single or Bulk) */}
      <DeleteContactDialog
        contact={contactToDelete}
        bulkContacts={bulkContactsToDelete}
        isOpen={contactToDelete !== null || bulkContactsToDelete !== null}
        onCancel={() => {
          setContactToDelete(null);
          setBulkContactsToDelete(null);
        }}
        onConfirm={handleDeleteContactConfirm}
      />
    </div>
  );
};
