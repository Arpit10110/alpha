export type ContactStage = 'Lead' | 'Prospect' | 'Qualified' | 'Customer';

export interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  owner: string;
  labels: string[];
  stage: ContactStage;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type ViewMode = 'table' | 'board';

export interface ContactFiltersState {
  search: string;
  stages: ContactStage[];
  owners: string[];
  labels: string[];
}

export interface ContactDraft {
  name: string;
  email: string;
  company: string;
  role: string;
  owner: string;
  labels: string[];
  stage: ContactStage;
  notes: string;
}
