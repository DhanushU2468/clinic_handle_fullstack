'use client';

import Sidebar from '@/components/layout/Sidebar';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardSubtitle, CardTitle } from '@/components/ui/Card';
import { CalendarIcon, CheckCircleIcon, ClockIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Appointment {
  id: number;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  duration: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  type: string;
}

export default function AppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, patientName: 'John Doe', doctorName: 'Dr. Smith', date: '2024-01-15', time: '10:30 AM', duration: '30 min', status: 'scheduled', type: 'Consultation' },
    { id: 2, patientName: 'Jane Smith', doctorName: 'Dr. Johnson', date: '2024-01-15', time: '11:00 AM', duration: '45 min', status: 'in-progress', type: 'Check-up' },
    { id: 3, patientName: 'Bob Wilson', doctorName: 'Dr. Brown', date: '2024-01-15', time: '11:30 AM', duration: '30 min', status: 'scheduled', type: 'Follow-up' },
    { id: 4, patientName: 'Alice Brown', doctorName: 'Dr. Davis', date: '2024-01-15', time: '12:00 PM', duration: '60 min', status: 'completed', type: 'Consultation' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEdit = (appointmentId: number) => {
    router.push(`/appointments/${appointmentId}/edit`);
  };

  const handleDelete = (appointmentId: number) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(appointments.filter(a => a.id !== appointmentId));
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
                <p className="text-sm text-gray-600">Manage appointments and scheduling</p>
              </div>
              <Button 
                onClick={() => router.push('/appointments/new')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                New Appointment
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {/* Calendar View */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Today&apos;s Schedule</CardTitle>
                <CardSubtitle>January 15, 2024</CardSubtitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Timeline */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Timeline</h3>
                    <div className="space-y-4">
                      {appointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <ClockIcon className="h-4 w-4 text-gray-600" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                                <p className="text-sm text-gray-600">{appointment.patientName}</p>
                                <p className="text-xs text-gray-500">{appointment.doctorName} &bull; {appointment.type}</p>
                              </div>
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                                {appointment.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-blue-900">Total Today</p>
                          <p className="text-2xl font-bold text-blue-600">{appointments.length}</p>
                        </div>
                        <CalendarIcon className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-green-900">Completed</p>
                          <p className="text-2xl font-bold text-green-600">
                            {appointments.filter(a => a.status === 'completed').length}
                          </p>
                        </div>
                        <CheckCircleIcon className="h-8 w-8 text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Appointments Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Appointments</CardTitle>
                <CardSubtitle>Manage and track all appointments</CardSubtitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Patient
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Doctor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {appointments.map((appointment) => (
                        <tr key={appointment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {appointment.patientName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {appointment.doctorName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {appointment.date} at {appointment.time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {appointment.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              onClick={() => handleEdit(appointment.id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(appointment.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
