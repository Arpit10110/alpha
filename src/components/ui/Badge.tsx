import React from 'react';
import { ContactStage } from '../../features/contacts/model/contact.types';
import { STAGE_CONFIG, LABEL_COLORS } from '../../features/contacts/model/contact.constants';

interface StageBadgeProps {
  stage: ContactStage;
  size?: 'sm' | 'md';
  onClick?: () => void;
  className?: string;
}

export const StageBadge: React.FC<StageBadgeProps> = ({
  stage,
  size = 'md',
  onClick,
  className = '',
}) => {
  const cfg = STAGE_CONFIG[stage] || STAGE_CONFIG['Lead'];

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-md font-mono-metric text-xs font-semibold transition-all border shadow-2xs ${
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1'
      } ${cfg.badgeBg} ${cfg.badgeText} ${cfg.border} ${
        onClick ? 'cursor-pointer hover:shadow-xs hover:scale-[1.02] active:scale-[0.98]' : ''
      } ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotBg}`} />
      <span>{cfg.label}</span>
    </span>
  );
};

interface LabelBadgeProps {
  label: string;
  onRemove?: () => void;
  className?: string;
}

export const LabelBadge: React.FC<LabelBadgeProps> = ({
  label,
  onRemove,
  className = '',
}) => {
  const color = LABEL_COLORS[label] || {
    bg: 'bg-surface-container-high',
    text: 'text-on-surface-variant',
    dot: 'bg-outline',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-caption text-xs font-medium leading-tight select-none shadow-2xs ${color.bg} ${color.text} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${color.dot} flex-shrink-0`} />
      <span>{label}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 hover:bg-black/10 rounded-full w-3.5 h-3.5 flex items-center justify-center transition-colors"
          aria-label={`Remove ${label}`}
        >
          <span className="material-symbols-outlined text-[0.75rem]">close</span>
        </button>
      )}
    </span>
  );
};
