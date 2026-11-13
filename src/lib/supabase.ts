import { createClient } from '@supabase/supabase-js';
import { DonationRecord, VolunteerApplication, ContactMessage } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://tu-proyecto.supabase.co'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper API for saving donations
export async function submitDonation(donation: DonationRecord): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('donations').insert([
        {
          donor_name: donation.donorName,
          donor_email: donation.donorEmail,
          donor_phone: donation.donorPhone || null,
          amount: donation.amount,
          currency: donation.currency,
          frequency: donation.frequency,
          program_id: donation.programId || 'general',
          payment_method: donation.paymentMethod,
          message: donation.message || null,
          is_anonymous: donation.isAnonymous || false,
          status: 'completed',
        },
      ]).select();

      if (error) throw error;
      return { success: true, data };
    }

    // Local fallback for offline/demo before connecting Supabase
    if (typeof window !== 'undefined') {
      const existing = JSON.parse(localStorage.getItem('isaias_donations') || '[]');
      existing.push({ ...donation, id: 'demo-' + Date.now(), createdAt: new Date().toISOString() });
      localStorage.setItem('isaias_donations', JSON.stringify(existing));
    }
    return { success: true, data: donation };
  } catch (err: any) {
    console.error('Error submitting donation:', err);
    return { success: false, error: err.message || 'Error al procesar la donación' };
  }
}

// Helper API for volunteer applications
export async function submitVolunteer(application: VolunteerApplication): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('volunteers').insert([
        {
          full_name: application.fullName,
          email: application.email,
          phone: application.phone,
          city: application.city,
          area_of_interest: application.areaOfInterest,
          availability: application.availability,
          profession: application.profession || null,
          motivation: application.motivation,
          status: 'pending',
        },
      ]).select();

      if (error) throw error;
      return { success: true, data };
    }

    // Local fallback
    if (typeof window !== 'undefined') {
      const existing = JSON.parse(localStorage.getItem('isaias_volunteers') || '[]');
      existing.push({ ...application, id: 'demo-' + Date.now(), createdAt: new Date().toISOString() });
      localStorage.setItem('isaias_volunteers', JSON.stringify(existing));
    }
    return { success: true, data: application };
  } catch (err: any) {
    console.error('Error submitting volunteer:', err);
    return { success: false, error: err.message || 'Error al registrar voluntariado' };
  }
}

// Helper API for contact messages
export async function submitContactMessage(message: ContactMessage): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('contact_messages').insert([
        {
          name: message.name,
          email: message.email,
          phone: message.phone || null,
          subject: message.subject,
          message: message.message,
          status: 'unread',
        },
      ]).select();

      if (error) throw error;
      return { success: true, data };
    }

    // Local fallback
    if (typeof window !== 'undefined') {
      const existing = JSON.parse(localStorage.getItem('isaias_messages') || '[]');
      existing.push({ ...message, id: 'demo-' + Date.now(), createdAt: new Date().toISOString() });
      localStorage.setItem('isaias_messages', JSON.stringify(existing));
    }
    return { success: true, data: message };
  } catch (err: any) {
    console.error('Error submitting contact message:', err);
    return { success: false, error: err.message || 'Error al enviar mensaje' };
  }
}
