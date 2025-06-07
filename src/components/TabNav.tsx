import React from 'react';
import { TabType } from '../types';

interface TabNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const TabNav: React.FC<TabNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'hold' as TabType, label: 'Hold Items' },
    { id: 'release' as TabType, label: 'Release Items' },
    { id: 'history' as TabType, label: 'Consignment History' }
  ];

  return (
    <div className="mb-6 flex border-b border-gray-200">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-3 text-sm font-medium focus:outline-none transition-colors duration-200 ${
            activeTab === tab.id
              ? 'bg-blue-700 text-white'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};