import { ContactDraft } from './contact.types';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateContactDraft(draft: Partial<ContactDraft>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!draft.name || !draft.name.trim()) {
    errors.name = 'Full name is required';
  }

  if (draft.email && draft.email.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(draft.email.trim())) {
      errors.email = 'Please provide a valid email address';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
