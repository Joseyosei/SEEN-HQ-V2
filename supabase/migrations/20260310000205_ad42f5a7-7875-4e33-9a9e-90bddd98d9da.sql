CREATE POLICY "Users can view own listings by email"
ON public.listings
FOR SELECT
TO authenticated
USING (email = (SELECT auth.jwt() ->> 'email'));