
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Mail, Key, UserPlus, LogIn, ShieldCheck, User, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Admin token for verification
const ADMIN_TOKEN = "270404";

// Form validation schemas
const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  isAdmin: z.boolean().default(false)
});

const signupSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  confirmPassword: z.string().min(6, "Password minimal 6 karakter"),
  name: z.string().min(2, "Nama minimal 2 karakter"),
  isAdmin: z.boolean().default(false),
  adminToken: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
}).refine(
  (data) => !data.isAdmin || (data.isAdmin && data.adminToken === ADMIN_TOKEN),
  {
    message: "Token admin tidak valid",
    path: ["adminToken"],
  }
);

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const Auth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  
  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      isAdmin: false
    }
  });
  
  // Sign up form
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      isAdmin: false,
      adminToken: ""
    }
  });

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
          if (values.adminToken !== ADMIN_TOKEN) {
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
        loginForm.setValue("email", values.email);
      }
    } catch (error: any) {
      toast({
        title: "Pendaftaran Gagal",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Watch isAdmin field to conditionally show admin token field
  const watchIsAdmin = signupForm.watch("isAdmin");

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-green-800">
            {authMode === "login" ? "Masuk Akun" : "Daftar Akun Baru"}
          </CardTitle>
          <CardDescription>
            {authMode === "login" 
              ? "Masuk sebagai Pengguna atau Admin" 
              : "Buat akun baru sebagai Pengguna atau Admin"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs 
            value={authMode} 
            onValueChange={(value) => setAuthMode(value as "login" | "signup")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger 
                value="login" 
                className="flex items-center gap-2"
              >
                <LogIn className="h-4 w-4" /> Masuk
              </TabsTrigger>
              <TabsTrigger 
                value="signup"
                className="flex items-center gap-2"
              >
                <UserPlus className="h-4 w-4" /> Daftar
              </TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                            <Mail className="h-4 w-4" />
                          </span>
                          <FormControl>
                            <Input
                              placeholder="email@contoh.com"
                              className="rounded-l-none"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <div className="relative flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                            <Key className="h-4 w-4" />
                          </span>
                          <FormControl>
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              className="rounded-l-none pr-10"
                              {...field}
                            />
                          </FormControl>
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={loginForm.control}
                    name="isAdmin"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="flex items-center gap-1">
                            <ShieldCheck className="h-4 w-4 text-green-600" />
                            Login sebagai Admin
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Memproses..." : "Masuk"}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            {/* Sign Up Form */}
            <TabsContent value="signup">
              <Form {...signupForm}>
                <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                  <FormField
                    control={signupForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Lengkap</FormLabel>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                            <User className="h-4 w-4" />
                          </span>
                          <FormControl>
                            <Input
                              placeholder="Nama Lengkap"
                              className="rounded-l-none"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                            <Mail className="h-4 w-4" />
                          </span>
                          <FormControl>
                            <Input
                              placeholder="email@contoh.com"
                              className="rounded-l-none"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <div className="relative flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                            <Key className="h-4 w-4" />
                          </span>
                          <FormControl>
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              className="rounded-l-none pr-10"
                              {...field}
                            />
                          </FormControl>
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Konfirmasi Password</FormLabel>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                            <Key className="h-4 w-4" />
                          </span>
                          <FormControl>
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Konfirmasi Password"
                              className="rounded-l-none"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="isAdmin"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="flex items-center gap-1">
                            <ShieldCheck className="h-4 w-4 text-green-600" />
                            Daftar sebagai Admin
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* Admin Token field only shown when isAdmin is checked */}
                  {watchIsAdmin && (
                    <FormField
                      control={signupForm.control}
                      name="adminToken"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            Token Admin
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Masukkan token admin"
                              {...field}
                              className="border-orange-300 focus:border-orange-500"
                            />
                          </FormControl>
                          <p className="text-xs text-orange-600 mt-1">
                            Diperlukan token khusus untuk pendaftaran admin
                          </p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Memproses..." : "Daftar"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
