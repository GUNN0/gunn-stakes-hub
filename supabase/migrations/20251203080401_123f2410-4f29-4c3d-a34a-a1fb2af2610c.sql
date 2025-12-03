-- Add eligible_countries column to sweepstakes table
ALTER TABLE public.sweepstakes 
ADD COLUMN eligible_countries text[] DEFAULT ARRAY[]::text[];