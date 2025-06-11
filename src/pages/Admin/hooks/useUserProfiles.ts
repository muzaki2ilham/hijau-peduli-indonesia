
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "./types";

export const useUserProfiles = () => {
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserProfiles = useCallback(async () => {
    setLoading(true);
    try {
      console.log("Mengambil data profil pengguna dari database...");
      
      // 1. Ambil semua profil dari database
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) {
        console.error("Error mengambil profil:", profilesError);
        throw profilesError;
      }
      
      console.log("Profil dari database:", profiles?.length || 0);

      // 2. Ambil semua peran pengguna dari database
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) {
        console.error("Error mengambil peran pengguna:", rolesError);
        throw rolesError;
      }
      
      console.log("Peran pengguna dari database:", roles?.length || 0);
      
      // Buat map untuk peran pengguna
      const rolesMap = new Map();
      roles?.forEach((role: any) => {
        rolesMap.set(role.user_id, role.role);
      });
      
      // 3. Coba ambil data auth users dari Supabase Auth
      try {
        const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
        
        if (authError) {
          console.error("Error mengambil auth users:", authError);
          // Gunakan fallback dengan data profil saja
          throw authError;
        }
        
        console.log("Auth users berhasil diambil:", authData.users?.length || 0);
        
        // 4. Gabungkan data auth dengan profil dan peran
        const combinedProfiles: UserProfile[] = authData.users.map((authUser: any) => {
          const profile = profiles?.find(p => p.id === authUser.id);
          
          return {
            id: authUser.id,
            username: profile?.username || authUser.email?.split('@')[0] || 'Pengguna Baru',
            email: authUser.email || 'Email tidak tersedia',
            role: rolesMap.get(authUser.id) || 'user',
            created_at: authUser.created_at || profile?.created_at || new Date().toISOString()
          };
        });

        console.log("Data pengguna berhasil digabungkan:", combinedProfiles.length);
        setUserProfiles(combinedProfiles);
        
      } catch (authError: any) {
        console.error('Menggunakan fallback data profil:', authError.message || authError);
        
        // Fallback: gunakan data profil yang ada di database
        const fallbackProfiles: UserProfile[] = (profiles || []).map((profile: any) => {
          return {
            id: profile.id || '',
            username: profile.username || 'Tanpa nama',
            email: profile.username || 'Email tidak tersedia',
            role: rolesMap.get(profile.id) || 'user',
            created_at: profile.created_at || new Date().toISOString()
          };
        });
        
        console.log("Menggunakan fallback data:", fallbackProfiles.length);
        setUserProfiles(fallbackProfiles);
      }
    } catch (error: any) {
      console.error('Error total mengambil profil pengguna:', error.message || error);
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
