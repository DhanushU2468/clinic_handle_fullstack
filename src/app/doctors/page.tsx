'use client';

import Sidebar from '@/components/layout/Sidebar';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import {
    CalendarIcon,
    ClockIcon,
    CogIcon,
    DocumentChartBarIcon,
    EnvelopeIcon,
    MapPinIcon,
    PhoneIcon,
    PlusIcon,
    UserIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  location: string;
  schedule: string;
  availability: boolean;
}

export default function DoctorsPage() {
  const router = useRouter();
  const [doctors] = useState<Doctor[]>([
    {
      id: '1',
      name: 'Dr. Sarah Smith',
      specialty: 'Cardiology',
      email: 'sarah.smith@hospital.com',
      phone: '+1 (555) 123-4567',
      location: 'Room 301, Cardiology Wing',
      schedule: 'Mon-Fri: 9:00 AM - 5:00 PM',
      availability: true,
    },
    {
      id: '2',
      name: 'Dr. Michael Johnson',
      specialty: 'Neurology',
      email: 'michael.johnson@hospital.com',
      phone: '+1 (555) 234-5678',
      location: 'Room 205, Neurology Department',
      schedule: 'Mon-Thu: 8:00 AM - 4:00 PM',
      availability: true,
    },
    {
      id: '3',
      name: 'Dr. Emily Brown',
      specialty: 'Pediatrics',
      email: 'emily.brown@hospital.com',
      phone: '+1 (555) 345-6789',
      location: 'Room 102, Pediatric Wing',
      schedule: 'Tue-Sat: 10:00 AM - 6:00 PM',
      availability: false,
    },
    {
      id: '4',
      name: 'Dr. David Wilson',
      specialty: 'Orthopedics',
      email: 'david.wilson@hospital.com',
      phone: '+1 (555) 456-7890',
      location: 'Room 401, Orthopedic Center',
      schedule: 'Mon-Wed-Fri: 9:00 AM - 5:00 PM',
      availability: true,
    },
  ]);

  const quickActions = [
    {
      title: 'Doctor Schedule',
      description: 'View and manage doctor schedules',
      icon: CalendarIcon,
      action: () => router.push('/doctors/schedule'),
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Generate Report',
      description: 'Create doctor performance reports',
      icon: DocumentChartBarIcon,
      action: () => router.push('/reports'),
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Settings',
      description: 'Configure doctor preferences',
      icon: CogIcon,
      action: () => router.push('/settings'),
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Add New Doctor',
      description: 'Register a new doctor',
      icon: PlusIcon,
      action: () => router.push('/doctors/new'),
      color: 'bg-orange-50 text-orange-600',
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Doctors</h1>
                <p className="text-sm text-gray-600">Manage doctor information and schedules</p>
              </div>
              <div className="flex space-x-3">
                <Button 
                  onClick={() => router.push('/doctors/new')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Doctor
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action) => (
                  <Card 
                    key={action.title} 
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={action.action}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className={`p-3 rounded-lg ${action.color}`}>
                          <action.icon className="h-6 w-6" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-sm font-semibold text-gray-900">{action.title}</h3>
                          <p className="text-xs text-gray-600 mt-1">{action.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Doctors List */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">All Doctors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                  <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div className="p-3 rounded-full bg-gray-100">
                            <UserIcon className="h-8 w-8 text-gray-600" />
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                            <p className="text-sm text-gray-600">{doctor.specialty}</p>
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          doctor.availability 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {doctor.availability ? 'Available' : 'Unavailable'}
                        </span>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <EnvelopeIcon className="h-4 w-4 mr-2" />
                          {doctor.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <PhoneIcon className="h-4 w-4 mr-2" />
                          {doctor.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPinIcon className="h-4 w-4 mr-2" />
                          {doctor.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <ClockIcon className="h-4 w-4 mr-2" />
                          {doctor.schedule}
                        </div>
                      </div>

                      <div className="mt-4 flex space-x-2">
                        <Button 
                          onClick={() => router.push(`/doctors/${doctor.id}/schedule`)}
                          className="flex-1 text-sm"
                          variant="secondary"
                        >
                          View Schedule
                        </Button>
                        <Button 
                          onClick={() => router.push(`/doctors/${doctor.id}/edit`)}
                          className="flex-1 text-sm"
                        >
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
