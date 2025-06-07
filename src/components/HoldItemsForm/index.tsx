import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { FormSection } from './FormSection';
import { ItemDetails } from './ItemDetails';
import { LocationSection } from './LocationSection';
import { IdentifiersSection } from './IdentifiersSection';
import { Button } from '../ui/Button';
import { HoldItemFormData, AlertType } from '../../types';
import { validateHoldForm } from '../../utils/validation';
import { createConsignment, createHeldItem, createItemIdentifiers } from '../../lib/api';

interface HoldItemsFormProps {
  showAlert: (type: AlertType, message: string) => void;
}

export const HoldItemsForm: React.FC<HoldItemsFormProps> = ({ showAlert }) => {
  const [formData, setFormData] = useState<HoldItemFormData>({
    consignmentId: '',
    importer: '',
    examinationDate: new Date().toISOString().split('T')[0],
    itemDescription: '',
    hsCode: '',
    quantityHeld: 0,
    quantityUnit: 'units',
    totalQuantity: undefined,
    totalQuantityUnit: 'units',
    holdReason: '',
    warehouse: '',
    section: '',
    shelf: '',
    currency: 'USD',
    itemValue: undefined,
    holdDuration: '1-3',
    identifiers: [],
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'quantityHeld' || name === 'totalQuantity' || name === 'itemValue') {
      setFormData({ ...formData, [name]: value ? Number(value) : undefined });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error when user makes changes
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleIdentifierAdd = (identifier: string) => {
    setFormData({
      ...formData,
      identifiers: [...formData.identifiers, identifier]
    });
  };

  const handleIdentifierRemove = (index: number) => {
    const newIdentifiers = [...formData.identifiers];
    newIdentifiers.splice(index, 1);
    setFormData({
      ...formData,
      identifiers: newIdentifiers
    });
  };

  const handleScanConsignment = () => {
    // Simulate scanning a barcode
    setTimeout(() => {
      const randomId = 'CSG-' + new Date().getFullYear() + '-' + 
        Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      
      setFormData({
        ...formData,
        consignmentId: randomId
      });
    }, 1000);
  };

  const handleSubmit = async () => {
    const formErrors = validateHoldForm(formData);
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      showAlert('error', 'Please fix the errors before submitting.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create or find consignment
      const consignmentData = {
        consignment_id: formData.consignmentId,
        importer: formData.importer,
        examination_date: formData.examinationDate,
        status: 'held' as const
      };
      
      const consignment = await createConsignment(consignmentData);
      
      // Create held item
      const heldItemData = {
        consignment_id: consignment.id,
        description: formData.itemDescription,
        hs_code: formData.hsCode,
        quantity: formData.quantityHeld,
        quantity_unit: formData.quantityUnit,
        total_quantity: formData.totalQuantity,
        total_quantity_unit: formData.totalQuantityUnit,
        hold_reason: formData.holdReason,
        warehouse: formData.warehouse,
        section: formData.section,
        shelf: formData.shelf,
        currency: formData.currency,
        item_value: formData.itemValue,
        hold_duration: formData.holdDuration,
        notes: formData.notes,
        status: 'held' as const
      };
      
      const heldItem = await createHeldItem(heldItemData);
      
      // Create item identifiers if any
      if (formData.identifiers.length > 0) {
        const identifierData = formData.identifiers.map(identifier => ({
          held_item_id: heldItem.id,
          identifier
        }));
        
        await createItemIdentifiers(identifierData);
      }
      
      showAlert('success', 'Item successfully registered as held!');
      handleReset();
    } catch (error) {
      console.error('Error submitting form:', error);
      showAlert('error', 'Failed to register item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      consignmentId: '',
      importer: '',
      examinationDate: new Date().toISOString().split('T')[0],
      itemDescription: '',
      hsCode: '',
      quantityHeld: 0,
      quantityUnit: 'units',
      totalQuantity: undefined,
      totalQuantityUnit: 'units',
      holdReason: '',
      warehouse: '',
      section: '',
      shelf: '',
      currency: 'USD',
      itemValue: undefined,
      holdDuration: '1-3',
      identifiers: [],
      notes: ''
    });
    setErrors({});
  };

  return (
    <Card title="Register Held Items">
      <FormSection 
        formData={formData}
        onChange={handleInputChange}
        onScan={handleScanConsignment}
        errors={errors}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ItemDetails 
          formData={formData}
          onChange={handleInputChange}
          errors={errors}
        />
        
        <LocationSection
          formData={formData}
          onChange={handleInputChange}
          errors={errors}
        />
      </div>
      
      <IdentifiersSection
        identifiers={formData.identifiers}
        onAdd={handleIdentifierAdd}
        onRemove={handleIdentifierRemove}
      />
      
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes/Additional Details</label>
        <textarea 
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows={3} 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
          placeholder="Enter any additional information about this hold"
        />
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="text-sm text-gray-500">* Required fields</div>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={handleReset}
            disabled={isSubmitting}
          >
            Reset
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register Hold'}
          </Button>
        </div>
      </div>
    </Card>
  );
};