# Alpha Workspace

A modern, Notion-inspired contact management workspace built with **React, TypeScript, Vite, and Tailwind CSS**.

Alpha Workspace provides two synchronized ways to manage business contacts: a structured **Table View** and a stage-based **Kanban Board**. It features contact creation and editing, drag-and-drop stage management, debounced search, advanced filters, bulk actions, CSV export, and persistent browser storage.

**[Live Preview](YOUR_LIVE_PREVIEW_URL) · [GitHub Repository](YOUR_GITHUB_REPOSITORY_URL)**

---

## Overview

Managing business contacts should be simple, organized, and intuitive. Alpha Workspace brings essential contact management workflows into a clean, responsive interface.

The application uses a single shared data source, ensuring that changes made in the Table View are immediately reflected in the Board View and vice versa. Contact information is stored locally in the browser, making the application fully functional without a backend or external API.

### Highlights

- Two synchronized views: Table and Kanban Board.
- Complete contact management with create, view, edit, and delete operations.
- Drag-and-drop stage management.
- Debounced search and multi-attribute filtering.
- Bulk contact selection and deletion.
- CSV export compatible with Microsoft Excel and Google Sheets.
- Persistent localStorage storage.
- Responsive layout, keyboard interactions, and contextual notifications.

---

## Features

### 1. Table View

A spreadsheet-inspired interface designed for scanning and managing contact information efficiently.

- Displays contact names, email addresses, companies, roles, owners, labels, and lifecycle stages.
- Uses avatar initials and compact badges to improve visual hierarchy.
- Provides quick actions for viewing, changing stages, and deleting contacts.
- Supports selecting multiple contacts for bulk deletion.
- Includes a sticky action column and horizontal scrolling for wider datasets.
- Handles missing optional information gracefully.

### 2. Board View

A Kanban-style interface that organizes contacts by their current relationship stage.

The board contains four stages:

| Stage | Purpose |
|---|---|
| Lead | Initial contact or potential business opportunity |
| Prospect | A potential customer under consideration |
| Qualified | A contact that meets the relevant qualification criteria |
| Customer | An established customer |

Features include:

- Four persistent stage columns.
- Native HTML5 drag-and-drop for moving contacts between stages.
- Stage-specific visual indicators and contact counts.
- Quick stage changes and contact deletion.
- Keyboard-accessible alternatives to drag-and-drop.
- Empty-column states when a stage contains no contacts.

Both views operate on the same contact collection, so moving a card updates the corresponding table row without creating duplicate records.

### 3. Contact Details Drawer

Clicking a contact opens a responsive side drawer with its complete information.

**View mode**
- Contact identity, company, role, and email.
- Relationship owner, labels, and lifecycle stage.
- Notes and available activity information.
- One-click email copying with confirmation.
- Quick stage changes.

**Edit mode**
- Editable contact fields.
- Separate draft state for unsaved changes.
- Client-side validation for required fields and email formats.
- Explicit Save and Cancel actions.
- Protection against accidentally discarding unsaved changes.

The drawer can be opened from either view. Closing it preserves the current view and avoids unnecessary resets of the user's search and filter context.

### 4. Create and Delete Contacts

**Create contacts**
- Accessible modal form with automatic focus on the name field.
- Fields for name, email, company, role, owner, labels, stage, and notes.
- Defaults new contacts to the Lead stage.
- Validates required fields before submission.
- Supports keyboard shortcuts, including Escape to dismiss and Ctrl/Command + Enter to submit.

**Delete contacts**
- Confirmation dialog for individual deletions.
- Confirmation before bulk deletion.
- Clear destructive-action styling.
- Contextual success notifications.
- Consistent removal from both views and persistent storage.

### 5. Search and Filters

Find the right contact without manually scanning the entire dataset.

**Debounced search**
- Uses a 300 ms debounce.
- Matches contact names, emails, companies, roles, and notes.
- Supports case-insensitive matching.
- Reduces unnecessary filtering work while typing.

**Multi-attribute filters**
- Filter by lifecycle stage.
- Filter by relationship owner.
- Filter by labels.
- Combine filter criteria to narrow results.
- Remove individual active filters or clear all filters at once.

Search and filters operate on derived data rather than modifying the underlying contact collection. Both views therefore remain consistent when the visible results change.

### 6. Bulk Actions and Notifications

- Select multiple contacts directly from the table.
- Display a contextual action bar when records are selected.
- Delete selected contacts through a confirmation flow.
- Show notifications for successful saves, stage changes, creation, deletion, and export.
- Provide visual feedback for important actions and validation errors.

### 7. CSV Export

Export contacts for use in spreadsheets and other tools.

- Generates a downloadable CSV file.
- Includes the contact fields defined by the application.
- Uses UTF-8 BOM encoding for improved compatibility with Microsoft Excel.
- Escapes CSV values containing commas, quotation marks, and line breaks.
- Supports exporting the relevant contact results according to the application's export behavior.

CSV was chosen because it is lightweight, portable, and compatible with common spreadsheet applications.

### 8. Persistent Browser Storage

The application persists contact data using the following localStorage key:

`alpha-contact-workspace:contacts:v1`

On initialization:

1. The application checks whether saved contact data exists.
2. If the key is missing, it initializes the workspace with 10 fictional contacts.
3. If valid saved data exists, it loads the saved contacts instead of reseeding.
4. Committed changes are persisted so contacts remain available after a page refresh.

The storage implementation includes guarded access to handle malformed stored data and browser storage errors.

**Note:** This is client-side persistence, not a shared database. Contacts are stored in the current browser's storage and are not synchronized across devices or users.

### 9. Responsive Interface

- Responsive application shell and navigation.
- Mobile-friendly sidebar with a backdrop and close control.
- Responsive contact details drawer.
- Touch-friendly interactive controls.
- Horizontal scrolling for dense tables and board columns.
- Consistent focus, hover, and selected states.

The interface is designed to preserve usability without sacrificing the information density needed for contact management.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | Component-based user interface |
| TypeScript | Type safety and maintainable application logic |
| Vite 6 | Development server and production build tooling |
| Tailwind CSS 3 | Utility-first styling and responsive layouts |
| React Toastify | Contextual notifications |
| Google Material Symbols | Interface icons |
| Browser localStorage | Client-side contact persistence |
| HTML5 Drag and Drop API | Board stage movement |

---

## Architecture

The codebase follows a feature-oriented structure that separates application layout, reusable UI components, contact workflows, state management, data models, and utilities.

```text
src/
├── app/
│   └── App.tsx
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   ├── Sidebar.tsx
│   │   └── WorkspaceHeader.tsx
│   └── ui/
│       ├── Badge.tsx
│       ├── Drawer.tsx
│       └── Modal.tsx
├── features/
│   └── contacts/
│       ├── components/
│       │   ├── ActiveFilterChips.tsx
│       │   ├── BoardColumn.tsx
│       │   ├── ContactCard.tsx
│       │   ├── ContactDetailsDrawer.tsx
│       │   ├── ContactDetailsView.tsx
│       │   ├── ContactDirectoryStats.tsx
│       │   ├── ContactEmptyState.tsx
│       │   ├── ContactFilters.tsx
│       │   ├── ContactForm.tsx
│       │   ├── ContactTableRow.tsx
│       │   ├── ContactsBoard.tsx
│       │   ├── ContactsPage.tsx
│       │   ├── ContactsTable.tsx
│       │   ├── ContactsToolbar.tsx
│       │   ├── CreateContactModal.tsx
│       │   ├── DeleteContactDialog.tsx
│       │   └── ViewSwitcher.tsx
│       ├── data/
│       │   └── seedContacts.ts
│       ├── hooks/
│       │   ├── useContactFilters.ts
│       │   ├── useContacts.ts
│       │   └── useDebouncedValue.ts
│       ├── model/
│       │   ├── contact.constants.ts
│       │   ├── contact.types.ts
│       │   └── contact.validation.ts
│       └── utils/
│           ├── contactExport.ts
│           ├── contactIds.ts
│           ├── contactSearch.ts
│           └── contactStorage.ts
├── styles/
│   └── index.css
└── main.tsx
```

### Key architectural decisions

**Single source of truth**

A shared `Contact[]` collection powers both the Table and Board views. Each contact has a stable ID, and updates are applied to the canonical record rather than separate view-specific copies.

**Derived search and filtering**

Search results, filter results, and board groupings are derived from the shared collection. This prevents stale records and duplicated data when users switch views or update contact stages.

**Isolated draft editing**

The details drawer maintains a draft while the user edits a contact. Changes are committed only after validation and an explicit Save action. Cancel discards the draft without changing the saved record.

**Separated responsibilities**

Hooks handle state and reusable behavior, components handle presentation and interactions, model files define types and validation, and utilities isolate persistence, search, ID generation, and export logic.

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd YOUR_PROJECT_DIRECTORY
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite, typically:

`http://localhost:5173`

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server with hot module replacement |
| `npm run build` | Runs the configured TypeScript checks and creates a production build |
| `npm run preview` | Serves the production build locally |

---

## Design Decisions and Trade-offs

### Why two views?

The Table View is optimized for scanning detailed contact fields, while the Board View makes lifecycle stages easier to understand at a glance. Both serve different workflows without introducing separate data models.

### Why localStorage?

The assignment requires a standalone frontend with mocked data and no backend. Browser storage provides persistence across refreshes while keeping the implementation simple and self-contained.

Its limitation is that data belongs to the current browser. A production version would require server-side persistence, authentication, access control, and a strategy for synchronizing concurrent updates.

### Why separate draft and committed state?

Separating draft edits from saved records gives users predictable Save and Cancel behavior and prevents incomplete changes from leaking into other views.

### Why CSV export?

CSV provides a simple, portable export format that works with Excel and Google Sheets without requiring a spreadsheet-generation service.

### What could be improved next?

With additional time, the next improvements could include:

- Automated tests for CRUD operations, filtering, persistence, and view synchronization.
- More comprehensive keyboard and screen-reader testing.
- Native XLSX export with formatted columns.
- Backend persistence and multi-user synchronization.
- Server-side validation and conflict handling.
- Further refinements to drag-and-drop accessibility.

---

## Notes

- All initial contacts are fictional demo data.
- No backend, authentication, or external API is required.
- Data is stored locally in the browser.
- Export produces a CSV file rather than a native XLSX workbook.

This project was built as a standalone frontend design and engineering exercise, with an emphasis on visual hierarchy, reusable components, consistent interactions, and reliable shared state.

