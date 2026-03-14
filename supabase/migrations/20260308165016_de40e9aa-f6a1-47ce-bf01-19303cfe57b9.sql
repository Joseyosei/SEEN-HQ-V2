
-- Listings table for paid submissions
CREATE TABLE public.listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  category text NOT NULL,
  package text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  location text,
  description text NOT NULL,
  selling_points text[],
  website text,
  notes text,
  stripe_session_id text,
  stripe_payment_status text DEFAULT 'pending',
  status text DEFAULT 'pending'
);

ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Listings are insertable by anyone" ON public.listings
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Listings viewable by authenticated" ON public.listings
  FOR SELECT TO authenticated USING (true);

-- Contact submissions for lead capture
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new'
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Contact submissions insertable by anyone" ON public.contact_submissions
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Contact submissions viewable by authenticated" ON public.contact_submissions
  FOR SELECT TO authenticated USING (true);
