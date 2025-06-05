
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Pill, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const MedicationsPage = () => {
  const [medications] = useState([
    {
      id: '1',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      prescribingDoctor: 'Dr. Sarah Johnson',
      startDate: '2024-01-15',
      instructions: 'Take with food in the morning',
      isActive: true,
      nextDose: '2024-06-05T08:00:00',
      sideEffects: 'May cause dizziness'
    },
    {
      id: '2',
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      prescribingDoctor: 'Dr. Michael Chen',
      startDate: '2024-02-01',
      instructions: 'Take with meals',
      isActive: true,
      nextDose: '2024-06-05T12:00:00',
      sideEffects: 'May cause stomach upset'
    },
    {
      id: '3',
      name: 'Vitamin D3',
      dosage: '1000 IU',
      frequency: 'Daily',
      prescribingDoctor: 'Dr. Sarah Johnson',
      startDate: '2024-03-01',
      instructions: 'Take with largest meal',
      isActive: true,
      nextDose: '2024-06-05T18:00:00',
      sideEffects: 'Generally well tolerated'
    },
    {
      id: '4',
      name: 'Aspirin',
      dosage: '81mg',
      frequency: 'Daily',
      prescribingDoctor: 'Dr. Emily Rodriguez',
      startDate: '2024-01-01',
      endDate: '2024-05-01',
      instructions: 'Low dose for heart protection',
      isActive: false,
      sideEffects: 'May cause stomach irritation'
    }
  ]);

  const getFrequencyColor = (frequency: string) => {
    if (frequency.includes('Once')) return 'bg-green-100 text-green-800';
    if (frequency.includes('Twice')) return 'bg-blue-100 text-blue-800';
    if (frequency.includes('Three')) return 'bg-orange-100 text-orange-800';
    return 'bg-purple-100 text-purple-800';
  };

  const formatNextDose = (nextDose: string) => {
    const date = new Date(nextDose);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-purple-900">Medications</h1>
          <p className="text-purple-600 mt-1">Manage your prescriptions and supplements</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Medication
        </Button>
      </div>

      {/* Active Medications */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
          <Pill className="mr-2 h-5 w-5 text-purple-600" />
          Active Medications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {medications.filter(med => med.isActive).map((medication) => (
            <Card key={medication.id} className="border-l-4 border-l-purple-500 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <CardTitle className="flex items-center justify-between">
                  <span>{medication.name}</span>
                  <Badge className="bg-white text-purple-600">
                    {medication.dosage}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Frequency:</span>
                    <Badge className={getFrequencyColor(medication.frequency)}>
                      {medication.frequency}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Next dose: {formatNextDose(medication.nextDose)}</span>
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-medium text-gray-600">Doctor:</span>
                    <span className="ml-1">{medication.prescribingDoctor}</span>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Instructions:</span>
                    <p className="mt-1">{medication.instructions}</p>
                  </div>
                  
                  <Button size="sm" className="w-full bg-green-500 hover:bg-green-600">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Taken
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Inactive Medications */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5 text-gray-500" />
          Inactive Medications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {medications.filter(med => !med.isActive).map((medication) => (
            <Card key={medication.id} className="border-l-4 border-l-gray-400 opacity-75">
              <CardHeader className="bg-gray-100">
                <CardTitle className="flex items-center justify-between text-gray-700">
                  <span>{medication.name}</span>
                  <Badge variant="secondary">
                    {medication.dosage}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium text-gray-600">Ended:</span>
                    <span className="ml-1">{medication.endDate}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-600">Doctor:</span>
                    <span className="ml-1">{medication.prescribingDoctor}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicationsPage;
