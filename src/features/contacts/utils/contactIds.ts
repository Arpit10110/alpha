export function generateContactId(): string {
  const randomPart = Math.random().toString(36).substring(2, 8);
  const timePart = Date.now().toString(36).slice(-4);
  return `c_${timePart}${randomPart}`;
}

export function getInitials(name: string): string {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
