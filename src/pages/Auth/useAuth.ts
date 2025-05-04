
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LoginFormValues, SignupFormValues } from "./schemas";

export const useAuth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const checkUserRole = async (userId: string) => {
    const { data: roleData } = await supabase
      .rpc('user_has_role', {
        _user_id: userId,
        _role: 'admin'
      });
    return !!roleData;
  };

  const handleLogin = async (values: LoginFormValues) => {
    setLoading(true);

    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      if (data.user) {
        const isAdmin = await checkUserRole(data.user.id);
        
        if (values.isAdmin && !isAdmin) {
          await supabase.auth.signOut();
          throw new Error("Akses ditolak. Anda bukan admin.");
        }

        if (isAdmin) {
          navigate("/admin/dashboard");
          toast({
            title: "Login Admin Berhasil",
            description: `Selamat datang, Admin ${data.user.email}!`,
          });
        } else {
          navigate("/profile");
          toast({
            title: "Login Berhasil",
            description: `Selamat datang, ${data.user.email}!`,
          });
        }
      }
    } catch (error: any) {
      toast({
        title: "Login Gagal",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (values: SignupFormValues) => {
    setLoading(true);
    
    try {
      // Create user account
      const { error, data } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.name,
          }
        }
      });

      if (error) throw error;
      
      if (data.user) {
        // If signup is for admin, verify token and assign admin role
        if (values.isAdmin) {
          if (values.adminToken !== "270404") {
            throw new Error("Token admin tidak valid");
          }
          
          const { error: roleError } = await supabase
            .from('user_roles')
            .insert([
              { user_id: data.user.id, role: 'admin' }
            ]);

          if (roleError) throw roleError;
        }

        toast({
          title: "Pendaftaran Berhasil",
          description: values.isAdmin 
            ? "Akun admin berhasil dibuat! Silahkan login." 
            : "Akun berhasil dibuat! Silahkan login.",
        });
        
        // Switch to login mode
        setAuthMode("login");
        return values.email; // Return email to populate login form
      }
      return null;
    } catch (error: any) {
      toast({
        title: "Pendaftaran Gagal",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return {
    loading,
    showPassword,
    authMode,
    setAuthMode,
    handleLogin,
    handleSignup,
    togglePasswordVisibility,
  };
};
