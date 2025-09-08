'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function NewClientPage() {
  const [phone, setPhone] = useState('');
  const [clientNumber, setClientNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Generate sequential client number when component mounts
  useEffect(() => {
    const generateSequentialClientNumber = async () => {
      try {
        // Get the highest existing client number
        const { data: existingClients, error } = await supabase
          .from('clients')
          .select('client_number')
          .order('client_number', { ascending: false })
          .limit(1);

        if (error) {
          console.error('Error fetching client numbers:', error);
          // Fallback to 001 if there's an error
          setClientNumber('001');
          return;
        }

        let nextNumber = 1;
        if (existingClients && existingClients.length > 0) {
          const lastClientNumber = existingClients[0].client_number;
          if (lastClientNumber) {
            // Extract the number and increment
            const lastNumber = parseInt(lastClientNumber, 10);
            nextNumber = lastNumber + 1;
          }
        }

        // Format as 3-digit string with leading zeros (001, 002, etc.)
        const formattedNumber = nextNumber.toString().padStart(3, '0');
        setClientNumber(formattedNumber);
      } catch (error) {
        console.error('Error generating client number:', error);
        setClientNumber('001');
      }
    };

    generateSequentialClientNumber();
  }, []);

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, '');
    
    // Format as (xxx) xxx-xxxx
    if (phoneNumber.length <= 3) {
      return phoneNumber;
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
  };

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

