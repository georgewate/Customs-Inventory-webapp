import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { ConsignmentSearch } from './ConsignmentSearch';
import { HeldItemsTable } from './HeldItemsTable';
import { ReleaseDetails } from './ReleaseDetails';
import { Button } from '../ui/Button';
import { ReleaseItemFormData, HeldItem, AlertType } from '../../types';
import { validateReleaseForm } from '../../utils/validation';
import { getConsignmentById, updateHeldItemStatus, createReleaseRecord, updateConsignmentStatus } from '../../lib/api';
import { Printer } from 'lucide-react';

interface ReleaseItemsFormProps {
  showAlert: (type: AlertType, message: string) => void;
}

export const ReleaseItemsForm: React.FC<ReleaseItemsFormProps> = ({ showAlert }) => {
  const [formData, setFormData] = useState<ReleaseItemFormData>({
    consignmentId: '',
    importer: '',
    holdDate: '',
    releaseDate: new Date().toISOString().split('T')[0],
    releaseReference: '',
    releaseReason: '',
    authorizingOfficer: '',
    notes: '',
    selectedItems: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [heldItems, setHeldItems] = useState<HeldItem[]>([]);
  const [consignmentFound, setConsignmentFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user makes changes
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSearch = async () => {
    if (!formData.consignmentId) {
      setErrors({ ...errors, consignmentId: 'Consignment ID is required' });
      return;
    }
    
    setIsSearching(true);
    
    try {
      const consignmentData = await getConsignmentById(formData.consignmentId);
      
      if (!consignmentData) {
        showAlert('error', 'Consignment not found');
        return;
      }
      
      setFormData({
        ...formData,
        importer: consignmentData.importer,
        holdDate: consignmentData.examination_date.split('T')[0]
      });
      
      // Transform held items data
      const transformedItems: HeldItem[] = consignmentData.held_items
        .filter((item: any) => item.status === 'held')
        .map((item: any) => ({
          id: item.id,
          description: item.description,
          hsCode: item.hs_code,
          quantity: `${item.quantity} ${item.quantity_unit}`,
          reason: item.hold_reason,
          location: `${item.warehouse}${item.section ? '-' + item.section : ''}${item.shelf ? '-' + item.shelf : ''}`
        }));
      
      setHeldItems(transformedItems);
      setConsignmentFound(true);
      
      if (transformedItems.length === 0) {
        showAlert('warning', 'No held items found for this consignment');
      } else {
        showAlert('success', `Consignment found! ${transformedItems.length} held items loaded for release.`);
      }
    } catch (error) {
      console.error('Error searching consignment:', error);
      showAlert('error', 'Error searching for consignment. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleItemSelect = (itemId: string, selected: boolean) => {
    if (selected) {
      setFormData({
        ...formData,
        selectedItems: [...formData.selectedItems, itemId]
      });
    } else {
      setFormData({
        ...formData,
        selectedItems: formData.selectedItems.filter(id => id !== itemId)
      });
    }
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setFormData({
        ...formData,
        selectedItems: heldItems.map(item => item.id)
      });
    } else {
      setFormData({
        ...formData,
        selectedItems: []
      });
    }
  };

  const handleSubmit = async () => {
    if (formData.selectedItems.length === 0) {
      showAlert('error', 'Please select at least one item to release.');
      return;
    }
    
    const formErrors = validateReleaseForm(formData);
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      showAlert('error', 'Please fix the errors before submitting.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Update held items status and create release records
      for (const itemId of formData.selectedItems) {
        await updateHeldItemStatus(itemId, 'released');
        
        await createReleaseRecord({
          held_item_id: itemId,
          release_date: formData.releaseDate,
          release_reference: formData.releaseReference,
          release_reason: formData.releaseReason,
          authorizing_officer: formData.authorizingOfficer,
          notes: formData.notes
        });
      }
      
      // Update consignment status
      const consignmentData = await getConsignmentById(formData.consignmentId);
      const remainingHeldItems = consignmentData.held_items.filter(
        (item: any) => item.status === 'held' && !formData.selectedItems.includes(item.id)
      );
      
      const newStatus = remainingHeldItems.length === 0 ? 'released' : 'partial';
      await updateConsignmentStatus(consignmentData.id, newStatus);
      
      showAlert('success', 'Items successfully released!');
      
      // Reset form
      setFormData({
        consignmentId: '',
        importer: '',
        holdDate: '',
        releaseDate: new Date().toISOString().split('T')[0],
        releaseReference: '',
        releaseReason: '',
        authorizingOfficer: '',
        notes: '',
        selectedItems: []
      });
      setHeldItems([]);
      setConsignmentFound(false);
    } catch (error) {
      console.error('Error releasing items:', error);
      showAlert('error', 'Failed to release items. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrintDocument = () => {
    if (formData.selectedItems.length === 0) {
      showAlert('warning', 'Please select at least one item to generate a release document.');
      return;
    }
    
    // In a real app, this would generate a document to print
    showAlert('info', 'Generating release document for printing...');
  };

  return (
    <Card title="Process Item Release">
      <ConsignmentSearch 
        consignmentId={formData.consignmentId}
        importer={formData.importer}
        holdDate={formData.holdDate}
        onChange={handleInputChange}
        onSearch={handleSearch}
        errors={errors}
        isSearching={isSearching}
      />
      
      {consignmentFound && (
        <>
          <HeldItemsTable 
            items={heldItems}
            selectedItems={formData.selectedItems}
            onItemSelect={handleItemSelect}
            onSelectAll={handleSelectAll}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <ReleaseDetails 
              formData={formData}
              onChange={handleInputChange}
              errors={errors}
            />
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Release Notes</label>
            <textarea 
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={3} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
              placeholder="Enter any additional information about this release"
            />
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="text-sm text-gray-500">* Required fields</div>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={handlePrintDocument}
                icon={<Printer className="h-5 w-5" />}
                disabled={isSubmitting}
              >
                Print Release Document
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Process Release'}
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};