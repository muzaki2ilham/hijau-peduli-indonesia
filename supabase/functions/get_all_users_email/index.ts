
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
    console.log("[get_all_users_email] Function called");
    
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

    // Check if the user is authenticated
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()
    
    if (!user) {
      console.error("[get_all_users_email] Not authenticated");
      return new Response(
        JSON.stringify({ error: 'Not authenticated' }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
        }
      )
    }
    
    console.log("[get_all_users_email] User authenticated:", user.id);
    
    // Verify user has admin role
    const { data: roleData, error: roleError } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single()
    
    if (roleError || !roleData) {
      console.error("[get_all_users_email] Not authorized:", roleError);
      return new Response(
        JSON.stringify({ error: 'Not authorized', details: 'Admin role required' }), 
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 403,
        }
      )
    }

    console.log("[get_all_users_email] Admin access verified, fetching users...");
    
    // Get all users with their emails using admin.listUsers
    const { data: usersData, error: usersError } = await supabaseClient.auth.admin.listUsers({
      perPage: 1000, // Set a high limit to get all users
      page: 1
    });
    
    if (usersError) {
      console.error("[get_all_users_email] Error fetching users:", usersError);
      
      // Fallback to using profiles table if we can't get emails
      const { data: profiles, error: profilesError } = await supabaseClient
        .from('profiles')
        .select('id, username')
      
      if (profilesError || !profiles) {
        return new Response(
          JSON.stringify({ error: 'Failed to retrieve user data', details: usersError.message }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500,
          }
        )
      }
      
      // Return profile data without emails as fallback
      const profilesWithFallbackEmail: User[] = profiles.map(p => ({
        id: p.id,
        email: p.username || 'Email not available'
      }))
      
      return new Response(
        JSON.stringify(profilesWithFallbackEmail), 
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    if (!usersData || !usersData.users) {
      console.error("[get_all_users_email] No users data returned");
      return new Response(
        JSON.stringify({ error: "Failed to retrieve users data" }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      )
    }

    console.log(`[get_all_users_email] Retrieved ${usersData.users.length} users from auth`);

    // Return just the id and email for each user
    const usersWithEmail: User[] = usersData.users.map(u => ({
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
    console.error("[get_all_users_email] Function error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
