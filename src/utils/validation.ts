import { HoldItemFormData, ReleaseItemFormData } from '../types';

export const validateHoldForm = (data: HoldItemFormData): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  if (!data.consignmentId) {
    errors.consignmentId = 'Consignment ID is required';
  }
  
  if (!data.examinationDate) {
    errors.examinationDate = 'Examination date is required';
  }
  
  if (!data.itemDescription) {
    errors.itemDescription = 'Item description is required';
  }
  
  if (!data.hsCode) {
    errors.hsCode = 'HS Code is required';
  }
  
  if (!data.quantityHeld || data.quantityHeld <= 0) {
    errors.quantityHeld = 'Quantity must be greater than 0';
  }
  
  if (!data.holdReason) {
    errors.holdReason = 'Please select a reason';
  }
  
  if (!data.warehouse) {
    errors.warehouse = 'Warehouse is required';
  }
  
  return errors;
};

export const validateReleaseForm = (data: ReleaseItemFormData): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  if (!data.consignmentId) {
    errors.consignmentId = 'Consignment ID is required';
  }
  
  if (!data.releaseDate) {
    errors.releaseDate = 'Release date is required';
  }
  
  if (!data.releaseReference) {
    errors.releaseReference = 'Reference number is required';
  }
  
  if (!data.releaseReason) {
    errors.releaseReason = 'Please select a reason';
  }
  
  if (!data.authorizingOfficer) {
    errors.authorizingOfficer = 'Authorizing officer is required';
  }
  
  return errors;
};