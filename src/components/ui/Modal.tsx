import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'max-w-[620px]',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-space-md transition-opacity"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className={`w-full ${maxWidth} bg-surface-container-lowest rounded-xl shadow-2xl overflow-hidden flex flex-col transform transition-all duration-200 animate-in fade-in zoom-in-95`}
      >
        {(title || description) && (
          <div className="px-space-xl pt-space-xl pb-space-md flex items-start justify-between bg-surface-container-lowest border-b border-surface-container-highest/40">
            <div className="space-y-1">
              {title && (
                <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-semibold">
                  {title}
                </h2>
              )}
              {description && (
                <p className="font-body-compact text-body-compact text-on-surface-variant">
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container-high transition-colors focus:outline-none focus:ring-2 focus:ring-primary-container"
              type="button"
            >
              <span className="material-symbols-outlined text-[1.25rem]">close</span>
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
