import { useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppShell } from '../components/layout/AppShell';
import { ContactsPage } from '../features/contacts/components/ContactsPage';
import { useContacts } from '../features/contacts/hooks/useContacts';
import { useContactFilters } from '../features/contacts/hooks/useContactFilters';

export const App: React.FC = () => {
  const contactsState = useContacts();
  const filterControls = useContactFilters();

  const { contacts } = contactsState;
  const { selectedLabels, setSingleLabel, setSelectedLabels } = filterControls;

  const activeSidebarLabel = selectedLabels.length === 1 ? selectedLabels[0] : undefined;

  const labelCounts: Record<string, number> = useMemo(
    () => ({
      Inbound: contacts.filter((c) => c.labels.includes('Inbound')).length,
      Enterprise: contacts.filter((c) => c.labels.includes('Enterprise')).length,
      'Follow-up': contacts.filter((c) => c.labels.includes('Follow-up')).length,
      'High priority': contacts.filter((c) => c.labels.includes('High priority')).length,
    }),
    [contacts]
  );

  const handleFilterByLabel = (label: string) => {
    setSingleLabel(label);
  };

  const handleSelectContacts = () => {
    setSelectedLabels([]);
  };

  return (
    <>
      <AppShell
        activeLabel={activeSidebarLabel}
        onFilterByLabel={handleFilterByLabel}
        onSelectContacts={handleSelectContacts}
        labelCounts={labelCounts}
      >
        <ContactsPage
          contactsState={contactsState}
          filterControls={filterControls}
        />
      </AppShell>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
