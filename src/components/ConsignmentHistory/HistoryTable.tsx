import React from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ConsignmentRecord } from '../../types';

interface HistoryTableProps {
  consignments: ConsignmentRecord[];
}

export const HistoryTable: React.FC<HistoryTableProps> = ({ consignments }) => {
  const getStatusLabel = (status: 'held' | 'released' | 'partial') => {
    switch(status) {
      case 'held': return 'Held';
      case 'released': return 'Released';
      case 'partial': return 'Partially Released';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Consignment ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Importer
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Examination Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Items
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Updated
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {consignments.map((record) => (
            <tr key={record.id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{record.id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{record.importer}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{record.examinationDate}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{record.itemCount} items</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant={record.status}>
                  {getStatusLabel(record.status)}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{record.lastUpdated}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <Button variant="outline" size="sm" className="mr-2">View</Button>
                {record.status !== 'released' && (
                  <Button variant="outline" size="sm">Release</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};