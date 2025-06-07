import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { TabNav } from './components/TabNav';
import { HoldItemsForm } from './components/HoldItemsForm';
import { ReleaseItemsForm } from './components/ReleaseItemsForm';
import { ConsignmentHistory } from './components/ConsignmentHistory';
import { Alert } from './components/ui/Alert';
import { AlertType } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'hold' | 'release' | 'history'>('hold');
  const [alert, setAlert] = useState<{ type: AlertType; message: string; visible: boolean }>({
    type: 'success',
    message: '',
    visible: false
  });

  const showAlert = (type: AlertType, message: string) => {
    setAlert({ type, message, visible: true });
    setTimeout(() => {
      setAlert(prev => ({ ...prev, visible: false }));
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Dashboard />
        
        <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
        
        {activeTab === 'hold' && (
          <HoldItemsForm showAlert={showAlert} />
        )}
        
        {activeTab === 'release' && (
          <ReleaseItemsForm showAlert={showAlert} />
        )}
        
        {activeTab === 'history' && (
          <ConsignmentHistory />
        )}
        
        {alert.visible && (
          <Alert 
            type={alert.type} 
            message={alert.message} 
            onClose={() => setAlert(prev => ({ ...prev, visible: false }))} 
          />
        )}
      </main>
    </div>
  );
}

export default App;