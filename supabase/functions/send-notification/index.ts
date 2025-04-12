
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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
    console.log(`New ${type} submission:`, record);
    
    // Email content formatting
    let subject, emailContent;
    
    if (type === "complaint") {
      subject = `New Complaint Submission: ${record.complaint_type}`;
      emailContent = `
        <h1>New Complaint Submission</h1>
        <p><strong>Name:</strong> ${record.name}</p>
        <p><strong>Email:</strong> ${record.email}</p>
        <p><strong>Location:</strong> ${record.location}</p>
        <p><strong>Complaint Type:</strong> ${record.complaint_type}</p>
        <p><strong>Description:</strong> ${record.description}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      `;
    } else if (type === "service_request") {
      subject = `New Service Request: ${record.service_type}`;
      emailContent = `
        <h1>New Service Request</h1>
        <p><strong>Service Type:</strong> ${record.service_type}</p>
        <p><strong>Name:</strong> ${record.name}</p>
        <p><strong>Email:</strong> ${record.email}</p>
        <p><strong>Phone:</strong> ${record.phone}</p>
        <p><strong>Address:</strong> ${record.address}</p>
        <p><strong>Request Date:</strong> ${record.request_date}</p>
        <p><strong>Description:</strong> ${record.description}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      `;
    }
    
    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: "Layanan Masyarakat <onboarding@resend.dev>",
      to: "vxsiorbest@gmail.com",
      subject: subject,
      html: emailContent,
    });

    console.log("Email sent successfully:", emailResponse);
    
    return new Response(
      JSON.stringify({ success: true, message: "Notification email sent" }),
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
