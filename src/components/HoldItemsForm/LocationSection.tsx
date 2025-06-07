import React from 'react';
import { FormField } from '../ui/FormField';
import { HoldItemFormData } from '../../types';

interface LocationSectionProps {
  formData: HoldItemFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  formData,
  onChange,
  errors
}) => {
  return (
    <FormField 
      label="Storage Location" 
      required 
      error={errors.warehouse}
    >
      <div className="grid grid-cols-3 gap-2">
        <div>
          <input 
            type="text"
            name="warehouse"
            value={formData.warehouse}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Warehouse"
          />
        </div>
        <div>
          <input 
            type="text"
            name="section"
            value={formData.section}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Section"
          />
        </div>
        <div>
          <input 
            type="text"
            name="shelf"
            value={formData.shelf}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Shelf"
          />
        </div>
      </div>
    </FormField>
  );
};