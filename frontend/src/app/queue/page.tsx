'use client';

import Sidebar from '@/components/layout/Sidebar';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardSubtitle, CardTitle } from '@/components/ui/Card';
import { CheckIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface QueueItem {
  id: number;
  patientName: string;
  doctorName: string;
  appointmentTime: string;
  estimatedWait: string;
  status: 'waiting' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'normal' | 'urgent';
}

export default function QueuePage() {
  const router = useRouter();
  const [queue, setQueue] = useState<QueueItem[]>([
    { id: 1, patientName: 'John Doe', doctorName: 'Dr. Smith', appointmentTime: '10:30 AM', estimatedWait: '5 min', status: 'in-progress', priority: 'normal' },
    { id: 2, patientName: 'Jane Smith', doctorName: 'Dr. Johnson', appointmentTime: '11:00 AM', estimatedWait: '15 min', status: 'waiting', priority: 'urgent' },
    { id: 3, patientName: 'Bob Wilson', doctorName: 'Dr. Brown', appointmentTime: '11:30 AM', estimatedWait: '30 min', status: 'waiting', priority: 'normal' },
    { id: 4, patientName: 'Alice Brown', doctorName: 'Dr. Davis', appointmentTime: '12:00 PM', estimatedWait: '45 min', status: 'waiting', priority: 'normal' },
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case 'waiting':
  //       return 'bg-yellow-100 text-yellow-800';
  //     case 'in-progress':
  //       return 'bg-blue-100 text-blue-800';
  //     case 'completed':
  //       return 'bg-green-100 text-green-800';
  //     case 'cancelled':
  //       return 'bg-red-100 text-red-800';
  //     default:
  //       return 'bg-gray-100 text-gray-800';
  //   }
  // };

  const getPriorityColor = (priority: string) => {
    return priority === 'urgent' ? 'text-red-600 font-semibold' : 'text-gray-600';
  };

  const handleStatusChange = (id: number, newStatus: QueueItem['status']) => {
    setQueue(queue.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  const waitingCount = queue.filter(item => item.status === 'waiting').length;
  const inProgressCount = queue.filter(item => item.status === 'in-progress').length;
  const completedCount = queue.filter(item => item.status === 'completed').length;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Waiting Queue</h1>
                <p className="text-sm text-gray-600">Real-time patient queue management</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Current Time</p>
                <p className="text-lg font-semibold text-gray-900">
                  {currentTime.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {/* Queue Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <ClockIcon className="h-8 w-8 text-yellow-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-yellow-900">Waiting</p>
                      <p className="text-2xl font-bold text-yellow-600">{waitingCount}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <UserIcon className="h-8 w-8 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">In Progress</p>
                      <p className="text-2xl font-bold text-blue-600">{inProgressCount}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CheckIcon className="h-8 w-8 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-green-900">Completed</p>
                      <p className="text-2xl font-bold text-green-600">{completedCount}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Queue List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Queue */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Queue</CardTitle>
                  <CardSubtitle>Patients waiting to be seen</CardSubtitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {queue.filter(item => item.status !== 'completed').map((item, index) => (
                      <div key={item.id} className={`p-4 rounded-lg border-2 ${item.status === 'in-progress' ? 'border-blue-300 bg-blue-50' : 'border-gray-200'}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                              <span className="text-sm font-bold text-gray-600">{index + 1}</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{item.patientName}</p>
                              <p className="text-sm text-gray-600">{item.doctorName}</p>
                              <p className="text-xs text-gray-500">Appointment: {item.appointmentTime}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-sm ${getPriorityColor(item.priority)}`}>
                              {item.priority === 'urgent' ? 'URGENT' : 'Normal'}
                            </p>
                            <p className="text-sm text-gray-600">Wait: {item.estimatedWait}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex space-x-2">
                          {item.status === 'waiting' && (
                            <>
                              <Button 
                                size="sm"
                                onClick={() => handleStatusChange(item.id, 'in-progress')}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                Start
                              </Button>
                              <Button 
                                size="sm"
                                variant="secondary"
                                onClick={() => handleStatusChange(item.id, 'cancelled')}
                              >
                                Cancel
                              </Button>
                            </>
                          )}
                          {item.status === 'in-progress' && (
                            <>
                              <Button 
                                size="sm"
                                onClick={() => handleStatusChange(item.id, 'completed')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Complete
                              </Button>
                              <Button 
                                size="sm"
                                variant="secondary"
                                onClick={() => handleStatusChange(item.id, 'waiting')}
                              >
                                Pause
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Queue Management */}
              <Card>
                <CardHeader>
                  <CardTitle>Queue Management</CardTitle>
                  <CardSubtitle>Control and monitor the queue</CardSubtitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Average Wait Time</h4>
                      <p className="text-2xl font-bold text-gray-900">18 minutes</p>
                      <p className="text-sm text-gray-600">Based on last 10 patients</p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Peak Hours</h4>
                      <p className="text-sm text-gray-600">10:00 AM - 12:00 PM</p>
                      <p className="text-sm text-gray-600">2:00 PM - 4:00 PM</p>
                    </div>

                    <div className="space-y-2">
                      <Button 
                        onClick={() => router.push('/appointments/new')}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        Add Walk-in Patient
                      </Button>
                      <Button 
                        variant="secondary"
                        className="w-full"
                      >
                        View Queue History
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
