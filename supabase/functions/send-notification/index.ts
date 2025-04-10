
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { record, type } = await req.json();
    
    // For now we're just logging the data, but this would be where you send an email
    // to vxsiorbest@gmail.com with the form submission details
    console.log(`New ${type} submission:`, record);
    console.log(`Email would be sent to: vxsiorbest@gmail.com`);
    
    // This is where you would integrate an email service like SendGrid or Resend
    // For example, with a service like Resend:
    // const emailResponse = await resend.emails.send({
    //   from: "noreply@yourdomain.com",
    //   to: "vxsiorbest@gmail.com",
    //   subject: `New ${type} Submission`,
    //   html: `<p>You have received a new ${type} submission:</p>
    //          <p>Name: ${record.name}</p>
    //          <p>Email: ${record.email}</p>
    //          <p>Details: ${record.description}</p>`
    // });

    return new Response(
      JSON.stringify({ success: true, message: "Notification logged" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in send-notification function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
