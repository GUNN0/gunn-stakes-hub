-- Create sweepstakes table
CREATE TABLE public.sweepstakes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo text NOT NULL,
  reward text NOT NULL,
  category text NOT NULL,
  aff_link text NOT NULL,
  end_date date,
  custom_instructions text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.sweepstakes ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read sweepstakes (public site)
CREATE POLICY "Anyone can view sweepstakes"
ON public.sweepstakes
FOR SELECT
USING (true);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_sweepstakes_updated_at
BEFORE UPDATE ON public.sweepstakes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.sweepstakes (name, logo, reward, category, aff_link, end_date, custom_instructions) VALUES
('$10,000 Cash Giveaway', 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=100&h=100&fit=crop', '$10,000 Cash', 'Cash Prizes', 'https://example.com/sweepstakes1', '2025-12-31', 'Enter daily for more chances to win!'),
('iPhone 15 Pro Max', 'https://images.unsplash.com/photo-1592286927505-53d47e40e4c9?w=100&h=100&fit=crop', 'Latest iPhone', 'Tech & Gadgets', 'https://example.com/sweepstakes2', '2026-01-15', 'No purchase necessary. Share with friends for bonus entries.'),
('Dream Vacation to Bali', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=100&h=100&fit=crop', 'All-Expense Paid Trip', 'Travel & Vacation', 'https://example.com/sweepstakes3', '2026-02-01', 'Includes flights, hotel, and spending money!'),
('$5,000 Shopping Spree', 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=100&h=100&fit=crop', '$5,000 Gift Card', 'Shopping Spree', 'https://example.com/sweepstakes4', '2025-12-25', 'Use at any major retailer. Perfect for holiday shopping!'),
('Tesla Model 3 Giveaway', 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=100&h=100&fit=crop', 'Brand New Tesla', 'Automotive', 'https://example.com/sweepstakes5', '2026-03-01', 'Fully loaded with premium features. Must have valid driver''s license.'),
('MacBook Pro M3', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop', 'Latest MacBook Pro', 'Tech & Gadgets', 'https://example.com/sweepstakes6', '2026-01-20', 'Latest model with maximum specs. Perfect for creators!'),
('$25,000 Grand Prize', 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=100&h=100&fit=crop', '$25,000 Cash', 'Cash Prizes', 'https://example.com/sweepstakes7', '2026-04-01', 'Our biggest prize yet! Multiple entry methods available.'),
('Mediterranean Cruise', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=100&h=100&fit=crop', '7-Day Luxury Cruise', 'Travel & Vacation', 'https://example.com/sweepstakes8', '2026-02-14', 'All-inclusive luxury cruise for two. Must be 21+.'),
('PlayStation 5 Bundle', 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=100&h=100&fit=crop', 'PS5 + Games', 'Tech & Gadgets', 'https://example.com/sweepstakes9', '2026-01-10', 'Includes console, extra controller, and 3 top games!');