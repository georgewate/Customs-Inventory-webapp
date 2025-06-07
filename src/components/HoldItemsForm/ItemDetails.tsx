import React from 'react';
import { FormField } from '../ui/FormField';
import { HoldItemFormData } from '../../types';

interface ItemDetailsProps {
  formData: HoldItemFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  errors: Record<string, string>;
}

export const ItemDetails: React.FC<ItemDetailsProps> = ({
  formData,
  onChange,
  errors
}) => {
  const holdReasons = [
    { value: '', label: 'Select reason' },
    { value: 'documentation', label: 'Documentation Issues' },
    { value: 'inspection', label: 'Further Inspection Required' },
    { value: 'prohibited', label: 'Prohibited/Restricted Items' },
    { value: 'valuation', label: 'Valuation Concerns' },
    { value: 'classification', label: 'Classification Verification' },
    { value: 'security', label: 'Security Concerns' },
    { value: 'other', label: 'Other' }
  ];

  const holdDurations = [
    { value: '1-3', label: '1-3 days' },
    { value: '4-7', label: '4-7 days' },
    { value: '8-14', label: '8-14 days' },
    { value: '15-30', label: '15-30 days' },
    { value: '30+', label: '30+ days' },
    { value: 'indefinite', label: 'Indefinite' }
  ];

  const quantityUnits = [
    { value: 'units', label: 'Units' },
    { value: 'kg', label: 'Kg' },
    { value: 'boxes', label: 'Boxes' },
    { value: 'pallets', label: 'Pallets' }
  ];

  const currencies = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'GBP', label: 'GBP' },
    { value: 'CAD', label: 'CAD' },
    { value: 'AUD', label: 'AUD' }
  ];

  return (
    <>
      <FormField 
        label="Item Description" 
        required 
        error={errors.itemDescription}
      >
        <input 
          type="text"
          name="itemDescription"
          value={formData.itemDescription}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          placeholder="Enter detailed item description"
        />
      </FormField>
      
      <FormField 
        label="HS Code" 
        required 
        error={errors.hsCode}
      >
        <input 
          type="text"
          name="hsCode"
          value={formData.hsCode}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          placeholder="Harmonized System code"
        />
      </FormField>
      
      <FormField 
        label="Quantity Held" 
        required 
        error={errors.quantityHeld}
      >
        <div className="flex">
          <input 
            type="number"
            name="quantityHeld"
            value={formData.quantityHeld || ''}
            onChange={onChange}
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Enter quantity"
          />
          <select
            name="quantityUnit"
            value={formData.quantityUnit}
            onChange={onChange}
            className="border border-gray-300 rounded-r-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          >
            {quantityUnits.map((unit) => (
              <option key={unit.value} value={unit.value}>{unit.label}</option>
            ))}
          </select>
        </div>
      </FormField>
      
      <FormField 
        label="Total Consignment Quantity"
      >
        <div className="flex">
          <input 
            type="number"
            name="totalQuantity"
            value={formData.totalQuantity || ''}
            onChange={onChange}
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Total in consignment"
          />
          <select
            name="totalQuantityUnit"
            value={formData.totalQuantityUnit}
            onChange={onChange}
            className="border border-gray-300 rounded-r-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          >
            {quantityUnits.map((unit) => (
              <option key={unit.value} value={unit.value}>{unit.label}</option>
            ))}
          </select>
        </div>
      </FormField>
      
      <FormField 
        label="Reason for Hold" 
        required 
        error={errors.holdReason}
      >
        <select
          name="holdReason"
          value={formData.holdReason}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        >
          {holdReasons.map((reason) => (
            <option key={reason.value} value={reason.value}>{reason.label}</option>
          ))}
        </select>
      </FormField>
      
      <FormField 
        label="Item Value (Declared)"
      >
        <div className="flex">
          <select
            name="currency"
            value={formData.currency}
            onChange={onChange}
            className="border border-gray-300 rounded-l-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          >
            {currencies.map((currency) => (
              <option key={currency.value} value={currency.value}>{currency.label}</option>
            ))}
          </select>
          <input 
            type="number"
            name="itemValue"
            value={formData.itemValue || ''}
            onChange={onChange}
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Value"
          />
        </div>
      </FormField>
      
      <FormField 
        label="Expected Hold Duration"
      >
        <select
          name="holdDuration"
          value={formData.holdDuration}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        >
          {holdDurations.map((duration) => (
            <option key={duration.value} value={duration.value}>{duration.label}</option>
          ))}
        </select>
      </FormField>
    </>
  );
};