import React, { useState } from 'react';
import { X } from 'lucide-react';

interface IdentifiersSectionProps {
  identifiers: string[];
  onAdd: (identifier: string) => void;
  onRemove: (index: number) => void;
}

export const IdentifiersSection: React.FC<IdentifiersSectionProps> = ({
  identifiers,
  onAdd,
  onRemove
}) => {
  const [newIdentifier, setNewIdentifier] = useState('');

  const handleAdd = () => {
    if (newIdentifier.trim()) {
      onAdd(newIdentifier.trim());
      setNewIdentifier('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">Item Identifiers</label>
      <div className="flex mb-2">
        <input 
          type="text"
          value={newIdentifier}
          onChange={(e) => setNewIdentifier(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          placeholder="Serial/Batch/Lot Number"
        />
        <button 
          onClick={handleAdd}
          className="bg-blue-700 text-white px-4 rounded-r-lg hover:bg-blue-800 focus:outline-none transition-colors duration-200"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {identifiers.map((identifier, index) => (
          <div 
            key={index} 
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center transition-all duration-200 hover:bg-blue-200"
          >
            {identifier}
            <button 
              onClick={() => onRemove(index)}
              className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};