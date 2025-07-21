import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children, hideHeader = false }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Semi-transparent overlay */}
      <div 
        className="fixed inset-0 backdrop-blur-sm bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Modal container - Increased size */}
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto pointer-events-auto">
          {!hideHeader && (
            <div className="flex justify-end p-4">
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          <div className="p-8">  {/* Increased padding */}
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;