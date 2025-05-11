
// This edge function safely retrieves emails for all users
// Only accessible by admin users through RLS
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.43.1'

interface User {
  id: string;
  email: string;
}

serve(async (req) => {
  // Add CORS headers for browser clients
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { 
        global: { 
          headers: { 
            Authorization: req.headers.get('Authorization')! 
          } 
        } 
      }
    )

    // Check if the user is an admin
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()
    
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Not authenticated' }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      )
    }
    
    // Verify user has admin role
    const { data: roleData, error: roleError } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single()
    
    if (roleError || !roleData) {
      return new Response(
        JSON.stringify({ error: 'Not authorized' }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 403,
        }
      )
    }

    console.log("Admin access verified, fetching users...");
    
    // Get all users with their emails using service role
    const { data: users, error: usersError } = await supabaseClient.auth.admin.listUsers()
    
    if (usersError) {
      console.error("Error fetching users:", usersError);
      throw usersError
    }

    console.log(`Retrieved ${users?.users?.length || 0} users`);

    // Return just the id and email for each user
    const usersWithEmail: User[] = users.users.map(u => ({
      id: u.id,
      email: u.email || ''
    }))

    return new Response(
      JSON.stringify(usersWithEmail), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error("Function error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
