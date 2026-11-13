export interface Activity {
  id: string;
  title: string;
  category: 'nutricion' | 'educacion' | 'salud' | 'comunidad';
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  beneficiariesCount: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  volunteerSlotsTotal: number;
  volunteerSlotsTaken: number;
}

export interface Program {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  color: 'cyan' | 'red' | 'yellow';
  metrics: string;
  image: string;
}

export interface DonationRecord {
  id?: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  amount: number;
  currency: string;
  frequency: 'one_time' | 'monthly';
  programId?: string;
  paymentMethod: 'card' | 'bank_transfer' | 'paypal';
  message?: string;
  isAnonymous?: boolean;
  status?: 'pending' | 'completed';
  createdAt?: string;
}

export interface VolunteerApplication {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  areaOfInterest: string;
  availability: string;
  profession?: string;
  motivation: string;
  status?: 'pending' | 'contacted' | 'approved';
  createdAt?: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status?: 'unread' | 'read' | 'replied';
  createdAt?: string;
}
