import React, { useState, useEffect } from 'react';
import { Package, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { DashboardItem } from '../types';
import { getDashboardStats } from '../lib/api';

export const Dashboard: React.FC = () => {
  const [dashboardItems, setDashboardItems] = useState<DashboardItem[]>([
    {
      label: "Active Consignments",
      value: 0,
      icon: "package",
      color: "blue"
    },
    {
      label: "Items Held",
      value: 0,
      icon: "alert-triangle",
      color: "red"
    },
    {
      label: "Items Released",
      value: 0,
      icon: "check-circle",
      color: "green",
      subtext: "Today"
    },
    {
      label: "Pending Review",
      value: 0,
      icon: "clock",
      color: "amber",
      subtext: "Requires attention"
    }
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const stats = await getDashboardStats();
      
      setDashboardItems([
        {
          label: "Active Consignments",
          value: stats.activeConsignments,
          icon: "package",
          color: "blue"
        },
        {
          label: "Items Held",
          value: stats.itemsHeld,
          icon: "alert-triangle",
          color: "red"
        },
        {
          label: "Items Released",
          value: stats.itemsReleased,
          icon: "check-circle",
          color: "green",
          subtext: "Total"
        },
        {
          label: "Pending Review",
          value: stats.pendingReview,
          icon: "clock",
          color: "amber",
          subtext: "Requires attention"
        }
      ]);
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (iconName: string, colorClass: string) => {
    switch (iconName) {
      case 'package':
        return <Package className={`h-6 w-6 text-${colorClass}-700`} />;
      case 'alert-triangle':
        return <AlertTriangle className={`h-6 w-6 text-${colorClass}-600`} />;
      case 'check-circle':
        return <CheckCircle className={`h-6 w-6 text-${colorClass}-600`} />;
      case 'clock':
        return <Clock className={`h-6 w-6 text-${colorClass}-600`} />;
      default:
        return <Package className={`h-6 w-6 text-${colorClass}-700`} />;
    }
  };

  if (loading) {
    return (
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-4 flex items-center animate-pulse">
            <div className="rounded-full bg-gray-200 p-3 mr-4 w-12 h-12"></div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
      {dashboardItems.map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-4 flex items-center transition-all duration-300 hover:shadow-md">
          <div className={`rounded-full bg-${item.color}-100 p-3 mr-4`}>
            {getIcon(item.icon, item.color)}
          </div>
          <div>
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-xl font-semibold">{item.value}</p>
            {item.subtext && <p className={`text-xs text-${item.color}-600`}>{item.subtext}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};