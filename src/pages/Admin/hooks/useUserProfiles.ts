
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "./types";

export const useUserProfiles = () => {
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserProfiles = useCallback(async () => {
    setLoading(true);
    try {
      console.log("Mengambil data profil pengguna...");
      
      // 1. Ambil semua profil
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) {
        console.error("Error mengambil profil:", profilesError);
        throw profilesError;
      }
      
      console.log("Profil diambil:", profiles?.length || 0);

      // 2. Ambil semua peran pengguna
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) {
        console.error("Error mengambil peran pengguna:", rolesError);
        throw rolesError;
      }
      
      console.log("Peran pengguna diambil:", roles?.length || 0);
      
      // Buat map untuk peran pengguna
      const rolesMap = new Map();
      roles?.forEach((role: any) => {
        rolesMap.set(role.user_id, role.role);
      });
      
      // 3. Ambil semua pengguna dari auth.users melalui admin API
      try {
        const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
        
        if (authError) {
          console.error("Error mengambil data auth users:", authError);
          throw authError;
        }
        
        console.log("Auth users diambil:", authUsers.users?.length || 0);
        
        // 4. Gabungkan semua data
        const combinedProfiles: UserProfile[] = authUsers.users.map((authUser: any) => {
          const profile = profiles?.find(p => p.id === authUser.id);
          
          return {
            id: authUser.id,
            username: profile?.username || authUser.email?.split('@')[0] || 'Pengguna Baru',
            email: authUser.email || 'Email tidak tersedia',
            role: rolesMap.get(authUser.id) || 'user',
            created_at: authUser.created_at || profile?.created_at || new Date().toISOString()
          };
        });

        console.log("Total profil gabungan:", combinedProfiles.length);
        setUserProfiles(combinedProfiles);
        
      } catch (authError: any) {
        console.error('Error dengan pengambilan auth users, menggunakan fallback:', authError.message || authError);
        
        // Fallback: gunakan hanya data profiles yang ada
        const fallbackProfiles: UserProfile[] = (profiles || []).map((profile: any) => {
          return {
            id: profile.id || '',
            username: profile.username || 'Tanpa nama',
            email: profile.username || 'Email tidak tersedia',
            role: rolesMap.get(profile.id) || 'user',
            created_at: profile.created_at || new Date().toISOString()
          };
        });
        
        setUserProfiles(fallbackProfiles);
      }
    } catch (error: any) {
      console.error('Error mengambil profil pengguna:', error.message || error);
      setUserProfiles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    userProfiles,
    loading,
    fetchUserProfiles
  };
};
