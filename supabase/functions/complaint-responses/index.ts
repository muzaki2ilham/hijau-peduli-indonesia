
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") as string;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get complaint ID from URL
    const url = new URL(req.url);
    const complaintId = url.searchParams.get('complaintId');
    
    if (!complaintId) {
      throw new Error('Complaint ID is required');
    }
    
    console.log(`Fetching responses for complaint ${complaintId}`);
    
    // Fetch responses
    const { data, error } = await supabase
      .from('complaint_responses')
      .select('*')
      .eq('complaint_id', complaintId)
      .order('created_at', { ascending: true });
    
    if (error) {
      throw error;
    }
    
    return new Response(
      JSON.stringify({ data, success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error fetching complaint responses:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
