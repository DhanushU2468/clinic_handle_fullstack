'use client';

import Sidebar from '@/components/layout/Sidebar';
import PatientForm from '@/components/patients/PatientForm';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface PatientFormData {
  name: string;
  contactInfo: string;
  age: number;
  gender: string;
}

export default function NewPatientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: PatientFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create patient');
      }

      const result = await response.json();
      console.log('Patient created:', result);
      
      // Redirect to patients list on success
      router.push('/patients');
    } catch (err) {
      console.error('Error creating patient:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center py-4">
              <Button
                onClick={() => router.push('/patients')}
                variant="ghost"
                className="mr-4"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to Patients
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Add New Patient</h1>
                <p className="text-sm text-gray-600">Create a new patient record</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Information</CardTitle>
                </CardHeader>
                <CardContent>
                  {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-800">{error}</p>
                    </div>
                  )}
                  
                  <PatientForm 
                    onSubmit={handleSubmit} 
                    loading={loading} 
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
