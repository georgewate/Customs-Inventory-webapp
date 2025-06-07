import React from 'react';

interface FiltersProps {
  filters: {
    consignmentId: string;
    startDate: string;
    endDate: string;
    status: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSearch: () => void;
}

export const SearchFilters: React.FC<FiltersProps> = ({
  filters,
  onChange,
  onSearch
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch();
    }
  };

  return (
    <div className="mb-6 flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Search by Consignment ID</label>
        <div className="flex">
          <input 
            type="text"
            name="consignmentId"
            value={filters.consignmentId}
            onChange={onChange}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Enter consignment ID"
          />
          <button 
            onClick={onSearch}
            className="bg-blue-700 text-white px-4 rounded-r-lg hover:bg-blue-800 focus:outline-none transition-colors duration-200"
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Date Range</label>
        <div className="grid grid-cols-2 gap-2">
          <input 
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
          <input 
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
        <select
          name="status"
          value={filters.status}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        >
          <option value="all">All Statuses</option>
          <option value="held">Held</option>
          <option value="released">Released</option>
          <option value="partial">Partially Released</option>
        </select>
      </div>
    </div>
  );
};