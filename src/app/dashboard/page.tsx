'use client';

import Sidebar from '@/components/layout/Sidebar';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardSubtitle, CardTitle } from '@/components/ui/Card';
import {
  ArrowTrendingUpIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  todayAppointments: number;
  pendingAppointments: number;
  completedToday: number;
  waitingQueue: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalPatients: 1247,
    totalDoctors: 23,
    todayAppointments: 45,
    pendingAppointments: 12,
    completedToday: 33,
    waitingQueue: 8,
  });

  useEffect(() => {
    // In a real app, fetch these stats from the API
    // For now, using mock data
  }, []);

  const statCards = [
    {
      title: 'Total Patients',
      value: stats.totalPatients,
      icon: UserGroupIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      trend: '+12% this month',
    },
    {
      title: 'Active Doctors',
      value: stats.totalDoctors,
      icon: UserGroupIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      trend: '+2 new this week',
    },
    {
      title: "Today's Appointments",
      value: stats.todayAppointments,
      icon: CalendarIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      trend: `${stats.completedToday} completed`,
    },
    {
      title: 'Waiting Queue',
      value: stats.waitingQueue,
      icon: ClockIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      trend: 'Current wait: 15 min',
    },
  ];

  const recentAppointments = [
    { id: 1, patient: 'John Doe', doctor: 'Dr. Smith', time: '10:30 AM', status: 'scheduled' },
    { id: 2, patient: 'Jane Smith', doctor: 'Dr. Johnson', time: '11:00 AM', status: 'in-progress' },
    { id: 3, patient: 'Bob Wilson', doctor: 'Dr. Brown', time: '11:30 AM', status: 'waiting' },
    { id: 4, patient: 'Alice Brown', doctor: 'Dr. Davis', time: '12:00 PM', status: 'scheduled' },
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
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back! Here's what's happening today.</p>
              </div>
              <div className="flex space-x-3">
                <Button 
                  onClick={() => router.push('/appointments/new')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  New Appointment
                </Button>
                <Button 
                  onClick={() => router.push('/patients/new')}
                  variant="secondary"
                >
                  Add Patient
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((stat) => (
                <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-xs text-gray-500">{stat.trend}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Appointments & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Appointments */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Appointments</CardTitle>
                    <CardSubtitle>Today's scheduled appointments</CardSubtitle>
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
                              Time
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {recentAppointments.map((appointment) => (
                            <tr key={appointment.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {appointment.patient}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {appointment.doctor}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {appointment.time}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  appointment.status === 'scheduled' 
                                    ? 'bg-blue-100 text-blue-800'
                                    : appointment.status === 'in-progress'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {appointment.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardSubtitle>Common tasks</CardSubtitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      onClick={() => router.push('/queue')}
                      className="w-full justify-start"
                      variant="secondary"
                    >
                      View Queue
                    </Button>
                    <Button 
                      onClick={() => router.push('/patients')}
                      className="w-full justify-start"
                      variant="secondary"
                    >
                      Patient List
                    </Button>
                    <Button 
                      onClick={() => router.push('/doctors')}
                      className="w-full justify-start"
                      variant="secondary"
                    >
                      Doctor Schedule
                    </Button>
                    <Button 
                      onClick={() => router.push('/reports')}
                      className="w-full justify-start"
                      variant="secondary"
                    >
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                {/* System Status */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>System Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">All systems operational</span>
                    </div>
                    <div className="flex items-center">
                      <ArrowTrendingUpIcon className="h-5 w-5 text-blue-500 mr-2" />
                      <span className="text-sm text-gray-600">Queue processing normally</span>
                    </div>
                    <div className="flex items-center">
                      <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mr-2" />
                      <span className="text-sm text-gray-600">2 appointments rescheduled</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
