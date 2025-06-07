import { DashboardItem, HeldItem, ConsignmentRecord } from '../types';

export const dashboardItems: DashboardItem[] = [
  {
    label: "Active Consignments",
    value: 42,
    icon: "package",
    color: "blue"
  },
  {
    label: "Items Held",
    value: 187,
    icon: "alert-triangle",
    color: "red"
  },
  {
    label: "Items Released",
    value: 94,
    icon: "check-circle",
    color: "green",
    subtext: "+12 today"
  },
  {
    label: "Pending Review",
    value: 23,
    icon: "clock",
    color: "amber",
    subtext: "Requires attention"
  }
];

export const mockHeldItems: HeldItem[] = [
  {
    id: 1,
    description: 'Electronic Components - Microchips',
    hsCode: '8542.31.00',
    quantity: '500 Units',
    reason: 'Documentation Issues',
    location: 'W3-S2-B5'
  },
  {
    id: 2,
    description: 'Textile Products - Cotton T-shirts',
    hsCode: '6109.10.00',
    quantity: '200 Units',
    reason: 'Classification Verification',
    location: 'W3-S4-B2'
  }
];

export const mockConsignmentHistory: ConsignmentRecord[] = [
  {
    id: 'CSG-2023-0042',
    importer: 'TechImport Inc.',
    examinationDate: '2023-05-15',
    itemCount: 3,
    status: 'held',
    lastUpdated: '2023-05-15'
  },
  {
    id: 'CSG-2023-0038',
    importer: 'Global Textiles Ltd.',
    examinationDate: '2023-05-10',
    itemCount: 2,
    status: 'released',
    lastUpdated: '2023-05-12'
  },
  {
    id: 'CSG-2023-0035',
    importer: 'Pharma Supplies Co.',
    examinationDate: '2023-05-08',
    itemCount: 4,
    status: 'partial',
    lastUpdated: '2023-05-14'
  }
];