-- Create a table for donated items (public, no user auth required for this demo)
CREATE TABLE public.donated_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  condition TEXT NOT NULL,
  location TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.donated_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no auth required for this donation platform)
CREATE POLICY "Anyone can view donated items" 
ON public.donated_items 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create donated items" 
ON public.donated_items 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can delete donated items" 
ON public.donated_items 
FOR DELETE 
USING (true);

-- Enable realtime for cross-device sync
ALTER PUBLICATION supabase_realtime ADD TABLE public.donated_items;