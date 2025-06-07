import React from 'react';
import { FormField } from '../ui/FormField';
import { Search } from 'lucide-react';

interface ConsignmentSearchProps {
  consignmentId: string;
  importer: string;
  holdDate: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  errors: Record<string, string>;
  isSearching?: boolean;
}

export const ConsignmentSearch: React.FC<ConsignmentSearchProps> = ({
  consignmentId,
  importer,
  holdDate,
  onChange,
  onSearch,
  errors,
  isSearching = false
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch();
    }
  };

  return (
    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h3 className="text-md font-medium text-blue-800 mb-2">Find Held Items</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField 
          label="Consignment ID" 
          required 
          error={errors.consignmentId}
        >
          <div className="flex">
            <input 
              type="text"
              name="consignmentId"
              value={consignmentId}
              onChange={onChange}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter consignment ID"
              disabled={isSearching}
            />
            <button 
              onClick={onSearch}
              disabled={isSearching}
              className="bg-blue-700 text-white px-4 rounded-r-lg hover:bg-blue-800 focus:outline-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                <Search className="h-5 w-5" />
              )}
            </button>
          </div>
        </FormField>
        
        <FormField 
          label="Importer"
        >
          <input 
            type="text"
            name="importer"
            value={importer}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none transition-all duration-200"
            readOnly
          />
        </FormField>
        
        <FormField 
          label="Hold Date"
        >
          <input 
            type="date"
            name="holdDate"
            value={holdDate}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none transition-all duration-200"
            readOnly
          />
        </FormField>
      </div>
    </div>
  );
};