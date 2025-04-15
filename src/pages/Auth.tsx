
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Mail, Key, UserPlus, LogIn, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const checkUserRole = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .single();

    if (error) return false;
    return !!data;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const isAdmin = await checkUserRole(data.user.id);
        
        if (isAdminLogin && !isAdmin) {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-green-800">
            Akses Pengguna
          </CardTitle>
          <CardDescription>
            Masuk sebagai Pengguna atau Admin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="user" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger 
                value="user" 
                onClick={() => setIsAdminLogin(false)}
                className="flex items-center gap-2"
              >
                <LogIn className="h-4 w-4" /> Pengguna
              </TabsTrigger>
              <TabsTrigger 
                value="admin" 
                onClick={() => setIsAdminLogin(true)}
                className="flex items-center gap-2"
              >
                <ShieldCheck className="h-4 w-4" /> Admin
              </TabsTrigger>
            </TabsList>

            <TabsContent value={isAdminLogin ? "admin" : "user"}>
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="login-email" className="text-sm font-medium">Email</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      <Mail className="h-4 w-4" />
                    </span>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="email@contoh.com"
                      className="rounded-l-none"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="login-password" className="text-sm font-medium">Password</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      <Key className="h-4 w-4" />
                    </span>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Password"
                      className="rounded-l-none"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Memproses..." : (isAdminLogin ? "Login Admin" : "Masuk")}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
