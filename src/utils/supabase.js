import { createClient } from "@supabase/supabase-js";

// Ensure these environment variables are correctly set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Function to create a Supabase client with an access token
const supabaseClient = async (supabaseAccessToken) => {
  return createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${supabaseAccessToken}`,
      },
    },
  });
};

// Export `supabaseClient` as default
export default supabaseClient;

// If you also need `supabaseUrl` or `supabase`, you can export them as named exports:
export { supabase, supabaseUrl };
