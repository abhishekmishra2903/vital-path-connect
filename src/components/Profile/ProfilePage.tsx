
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { User, Phone, Calendar, Heart, Shield, Edit, Save, Camera } from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      return JSON.parse(savedProfile);
    }
    return {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1985-03-15',
      phone: '+1 (555) 123-4567',
      email: 'john.doe@email.com',
      emergencyContactName: 'Jane Doe',
      emergencyContactPhone: '+1 (555) 987-6543',
      medicalRecordNumber: 'MRN-12345',
      bloodType: 'O+',
      allergies: 'Penicillin, Shellfish',
      chronicConditions: 'Hypertension, Type 2 Diabetes',
      preferredPharmacy: 'CVS Pharmacy - Main Street',
      insuranceProvider: 'Blue Cross Blue Shield',
      insurancePolicyNumber: 'BCBS-789456123'
    };
  });

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setIsEditing(false);
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const healthStats = [
    { label: 'Age', value: `${calculateAge(profile.dateOfBirth)} years`, icon: Calendar, color: 'text-blue-600' },
    { label: 'Blood Type', value: profile.bloodType, icon: Heart, color: 'text-red-600' },
    { label: 'Health Score', value: '85/100', icon: Shield, color: 'text-green-600' }
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-indigo-900">Profile</h1>
            <p className="text-indigo-600 mt-1">Manage your personal and health information</p>
          </div>
          <Button 
            onClick={isEditing ? handleSaveChanges : () => setIsEditing(true)}
            className={isEditing ? "bg-green-600 hover:bg-green-700" : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"}
          >
            {isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="border-l-4 border-l-indigo-500 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center">
                <div className="relative">
                  <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="h-12 w-12 text-indigo-500" />
                  </div>
                  {isEditing && (
                    <Button size="sm" className="absolute bottom-0 right-1/3 bg-white text-indigo-600 hover:bg-gray-100">
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <CardTitle className="text-xl">
                  {profile.firstName} {profile.lastName}
                </CardTitle>
                <p className="text-indigo-100">Patient ID: {profile.medicalRecordNumber}</p>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {healthStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                        <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                      </div>
                      <Badge variant="secondary">{stat.value}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100">
                <CardTitle className="flex items-center text-indigo-900">
                  <User className="mr-2 h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={profile.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-100 to-pink-100">
                <CardTitle className="flex items-center text-red-900">
                  <Phone className="mr-2 h-5 w-5" />
                  Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactName">Contact Name</Label>
                    <Input
                      id="emergencyContactName"
                      value={profile.emergencyContactName}
                      onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactPhone">Contact Phone</Label>
                    <Input
                      id="emergencyContactPhone"
                      value={profile.emergencyContactPhone}
                      onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medical Information */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100">
                <CardTitle className="flex items-center text-green-900">
                  <Heart className="mr-2 h-5 w-5" />
                  Medical Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Blood Type</Label>
                      <Input
                        id="bloodType"
                        value={profile.bloodType}
                        onChange={(e) => handleInputChange('bloodType', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredPharmacy">Preferred Pharmacy</Label>
                      <Input
                        id="preferredPharmacy"
                        value={profile.preferredPharmacy}
                        onChange={(e) => handleInputChange('preferredPharmacy', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="allergies">Allergies</Label>
                    <Textarea
                      id="allergies"
                      value={profile.allergies}
                      onChange={(e) => handleInputChange('allergies', e.target.value)}
                      disabled={!isEditing}
                      placeholder="List any known allergies..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chronicConditions">Chronic Conditions</Label>
                    <Textarea
                      id="chronicConditions"
                      value={profile.chronicConditions}
                      onChange={(e) => handleInputChange('chronicConditions', e.target.value)}
                      disabled={!isEditing}
                      placeholder="List any chronic medical conditions..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Insurance Information */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100">
                <CardTitle className="flex items-center text-blue-900">
                  <Shield className="mr-2 h-5 w-5" />
                  Insurance Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                    <Input
                      id="insuranceProvider"
                      value={profile.insuranceProvider}
                      onChange={(e) => handleInputChange('insuranceProvider', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insurancePolicyNumber">Policy Number</Label>
                    <Input
                      id="insurancePolicyNumber"
                      value={profile.insurancePolicyNumber}
                      onChange={(e) => handleInputChange('insurancePolicyNumber', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
