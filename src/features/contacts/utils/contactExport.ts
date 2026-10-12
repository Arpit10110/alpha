import { Contact } from '../model/contact.types';

function escapeCSV(val: string): string {
  if (val === null || val === undefined) return '""';
  const str = String(val);
  // If contains quote, comma, or newline, escape quotes with double quotes and wrap in quotes
  if (str.includes('"') || str.includes(',') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return `"${str}"`;
}

export function exportContactsToCSV(contacts: Contact[], filenamePrefix = 'alpha-contacts'): void {
  const headers = [
    'Name',
    'Email',
    'Company',
    'Role',
    'Owner',
    'Labels',
    'Stage',
    'Notes',
  ];

  const rows = contacts.map((c) => [
    escapeCSV(c.name),
    escapeCSV(c.email),
    escapeCSV(c.company),
    escapeCSV(c.role),
    escapeCSV(c.owner),
    escapeCSV(c.labels.join('; ')),
    escapeCSV(c.stage),
    escapeCSV(c.notes),
  ]);

  const csvContent =
    '\uFEFF' + // UTF-8 BOM for Microsoft Excel compatibility
    [headers.map(escapeCSV).join(','), ...rows.map((row) => row.join(','))].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  const dateStr = new Date().toISOString().split('T')[0];
  link.setAttribute('href', url);
  link.setAttribute('download', `${filenamePrefix}-${dateStr}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
