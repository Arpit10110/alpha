import React from 'react';
import { Contact, ContactStage } from '../model/contact.types';
import { CONTACT_STAGES } from '../model/contact.constants';
import { BoardColumn } from './BoardColumn';

interface ContactsBoardProps {
  contacts: Contact[];
  onOpenContact: (id: string) => void;
  onMoveContact: (id: string, newStage: ContactStage) => void;
  onDeleteContact?: (contact: Contact) => void;
  onAddContactToStage?: (stage: ContactStage) => void;
}

export const ContactsBoard: React.FC<ContactsBoardProps> = ({
  contacts,
  onOpenContact,
  onMoveContact,
  onDeleteContact,
  onAddContactToStage,
}) => {
  return (
    <div className="w-full overflow-x-auto pb-4 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md min-w-[1080px] lg:min-w-0">
        {CONTACT_STAGES.map((stage) => {
          const columnContacts = contacts.filter((c) => c.stage === stage);
          return (
            <BoardColumn
              key={stage}
              stage={stage}
              contacts={columnContacts}
              onOpenContact={onOpenContact}
              onMoveContact={onMoveContact}
              onDeleteContact={onDeleteContact}
              onAddContactToStage={onAddContactToStage}
            />
          );
        })}
      </div>
    </div>
  );
};
