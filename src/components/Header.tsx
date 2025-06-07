import React from 'react';
import { Search, Shield } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-blue-700" />
          <h1 className="ml-2 text-xl font-semibold text-gray-800">Customs Inventory Control System</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search consignments..." 
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-700 mr-2">Customs Officer</span>
            <div className="h-8 w-8 rounded-full bg-blue-700 flex items-center justify-center text-white font-medium">
              CO
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};