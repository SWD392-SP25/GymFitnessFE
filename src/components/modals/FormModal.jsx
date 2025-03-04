import React from 'react';
import Button from '../ui/Button';

const FormModal = ({
  isOpen,
  onClose,
  onSubmit,
  title = 'Form',
  submitText = 'Submit',
  cancelText = 'Cancel',
  children
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Form Content */}
          <div className="px-6 py-4">
            {children}
          </div>
          
          {/* Form Footer */}
          <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
            <Button 
              type="button"
              onClick={onClose}
              variant="outline"
            >
              {cancelText}
            </Button>
            <Button 
              type="submit"
              variant="primary"
            >
              {submitText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;