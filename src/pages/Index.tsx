
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthPage from '@/components/Auth/AuthPage';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Navigation/Sidebar';
import DashboardOverview from '@/components/Dashboard/DashboardOverview';
import HealthMetricsPage from '@/components/HealthMetrics/HealthMetricsPage';
import MedicationsPage from '@/components/Medications/MedicationsPage';
import AppointmentsPage from '@/components/Appointments/AppointmentsPage';
import MessagesPage from '@/components/Messages/MessagesPage';
import ProfilePage from '@/components/Profile/ProfilePage';

const Index = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-lg text-blue-700">Loading your health dashboard...</div>
        </div>
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
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-blue-900">Health Dashboard</h1>
              <p className="text-blue-600 mt-1">Welcome back! Here's your health overview.</p>
            </div>
            <DashboardOverview />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-l-blue-500">
                <h3 className="text-lg font-semibold mb-4 text-blue-900">Recent Health Metrics</h3>
                <p className="text-gray-600">Your latest measurements will appear here.</p>
                <div className="mt-4 text-sm text-blue-600">
                  Track your vital signs and see trends over time.
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-l-green-500">
                <h3 className="text-lg font-semibold mb-4 text-green-900">Upcoming Appointments</h3>
                <p className="text-gray-600">Your scheduled appointments will appear here.</p>
                <div className="mt-4 text-sm text-green-600">
                  Stay on top of your healthcare schedule.
                </div>
              </div>
            </div>
          </div>
        );
      case 'health-metrics':
        return <HealthMetricsPage />;
      case 'medications':
        return <MedicationsPage />;
      case 'appointments':
        return <AppointmentsPage />;
      case 'messages':
        return <MessagesPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return (
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
            <h1 className="text-3xl font-bold text-blue-900 mb-6">Health Dashboard</h1>
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
