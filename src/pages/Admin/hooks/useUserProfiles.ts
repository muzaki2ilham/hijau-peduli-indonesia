
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
        .select('*');

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
      
      // 3. Ambil email pengguna melalui fungsi edge
      try {
        // Panggil fungsi edge untuk mendapatkan email
        const { data: emailUsers, error: emailsError } = await supabase.functions.invoke('get_all_users_email');
        
        if (emailsError) {
          throw emailsError;
        }
        
        if (!emailUsers) {
          throw new Error('Tidak ada data email yang dikembalikan');
        }
        
        console.log("Email pengguna diambil:", emailUsers.length);
        
        // Buat map untuk email pengguna
        const emailsMap = new Map();
        emailUsers.forEach((user: {id: string, email: string}) => {
          emailsMap.set(user.id, user.email);
        });
        
        // 4. Gabungkan semua data
        const combinedProfiles: UserProfile[] = (profiles || []).map((profile: any) => {
          return {
            id: profile.id || '',
            username: profile.username || 'Tanpa nama',
            email: emailsMap.get(profile.id) || profile.email || profile.username || 'Email tidak tersedia',
            role: rolesMap.get(profile.id) || 'user',
            created_at: profile.created_at || new Date().toISOString()
          };
        });

        // 5. Cek apakah semua id dari emailUsers ada di profiles
        // Jika tidak, tambahkan pengguna yang tidak ada ke combinedProfiles
        emailUsers.forEach((user: {id: string, email: string}) => {
          const exists = combinedProfiles.some(profile => profile.id === user.id);
          if (!exists) {
            combinedProfiles.push({
              id: user.id,
              username: user.email.split('@')[0] || 'Pengguna Baru',
              email: user.email,
              role: rolesMap.get(user.id) || 'user',
              created_at: new Date().toISOString()
            });
          }
        });

        console.log("Total profil gabungan:", combinedProfiles.length);
        setUserProfiles(combinedProfiles);
      } catch (emailError: any) {
        console.error('Error dengan pengambilan email:', emailError.message || emailError);
        
        // Fallback untuk menampilkan profil tanpa email
        const fallbackProfiles: UserProfile[] = (profiles || []).map((profile: any) => {
          return {
            id: profile.id || '',
            username: profile.username || 'Tanpa nama',
            email: profile.email || profile.username || 'Email tidak tersedia',
            role: rolesMap.get(profile.id) || 'user',
            created_at: profile.created_at || new Date().toISOString()
          };
        });
        
        setUserProfiles(fallbackProfiles);
      }
    } catch (error: any) {
      console.error('Error mengambil profil pengguna:', error.message || error);
      // Set array kosong untuk mencegah error undefined
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
