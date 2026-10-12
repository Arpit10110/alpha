import React, { useEffect } from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  width = 'w-full sm:w-[480px]',
}) => {
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
    <>
      {/* Full screen backdrop overlay that dims and blurs entire page (including sidebar & top nav) */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-md z-[90] transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Right-side Slide-over Drawer on top of blurred background */}
      <aside
        className={`fixed top-0 right-0 bottom-0 ${width} max-w-full bg-surface-container-lowest z-[100] shadow-2xl flex flex-col justify-between overflow-hidden border-l border-surface-container-highest animate-in slide-in-from-right duration-200`}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </aside>
    </>
  );
};
