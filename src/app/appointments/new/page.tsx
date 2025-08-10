'use client';

import Sidebar from '@/components/layout/Sidebar';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface AppointmentForm {
  patientId: string;
  doctorId: string;
  appointmentDate: string;
  appointmentTime: string;
  duration: number;
  notes: string;
  type: string;
}

export default function NewAppointment() {
  const router = useRouter();
  const [formData, setFormData] = useState<AppointmentForm>({
    patientId: '',
    doctorId: '',
    appointmentDate: '',
    appointmentTime: '',
    duration: 30,
    notes: '',
    type: 'consultation',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to the API
    console.log('Creating appointment:', formData);
    alert('Appointment created successfully!');
    router.push('/appointments');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">New Appointment</h1>
                <p className="text-sm text-gray-600">Schedule a new appointment for a patient</p>
              </div>
              <Button 
                onClick={() => router.push('/appointments')}
                variant="secondary"
              >
                Back to Appointments
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">
                        Patient
                      </label>
                      <select
                        id="patientId"
                        name="patientId"
                        value={formData.patientId}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select Patient</option>
                        <option value="1">John Doe</option>
                        <option value="2">Jane Smith</option>
                        <option value="3">Bob Wilson</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700">
                        Doctor
                      </label>
                      <select
                        id="doctorId"
                        name="doctorId"
                        value={formData.doctorId}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select Doctor</option>
                        <option value="1">Dr. Smith</option>
                        <option value="2">Dr. Johnson</option>
                        <option value="3">Dr. Brown</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">
                          Date
                        </label>
                        <input
                          type="date"
                          id="appointmentDate"
                          name="appointmentDate"
                          value={formData.appointmentDate}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-700">
                          Time
                        </label>
                        <input
                          type="time"
                          id="appointmentTime"
                          name="appointmentTime"
                          value={formData.appointmentTime}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                        Appointment Type
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="consultation">Consultation</option>
                        <option value="follow-up">Follow-up</option>
                        <option value="emergency">Emergency</option>
                        <option value="routine-checkup">Routine Checkup</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                        Notes
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Any special notes or requirements..."
                      />
                    </div>

                    <div className="flex justify-end space-x-3">
                      <Button
                        type="button"
                        onClick={() => router.push('/appointments')}
                        variant="secondary"
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        Schedule Appointment
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
