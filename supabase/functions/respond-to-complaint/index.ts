
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RespondRequest {
  complaintId: string;
  responseText: string;
  adminName: string;
}

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

    // Get request body
    const { complaintId, responseText, adminName } = await req.json() as RespondRequest;
    
    console.log(`Responding to complaint ${complaintId}`);
    
    // Insert response
    const { data: responseData, error: responseError } = await supabase
      .from('complaint_responses')
      .insert({
        complaint_id: complaintId,
        response_text: responseText,
        admin_name: adminName
      })
      .select()
      .single();
    
    if (responseError) {
      throw responseError;
    }
    
    // Update complaint status
    const { error: updateError } = await supabase
      .from('complaints')
      .update({ status: 'responded' })
      .eq('id', complaintId);
    
    if (updateError) {
      throw updateError;
    }
    
    // Send email notification (optional)
    try {
      // Fetch complaint details to get user email
      const { data: complaint } = await supabase
        .from('complaints')
        .select('email, name')
        .eq('id', complaintId)
        .single();
        
      if (complaint) {
        await fetch('https://odenbatdqohfxgjibkff.supabase.co/functions/v1/send-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseAnonKey}`
          },
          body: JSON.stringify({
            record: {
              name: complaint.name,
              email: complaint.email,
              subject: 'Balasan Pengaduan Anda',
              message: `Pengaduan Anda telah dibalas oleh ${adminName}:\n\n${responseText}`
            },
            type: 'complaint_response'
          })
        });
      }
    } catch (emailError) {
      // Log but don't fail if email notification fails
      console.error("Email notification error:", emailError);
    }
    
    return new Response(
      JSON.stringify({ data: responseData, success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error responding to complaint:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
