import { ContactStage } from './contact.types';

export const CONTACT_STAGES: readonly ContactStage[] = [
  'Lead',
  'Prospect',
  'Qualified',
  'Customer',
] as const;

export const STAGE_CONFIG: Record<
  ContactStage,
  {
    label: string;
    description: string;
    badgeBg: string;
    badgeText: string;
    dotBg: string;
    activeBg: string;
    activeText: string;
    pillBg: string;
    pillText: string;
    border: string;
    topBorder: string;
    accentColor: string;
  }
> = {
  Lead: {
    label: 'Lead',
    description: 'Initial outreach received',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-700',
    dotBg: 'bg-blue-600',
    activeBg: 'bg-blue-600',
    activeText: 'text-white',
    pillBg: 'bg-blue-100',
    pillText: 'text-blue-800',
    border: 'border-blue-200',
    topBorder: 'border-t-blue-500',
    accentColor: '#2563eb',
  },
  Prospect: {
    label: 'Prospect',
    description: 'Discovery scheduled',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-800',
    dotBg: 'bg-amber-500',
    activeBg: 'bg-amber-600',
    activeText: 'text-white',
    pillBg: 'bg-amber-100',
    pillText: 'text-amber-900',
    border: 'border-amber-200',
    topBorder: 'border-t-amber-500',
    accentColor: '#f59e0b',
  },
  Qualified: {
    label: 'Qualified',
    description: 'Budget & technical match confirmed',
    badgeBg: 'bg-purple-50',
    badgeText: 'text-purple-700',
    dotBg: 'bg-purple-600',
    activeBg: 'bg-purple-600',
    activeText: 'text-white',
    pillBg: 'bg-purple-100',
    pillText: 'text-purple-800',
    border: 'border-purple-200',
    topBorder: 'border-t-purple-500',
    accentColor: '#9333ea',
  },
  Customer: {
    label: 'Customer',
    description: 'Active contract won',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-700',
    dotBg: 'bg-emerald-600',
    activeBg: 'bg-emerald-600',
    activeText: 'text-white',
    pillBg: 'bg-emerald-100',
    pillText: 'text-emerald-800',
    border: 'border-emerald-200',
    topBorder: 'border-t-emerald-500',
    accentColor: '#059669',
  },
};

export const AVAILABLE_OWNERS = [
  { id: 'Sarah Chen', name: 'Sarah Chen', role: 'Product Lead', initials: 'SC', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtr8nHnYw1qatYYuZi1Vp_z9adP7cAI89mW2tAFgpiQOfwQpl-rxyjWz5apQo5-3TNUofXMoQMxfvUIiScsLxdqFtVfWn6NCjvActpnOqUqLIPcPkMS5QS7Ye7Nh2M_ORKnaFsQi6LCBOI_DAC0woGUoxiW9hOoOqZsTe81yb9n_t036iU6uuGcOKwyfuaW8fl9IlJy2kNs45RSncKQongKrg-HvxPPNQd5I_BkJkZWahHX9l-tw' },
  { id: 'Alex Miller', name: 'Alex Miller', role: 'Tech Lead', initials: 'AM', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3ACQJNlZH7OH3B_Nd0U6dDwxPj3YDMx0VNT4PxyJLfGRkEjyNiU2ZJkSkZYZCAQ5cVdieAE9KQsgvLOwBeuIKRIg3RQ09moTpmWwkqTWphA5cOWCVq3i13B5LrVFzB2OAyFo1qsUgujj585cCijJdCUk-DtXuqNmSh1qmUtR-Ue6h_Y3eipJfyDrpIDiQv0HhKD0qA-pFL7KAHon2vrObQ3aSw-dWcEdx0zFBsbaJ1Nm3eoq_Fg' },
  { id: 'David Kim', name: 'David Kim', role: 'Fintech Lead', initials: 'DK', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCCBPwG9jggQF53o-FbnBPMWMeVg3xeeCtRM_sznd5lqyHbXIXgpvxCxg3P6uM7C_0tOOfhokid04XWNEIJVAI3D0IFN80dBQ1Mndg5bfqkI1W-gxXBOW1Oi_7I6Af1QD4_8XihFte6JiwcYUFXg8rc_MXyX3-UY2wz2cTYh115IgpTA4614NAMhgO03Uh2DE90NlHNfW6FO2Yes6LfMcsOMvhOkuMmnQzN2cGs-gWsxtMKcBp7Q' },
  { id: 'Marcus Vance', name: 'Marcus Vance', role: 'Enterprise AE', initials: 'MV', avatar: '' },
  { id: 'Alex Rivera', name: 'Alex Rivera', role: 'Customer Success', initials: 'AR', avatar: '' },
] as const;

export const AVAILABLE_LABELS = [
  'Inbound',
  'Enterprise',
  'Follow-up',
  'High priority',
  'Partner',
  'Event',
] as const;

export const LABEL_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  'Inbound': {
    bg: 'bg-primary-fixed/60',
    text: 'text-primary',
    dot: 'bg-primary',
  },
  'Enterprise': {
    bg: 'bg-secondary-fixed',
    text: 'text-on-secondary-fixed-variant',
    dot: 'bg-secondary',
  },
  'Follow-up': {
    bg: 'bg-tertiary-fixed',
    text: 'text-on-tertiary-fixed-variant',
    dot: 'bg-tertiary-container',
  },
  'High priority': {
    bg: 'bg-error-container/60',
    text: 'text-on-error-container',
    dot: 'bg-error',
  },
  'Partner': {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    dot: 'bg-purple-600',
  },
  'Event': {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    dot: 'bg-amber-600',
  },
};

export const STORAGE_KEY = 'alpha-contact-workspace:contacts:v1';
