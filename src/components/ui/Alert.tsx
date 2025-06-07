import React from 'react';
import { AlertType } from '../../types';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

interface AlertProps {
  type: AlertType;
  message: string;
  onClose: () => void;
}

export const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const alertStyles = {
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
    warning: 'bg-amber-100 border-amber-500 text-amber-700',
    info: 'bg-blue-100 border-blue-500 text-blue-700'
  };

  const iconColor = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-amber-500',
    info: 'text-blue-500'
  };

  return (
    <div className={`mt-4 border-l-4 p-4 rounded transition-opacity duration-500 ${alertStyles[type]}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {type === 'success' ? (
            <CheckCircle className={`h-5 w-5 ${iconColor[type]}`} />
          ) : (
            <AlertCircle className={`h-5 w-5 ${iconColor[type]}`} />
          )}
        </div>
        <div className="ml-3">
          <p className="text-sm">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button 
              onClick={onClose}
              className={`inline-flex rounded-md p-1.5 ${iconColor[type]} hover:bg-${type === 'success' ? 'green' : type === 'error' ? 'red' : type === 'warning' ? 'amber' : 'blue'}-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${type === 'success' ? 'green' : type === 'error' ? 'red' : type === 'warning' ? 'amber' : 'blue'}-500`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};