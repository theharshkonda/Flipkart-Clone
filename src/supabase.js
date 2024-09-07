import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://orfzzhbkiomdnsmtdaks.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yZnp6aGJraW9tZG5zbXRkYWtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM5NzAyNTcsImV4cCI6MjAzOTU0NjI1N30.mSdKTOeKRSBnZfgYiJRnm5nCzdCSFMT3BnO2rrd4Iok"
 );

export default supabase;
