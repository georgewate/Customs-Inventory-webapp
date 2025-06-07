import React from 'react';
import { FormField } from '../ui/FormField';
import { ReleaseItemFormData } from '../../types';

interface ReleaseDetailsProps {
  formData: ReleaseItemFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  errors: Record<string, string>;
}

export const ReleaseDetails: React.FC<ReleaseDetailsProps> = ({
  formData,
  onChange,
  errors
}) => {
  const releaseReasons = [
    { value: '', label: 'Select reason' },
    { value: 'documentation_resolved', label: 'Documentation Issues Resolved' },
    { value: 'inspection_passed', label: 'Inspection Passed' },
    { value: 'duties_paid', label: 'Duties/Taxes Paid' },
    { value: 'classification_confirmed', label: 'Classification Confirmed' },
    { value: 'court_order', label: 'Court Order' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <>
      <FormField 
        label="Release Date" 
        required 
        error={errors.releaseDate}
      >
        <input 
          type="date"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        />
      </FormField>
      
      <FormField 
        label="Release Reference Number" 
        required 
        error={errors.releaseReference}
      >
        <input 
          type="text"
          name="releaseReference"
          value={formData.releaseReference}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          placeholder="Enter reference number"
        />
      </FormField>
      
      <FormField 
        label="Release Reason" 
        required 
        error={errors.releaseReason}
      >
        <select
          name="releaseReason"
          value={formData.releaseReason}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        >
          {releaseReasons.map((reason) => (
            <option key={reason.value} value={reason.value}>{reason.label}</option>
          ))}
        </select>
      </FormField>
      
      <FormField 
        label="Authorizing Officer" 
        required 
        error={errors.authorizingOfficer}
      >
        <input 
          type="text"
          name="authorizingOfficer"
          value={formData.authorizingOfficer}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          placeholder="Officer name"
        />
      </FormField>
    </>
  );
};