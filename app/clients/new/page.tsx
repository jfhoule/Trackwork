'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { formatPhoneNumber, generateClientNumber } from '@/lib/utils';

export default function NewClientPage() {
  const [phone, setPhone] = useState('');
  const [clientNumber, setClientNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getClientNumber = async () => {
      const number = await generateClientNumber();
      setClientNumber(number);
    };
    getClientNumber();
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const clientData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      contact_person: formData.get('contact') as string,
      company_name: formData.get('project') as string, // Using project as company name for now
      phone: phone,
      client_number: clientNumber,
    };

    try {
      const { data, error } = await supabase
        .from('clients')
        .insert([clientData])
        .select();

      if (error) {
        console.error('Error creating client:', error);
        alert('Error creating client. Please try again.');
      } else {
        console.log('Client created successfully:', data);
        // Force a hard navigation to refresh server-side data
        window.location.href = '/clients';
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Create Client</h1>
      <form className="space-y-4 max-w-md" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact">Contact Person</Label>
          <Input id="contact" name="contact" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="(123) 456-7890"
            required
            maxLength={14}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="project">Linked Project</Label>
          <Input id="project" name="project" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="clientNumber">Client Number</Label>
          <Input 
            id="clientNumber" 
            type="text" 
            value={clientNumber}
            readOnly
            className="bg-gray-50 cursor-not-allowed"
            title="Auto-generated client number"
          />
          <p className="text-xs text-gray-500">Auto-generated when creating client</p>
        </div>
        <div className="flex items-center gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
          <Link href="/clients" className="text-sm text-blue-600 underline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

