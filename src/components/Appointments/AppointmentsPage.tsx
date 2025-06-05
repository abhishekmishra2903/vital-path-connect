
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, User, Plus, Phone } from 'lucide-react';

const AppointmentsPage = () => {
  const [appointments] = useState([
    {
      id: '1',
      providerName: 'Dr. Sarah Johnson',
      appointmentDate: '2024-06-10T10:00:00',
      duration: 30,
      appointmentType: 'routine_checkup',
      status: 'confirmed',
      location: 'Heart Care Center, Room 201',
      notes: 'Annual physical examination',
      specialty: 'Cardiology'
    },
    {
      id: '2',
      providerName: 'Dr. Michael Chen',
      appointmentDate: '2024-06-15T14:30:00',
      duration: 45,
      appointmentType: 'follow_up',
      status: 'scheduled',
      location: 'Downtown Medical Plaza, Suite 305',
      notes: 'Follow-up for diabetes management',
      specialty: 'Endocrinology'
    },
    {
      id: '3',
      providerName: 'Dr. Emily Rodriguez',
      appointmentDate: '2024-06-20T09:15:00',
      duration: 60,
      appointmentType: 'consultation',
      status: 'scheduled',
      location: 'Wellness Center, Floor 2',
      notes: 'Initial consultation for joint pain',
      specialty: 'Rheumatology'
    },
    {
      id: '4',
      providerName: 'Dr. James Wilson',
      appointmentDate: '2024-05-28T11:00:00',
      duration: 30,
      appointmentType: 'lab_work',
      status: 'completed',
      location: 'Lab Services Center',
      notes: 'Blood work for cholesterol levels',
      specialty: 'Laboratory'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'routine_checkup': return 'bg-blue-100 text-blue-800';
      case 'follow_up': return 'bg-purple-100 text-purple-800';
      case 'consultation': return 'bg-orange-100 text-orange-800';
      case 'lab_work': return 'bg-teal-100 text-teal-800';
      case 'emergency': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatAppointmentDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  const upcomingAppointments = appointments.filter(apt => 
    new Date(apt.appointmentDate) > new Date() && apt.status !== 'cancelled'
  );
  
  const pastAppointments = appointments.filter(apt => 
    new Date(apt.appointmentDate) <= new Date() || apt.status === 'completed'
  );

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-teal-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Appointments</h1>
          <p className="text-blue-600 mt-1">Manage your healthcare appointments</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
          <Plus className="mr-2 h-4 w-4" />
          Schedule Appointment
        </Button>
      </div>

      {/* Upcoming Appointments */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-blue-600" />
          Upcoming Appointments
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {upcomingAppointments.map((appointment) => {
            const { date, time } = formatAppointmentDate(appointment.appointmentDate);
            return (
              <Card key={appointment.id} className="border-l-4 border-l-blue-500 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      <span>{appointment.providerName}</span>
                    </div>
                    <Badge className={`${getStatusColor(appointment.status)} text-xs`}>
                      {appointment.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">{date}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-teal-500" />
                      <span>{time} ({appointment.duration} min)</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">{appointment.location}</span>
                    </div>
                    
                    <Badge className={getTypeColor(appointment.appointmentType)}>
                      {appointment.appointmentType.replace('_', ' ')}
                    </Badge>
                    
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Specialty:</span> {appointment.specialty}
                    </div>
                    
                    {appointment.notes && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Notes:</span>
                        <p className="mt-1">{appointment.notes}</p>
                      </div>
                    )}
                    
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Office
                      </Button>
                      <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Past Appointments */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <Clock className="mr-2 h-5 w-5 text-gray-500" />
          Past Appointments
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pastAppointments.map((appointment) => {
            const { date, time } = formatAppointmentDate(appointment.appointmentDate);
            return (
              <Card key={appointment.id} className="border-l-4 border-l-gray-400 opacity-75">
                <CardHeader className="bg-gray-100">
                  <CardTitle className="flex items-center justify-between text-gray-700">
                    <div className="flex items-center">
                      <User className="mr-2 h-5 w-5" />
                      <span>{appointment.providerName}</span>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{date} at {time}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Type:</span> {appointment.appointmentType.replace('_', ' ')}
                    </div>
                    {appointment.notes && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Notes:</span> {appointment.notes}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
