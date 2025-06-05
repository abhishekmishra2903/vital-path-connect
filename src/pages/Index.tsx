
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthPage from '@/components/Auth/AuthPage';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Navigation/Sidebar';
import DashboardOverview from '@/components/Dashboard/DashboardOverview';
import HealthMetricsPage from '@/components/HealthMetrics/HealthMetricsPage';

const Index = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Health Dashboard</h1>
            <DashboardOverview />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Recent Health Metrics</h3>
                <p className="text-gray-600">Your latest measurements will appear here.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
                <p className="text-gray-600">Your scheduled appointments will appear here.</p>
              </div>
            </div>
          </div>
        );
      case 'health-metrics':
        return <HealthMetricsPage />;
      case 'medications':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Medications</h1>
            <p className="text-gray-600">Medication management features coming soon.</p>
          </div>
        );
      case 'appointments':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Appointments</h1>
            <p className="text-gray-600">Appointment scheduling features coming soon.</p>
          </div>
        );
      case 'messages':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Messages</h1>
            <p className="text-gray-600">Messaging features coming soon.</p>
          </div>
        );
      case 'profile':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Profile</h1>
            <p className="text-gray-600">Profile management features coming soon.</p>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Health Dashboard</h1>
            <DashboardOverview />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
