
import { useState, useEffect } from "react";
import { dummyUserProfiles } from "@/data/dummyUsers";

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  created_at: string;
}

export const useUserProfiles = () => {
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserProfiles = async () => {
    setLoading(true);
    // Simulasi loading
    setTimeout(() => {
      setUserProfiles(dummyUserProfiles);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  return {
    userProfiles,
    loading,
    fetchUserProfiles
  };
};
