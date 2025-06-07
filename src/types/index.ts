// Alert Types
export type AlertType = 'success' | 'error' | 'warning' | 'info';

// Database Types
export interface Consignment {
  id: string;
  consignment_id: string;
  importer: string;
  examination_date: string;
  status: 'held' | 'released' | 'partial';
  created_at: string;
  updated_at: string;
}

export interface HeldItem {
  id: string;
  consignment_id?: string;
  description: string;
  hs_code?: string;
  hsCode?: string;
  quantity: number | string;
  quantity_unit?: string;
  total_quantity?: number;
  total_quantity_unit?: string;
  hold_reason?: string;
  reason?: string;
  warehouse?: string;
  section?: string;
  shelf?: string;
  location?: string;
  currency?: string;
  item_value?: number;
  hold_duration?: string;
  notes?: string;
  status?: 'held' | 'released';
  created_at?: string;
  updated_at?: string;
}

export interface ItemIdentifier {
  id: string;
  held_item_id: string;
  identifier: string;
  created_at: string;
}

export interface ReleaseRecord {
  id: string;
  held_item_id: string;
  release_date: string;
  release_reference: string;
  release_reason: string;
  authorizing_officer: string;
  notes?: string;
  created_at: string;
}

// Form Data Types
export interface HoldItemFormData {
  consignmentId: string;
  importer: string;
  examinationDate: string;
  itemDescription: string;
  hsCode: string;
  quantityHeld: number;
  quantityUnit: string;
  totalQuantity?: number;
  totalQuantityUnit?: string;
  holdReason: string;
  warehouse: string;
  section?: string;
  shelf?: string;
  currency?: string;
  itemValue?: number;
  holdDuration: string;
  identifiers: string[];
  notes?: string;
}

export interface ReleaseItemFormData {
  consignmentId: string;
  importer: string;
  holdDate: string;
  releaseDate: string;
  releaseReference: string;
  releaseReason: string;
  authorizingOfficer: string;
  notes?: string;
  selectedItems: string[];
}

// Dashboard Data Types
export interface DashboardItem {
  label: string;
  value: number;
  icon: string;
  color: string;
  subtext?: string;
}

// History Data Types
export interface ConsignmentRecord {
  id: string;
  importer: string;
  examinationDate: string;
  itemCount: number;
  status: 'held' | 'released' | 'partial';
  lastUpdated: string;
}

// Tab Navigation Types
export type TabType = 'hold' | 'release' | 'history';