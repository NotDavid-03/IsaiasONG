-- ==============================================================================
-- CASA ISAÍAS ONG - ESQUEMA DE BASE DE DATOS SUPABASE
-- "Tú eres mi Inspiración"
-- ==============================================================================

-- 1. TABLA DE DONACIONES (donations)
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_name TEXT NOT NULL,
    donor_email TEXT NOT NULL,
    donor_phone TEXT,
    amount NUMERIC(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    frequency VARCHAR(20) DEFAULT 'one_time', -- 'one_time' o 'monthly'
    program_id TEXT DEFAULT 'general',
    payment_method VARCHAR(50) NOT NULL, -- 'card', 'bank_transfer', 'paypal'
    message TEXT,
    is_anonymous BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'completed', -- 'pending', 'completed', 'failed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. TABLA DE SOLICITUDES DE VOLUNTARIADO (volunteers)
CREATE TABLE IF NOT EXISTS public.volunteers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT,
    area_of_interest TEXT NOT NULL,
    availability TEXT NOT NULL,
    profession TEXT,
    motivation TEXT,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'contacted', 'approved'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TABLA DE MENSAJES DE CONTACTO (contact_messages)
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'unread', -- 'unread', 'read', 'replied'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TABLA DE ACTIVIDADES Y EVENTOS (activities)
CREATE TABLE IF NOT EXISTS public.activities (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- 'nutricion', 'educacion', 'salud', 'comunidad'
    date_text TEXT NOT NULL,
    time_text TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    beneficiaries_count INTEGER DEFAULT 0,
    status TEXT DEFAULT 'upcoming', -- 'upcoming', 'ongoing', 'completed'
    volunteer_slots_total INTEGER DEFAULT 10,
    volunteer_slots_taken INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Políticas de Seguridad (Permitir inserción pública desde el formulario de la web)
CREATE POLICY "Permitir insercion publica de donaciones"
    ON public.donations FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Permitir insercion publica de voluntarios"
    ON public.volunteers FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Permitir insercion publica de mensajes de contacto"
    ON public.contact_messages FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Lectura publica de actividades"
    ON public.activities FOR SELECT
    USING (true);
