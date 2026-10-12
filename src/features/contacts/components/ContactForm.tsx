import React, { useState } from 'react';
import { ContactDraft } from '../model/contact.types';
import {
  AVAILABLE_LABELS,
  AVAILABLE_OWNERS,
  CONTACT_STAGES,
  STAGE_CONFIG,
} from '../model/contact.constants';
import { LabelBadge } from '../../../components/ui/Badge';

interface ContactFormProps {
  draft: ContactDraft;
  onChange: (updates: Partial<ContactDraft>) => void;
  errors?: Record<string, string>;
  isModal?: boolean;
  autoFocus?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  draft,
  onChange,
  errors = {},
  isModal = false,
  autoFocus = false,
}) => {
  const [tagInput, setTagInput] = useState('');
  const nameInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (autoFocus) {
      const timer = setTimeout(() => {
        nameInputRef.current?.focus();
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  const handleAddTag = (labelToAdd: string) => {
    const trimmed = labelToAdd.trim();
    if (!trimmed) return;
    if (!draft.labels.includes(trimmed)) {
      onChange({ labels: [...draft.labels, trimmed] });
    }
    setTagInput('');
  };

  const handleRemoveTag = (labelToRemove: string) => {
    onChange({ labels: draft.labels.filter((l) => l !== labelToRemove) });
  };

  const ownerObj = AVAILABLE_OWNERS.find((o) => o.name === draft.owner);

  return (
    <div className={`space-y-space-md ${isModal ? '' : 'px-space-lg py-space-md'}`}>
      {/* Name Field */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="contact-form-name"
          className="font-caption text-caption uppercase tracking-wider text-on-surface-variant font-medium flex items-center justify-between"
        >
          <span>
            Full Name <span className="text-error font-semibold">*</span>
          </span>
          <span className="font-mono-metric text-mono-metric text-outline">Primary ID</span>
        </label>
        <div className="relative">
          <input
            ref={nameInputRef}
            id="contact-form-name"
            type="text"
            required
            autoFocus={autoFocus}
            value={draft.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="e.g. Jane Doe"
            className={`w-full h-10 px-space-sm bg-surface-container-low text-on-surface rounded-lg font-body-default text-body-default transition-all focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary-container ${
              errors.name ? 'border border-error ring-1 ring-error' : 'border border-outline-variant/60'
            }`}
          />
        </div>
        {errors.name && (
          <span className="font-caption text-caption text-error">{errors.name}</span>
        )}
      </div>

      {/* Email Field */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="contact-form-email"
          className="font-caption text-caption uppercase tracking-wider text-on-surface-variant font-medium flex items-center justify-between"
        >
          <span>Work Email</span>
          {draft.email && !errors.email && (
            <span className="font-caption text-caption text-emerald-600 font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[0.875rem]">verified</span> Validated
            </span>
          )}
        </label>
        <div className="relative">
          <input
            id="contact-form-email"
            type="email"
            value={draft.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="jane@acme.com"
            className={`w-full h-10 px-space-sm bg-surface-container-low text-on-surface rounded-lg font-body-default text-body-default transition-all focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary-container ${
              errors.email ? 'border border-error ring-1 ring-error' : 'border border-outline-variant/60'
            }`}
          />
        </div>
        {errors.email && (
          <span className="font-caption text-caption text-error">{errors.email}</span>
        )}
      </div>

      {/* Two columns: Company & Role */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="contact-form-company"
            className="font-caption text-caption uppercase tracking-wider text-on-surface-variant font-medium"
          >
            Company
          </label>
          <input
            id="contact-form-company"
            type="text"
            value={draft.company}
            onChange={(e) => onChange({ company: e.target.value })}
            placeholder="e.g. Acme Labs"
            className="w-full h-10 px-space-sm bg-surface-container-low text-on-surface rounded-lg font-body-default text-body-default border border-outline-variant/60 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary-container transition-all"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="contact-form-role"
            className="font-caption text-caption uppercase tracking-wider text-on-surface-variant font-medium"
          >
            Role / Title
          </label>
          <input
            id="contact-form-role"
            type="text"
            value={draft.role}
            onChange={(e) => onChange({ role: e.target.value })}
            placeholder="e.g. Product Lead"
            className="w-full h-10 px-space-sm bg-surface-container-low text-on-surface rounded-lg font-body-default text-body-default border border-outline-variant/60 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary-container transition-all"
          />
        </div>
      </div>

      {/* Owner */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="contact-form-owner"
          className="font-caption text-caption uppercase tracking-wider text-on-surface-variant font-medium"
        >
          Relationship Owner
        </label>
        <div className="relative flex items-center">
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10">
            {ownerObj?.avatar ? (
              <img
                src={ownerObj.avatar}
                alt={draft.owner}
                className="w-5 h-5 rounded-full object-cover"
              />
            ) : (
              <span className="w-5 h-5 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-mono-keycap text-[9px] font-bold">
                {ownerObj ? ownerObj.initials : 'SC'}
              </span>
            )}
          </div>
          <select
            id="contact-form-owner"
            value={draft.owner}
            onChange={(e) => onChange({ owner: e.target.value })}
            className="w-full h-10 pl-9 pr-8 bg-surface-container-low text-on-surface rounded-lg font-body-default text-body-default appearance-none border border-outline-variant/60 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary-container transition-all cursor-pointer"
          >
            {AVAILABLE_OWNERS.map((owner) => (
              <option key={owner.id} value={owner.name}>
                {owner.name} ({owner.role})
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-space-xs top-1/2 -translate-y-1/2 text-outline text-[1.125rem] pointer-events-none">
            expand_more
          </span>
        </div>
      </div>

      {/* Prominent Lifecycle Stage Selector */}
      <div className="flex flex-col gap-1">
        <label className="font-caption text-caption uppercase tracking-wider text-on-surface-variant font-medium">
          Lifecycle Stage
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-surface-container-low p-1.5 rounded-xl border border-outline-variant/60 select-none">
          {CONTACT_STAGES.map((st) => {
            const isSelected = draft.stage === st;
            const cfg = STAGE_CONFIG[st];
            return (
              <button
                key={st}
                type="button"
                onClick={() => onChange({ stage: st })}
                className={`py-2 px-2.5 rounded-lg font-caption text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  isSelected
                    ? `${cfg.activeBg} ${cfg.activeText} shadow-md ring-2 ring-offset-1 ring-offset-white ${cfg.border} scale-[1.02]`
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : cfg.dotBg}`} />
                <span>{st}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Labels & Tags Editor */}
      <div className="flex flex-col gap-1">
        <label className="font-caption text-caption uppercase tracking-wider text-on-surface-variant font-medium flex items-center justify-between">
          <span>Labels &amp; Tags</span>
          <span className="font-mono-metric text-mono-metric text-outline">
            {draft.labels.length} active
          </span>
        </label>
        <div className="p-2 min-h-11 bg-surface-container-low rounded-lg border border-outline-variant/60 flex flex-wrap items-center gap-1.5 focus-within:bg-surface-container-lowest focus-within:ring-2 focus-within:ring-primary-container transition-all">
          {draft.labels.map((l) => (
            <LabelBadge key={l} label={l} onRemove={() => handleRemoveTag(l)} />
          ))}

          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag(tagInput);
              }
            }}
            placeholder="+ Add tag..."
            className="flex-1 min-w-[90px] bg-transparent font-caption text-caption text-on-surface placeholder:text-outline focus:outline-none px-1 py-0.5"
          />
        </div>

        {/* Suggestion presets */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] text-outline font-caption">Suggested:</span>
          {AVAILABLE_LABELS.filter((l) => !draft.labels.includes(l)).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => handleAddTag(l)}
              className="text-[11px] px-2 py-0.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors"
            >
              + {l}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Field */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <label
            htmlFor="contact-form-notes"
            className="font-caption text-caption uppercase tracking-wider text-on-surface-variant font-medium"
          >
            Internal Notes &amp; Context
          </label>
          <span className="font-mono-metric text-mono-metric text-outline">
            {draft.notes.length} characters
          </span>
        </div>
        <textarea
          id="contact-form-notes"
          rows={isModal ? 3 : 5}
          value={draft.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
          placeholder="Add relevant meeting observations, deal blockers, or context..."
          className="w-full p-space-sm bg-surface-container-low text-on-surface rounded-lg font-body-compact text-body-compact leading-relaxed border border-outline-variant/60 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary-container transition-all resize-none"
        />
      </div>
    </div>
  );
};
