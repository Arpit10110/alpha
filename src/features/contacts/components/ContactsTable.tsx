import React, { useState } from 'react';
import { Contact, ContactStage } from '../model/contact.types';
import { ContactTableRow } from './ContactTableRow';

interface ContactsTableProps {
  contacts: Contact[];
  onOpenContact: (id: string) => void;
  onUpdateStage: (id: string, stage: ContactStage) => void;
  onDeleteContact: (contact: Contact) => void;
  onDeleteMultiple: (ids: string[]) => void;
}

export const ContactsTable: React.FC<ContactsTableProps> = ({
  contacts,
  onOpenContact,
  onUpdateStage,
  onDeleteContact,
  onDeleteMultiple,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const isAllSelected = contacts.length > 0 && selectedIds.length === contacts.length;
  const isIndeterminate =
    selectedIds.length > 0 && selectedIds.length < contacts.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(contacts.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    onDeleteMultiple(selectedIds);
    setSelectedIds([]);
  };

  return (
    <div className="w-full bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container-highest/60 overflow-hidden flex flex-col">
      {/* Multi-select Batch Delete Action Bar */}
      {selectedIds.length > 0 && (
        <div className="bg-primary-fixed/40 border-b border-primary-container/30 px-space-md py-2 flex items-center justify-between select-none animate-in fade-in">
          <div className="flex items-center gap-space-sm">
            <span className="font-body-compact text-body-compact text-primary font-semibold">
              {selectedIds.length} {selectedIds.length === 1 ? 'contact' : 'contacts'} selected
            </span>
            <button
              type="button"
              onClick={() => setSelectedIds([])}
              className="font-caption text-caption text-outline hover:text-on-surface underline"
            >
              Deselect all
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDeleteSelected}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-error hover:bg-red-700 text-white font-body-compact text-xs font-semibold shadow-sm transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[1rem]">delete</span>
              <span>
                Delete {selectedIds.length} {selectedIds.length === 1 ? 'contact' : 'contacts'}
              </span>
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto w-full table-scrollbar">
        <table className="w-full text-left border-collapse" role="table">
          <thead>
            <tr className="bg-surface-container-low h-10 border-b border-surface-container-highest select-none">
              <th className="w-10 px-3 py-2.5 text-center" scope="col">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded w-4 h-4 text-primary-container focus:ring-primary-container accent-primary-container cursor-pointer transition"
                  aria-label="Select all contacts"
                />
              </th>
              <th
                className="px-3 py-2.5 font-caption text-caption text-on-surface-variant font-semibold uppercase tracking-wider"
                scope="col"
              >
                Contact
              </th>
              <th
                className="px-2.5 py-2.5 font-caption text-caption text-on-surface-variant font-semibold uppercase tracking-wider"
                scope="col"
              >
                Company
              </th>
              <th
                className="px-2.5 py-2.5 font-caption text-caption text-on-surface-variant font-semibold uppercase tracking-wider"
                scope="col"
              >
                Role
              </th>
              <th
                className="px-2.5 py-2.5 font-caption text-caption text-on-surface-variant font-semibold uppercase tracking-wider"
                scope="col"
              >
                Owner
              </th>
              <th
                className="px-2.5 py-2.5 font-caption text-caption text-on-surface-variant font-semibold uppercase tracking-wider"
                scope="col"
              >
                Labels
              </th>
              <th
                className="px-2.5 py-2.5 font-caption text-caption text-on-surface-variant font-semibold uppercase tracking-wider"
                scope="col"
              >
                Stage
              </th>
              <th
                className="w-28 px-3 py-2.5 text-right font-caption text-caption text-on-surface-variant font-semibold uppercase tracking-wider whitespace-nowrap sticky right-0 bg-surface-container-low shadow-[-2px_0_4px_rgba(0,0,0,0.04)]"
                scope="col"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="font-body-default text-body-default text-on-surface divide-y divide-surface-container-highest/40">
            {contacts.map((contact) => (
              <ContactTableRow
                key={contact.id}
                contact={contact}
                isSelected={selectedIds.includes(contact.id)}
                onSelectRow={handleSelectRow}
                onOpenDetails={onOpenContact}
                onUpdateStage={onUpdateStage}
                onDeleteContact={onDeleteContact}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
