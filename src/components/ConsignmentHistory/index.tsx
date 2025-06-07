import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { SearchFilters } from './SearchFilters';
import { HistoryTable } from './HistoryTable';
import { Button } from '../ui/Button';
import { ConsignmentRecord } from '../../types';
import { FileDown } from 'lucide-react';
import { getConsignments } from '../../lib/api';

export const ConsignmentHistory: React.FC = () => {
  const [historyData, setHistoryData] = useState<ConsignmentRecord[]>([]);
  const [filteredData, setFilteredData] = useState<ConsignmentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    consignmentId: '',
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    status: 'all'
  });

  useEffect(() => {
    loadConsignments();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [historyData, filters]);

  const loadConsignments = async () => {
    try {
      setLoading(true);
      const consignments = await getConsignments();
      
      const transformedData: ConsignmentRecord[] = consignments.map((consignment: any) => ({
        id: consignment.consignment_id,
        importer: consignment.importer,
        examinationDate: consignment.examination_date.split('T')[0],
        itemCount: consignment.held_items?.length || 0,
        status: consignment.status,
        lastUpdated: consignment.updated_at.split('T')[0]
      }));
      
      setHistoryData(transformedData);
    } catch (error) {
      console.error('Error loading consignments:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...historyData];

    // Filter by consignment ID
    if (filters.consignmentId) {
      filtered = filtered.filter(item => 
        item.id.toLowerCase().includes(filters.consignmentId.toLowerCase())
      );
    }

    // Filter by date range
    if (filters.startDate) {
      filtered = filtered.filter(item => item.examinationDate >= filters.startDate);
    }
    if (filters.endDate) {
      filtered = filtered.filter(item => item.examinationDate <= filters.endDate);
    }

    // Filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter(item => item.status === filters.status);
    }

    setFilteredData(filtered);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    applyFilters();
  };

  const handleExport = () => {
    // In a real app, this would generate a report for export
    console.log('Exporting report with current filters');
    alert('In a real application, this would export the current view as a report in PDF or Excel format.');
  };

  if (loading) {
    return (
      <Card title="Consignment History">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <span className="ml-2 text-gray-600">Loading consignments...</span>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Consignment History">
      <SearchFilters 
        filters={filters}
        onChange={handleFilterChange}
        onSearch={handleSearch}
      />
      
      <HistoryTable 
        consignments={filteredData}
      />
      
      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredData.length}</span> of <span className="font-medium">{historyData.length}</span> results
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={true}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
          >
            Next
          </Button>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <Button
          variant="outline"
          onClick={handleExport}
          icon={<FileDown className="h-5 w-5" />}
        >
          Export Report
        </Button>
      </div>
    </Card>
  );
};