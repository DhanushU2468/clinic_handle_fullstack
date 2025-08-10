'use client';

import Button from '@/components/ui/Button';
import React, { useState } from 'react';

interface PatientFormData {
  name: string;
  contactInfo: string;
  age: number;
  gender: string;
}

interface PatientFormProps {
  onSubmit: (data: PatientFormData) => Promise<void>;
  loading: boolean;
}

export default function PatientForm({ onSubmit, loading }: PatientFormProps) {
  const [formData, setFormData] = useState<PatientFormData>({
    name: '',
    contactInfo: '',
    age: 0,
    gender: 'Male',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PatientFormData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof PatientFormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.contactInfo.trim()) newErrors.contactInfo = 'Contact information is required';
    if (!formData.age || formData.age <= 0) newErrors.age = 'Age must be greater than 0';
    if (!formData.gender) newErrors.gender = 'Gender is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? Number(value) : value,
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter patient name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-1">Contact Info *</label>
          <input
            id="contactInfo"
            name="contactInfo"
            type="text"
            value={formData.contactInfo}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${errors.contactInfo ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter contact information"
          />
          {errors.contactInfo && <p className="text-red-500 text-sm mt-1">{errors.contactInfo}</p>}
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
          <input
            id="age"
            name="age"
            type="number"
            min="1"
            max="120"
            value={formData.age}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="25"
          />
          {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 mt-6">
        {loading ? 'Adding...' : 'Add Patient'}
      </Button>
    </form>
  );
}
