import { supabase } from './supabaseClient';

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export const formatPhoneNumber = (value: string) => {
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

export const generateClientNumber = async () => {
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
      return '001';
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
    return nextNumber.toString().padStart(3, '0');
  } catch (error) {
    console.error('Error generating client number:', error);
    return '001';
  }
};
