import React from 'react';
import { FormField } from '../ui/FormField';
import { Camera } from 'lucide-react';
import { HoldItemFormData } from '../../types';

interface FormSectionProps {
  formData: HoldItemFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onScan: () => void;
  errors: Record<string, string>;
}

export const FormSection: React.FC<FormSectionProps> = ({
  formData,
  onChange,
  onScan,
  errors
}) => {
  return (
    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h3 className="text-md font-medium text-blue-800 mb-2">Consignment Information</h3>
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
              value={formData.consignmentId}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter or scan ID"
            />
            <button 
              onClick={onScan}
              className="bg-blue-700 text-white px-4 rounded-r-lg hover:bg-blue-800 focus:outline-none transition-colors duration-200"
            >
              <Camera className="h-5 w-5" />
            </button>
          </div>
        </FormField>
        
        <FormField 
          label="Importer"
        >
          <input 
            type="text"
            name="importer"
            value={formData.importer}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Company name"
          />
        </FormField>
        
        <FormField 
          label="Examination Date" 
          required 
          error={errors.examinationDate}
        >
          <input 
            type="date"
            name="examinationDate"
            value={formData.examinationDate}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </FormField>
      </div>
    </div>
  );
};