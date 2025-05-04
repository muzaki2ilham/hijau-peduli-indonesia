
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, UserPlus } from "lucide-react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useAuth } from "./useAuth";
import { LoginFormValues, SignupFormValues } from "./schemas";

const Auth = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const {
    loading,
    showPassword,
    authMode,
    setAuthMode,
    handleLogin,
    handleSignup,
    togglePasswordVisibility,
  } = useAuth();

  const onSignup = async (values: SignupFormValues) => {
    const email = await handleSignup(values);
    if (email) {
      setLoginEmail(email);
    }
  };

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
              <LoginForm
                onSubmit={handleLogin}
                loading={loading}
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
                defaultEmail={loginEmail}
              />
            </TabsContent>

            {/* Sign Up Form */}
            <TabsContent value="signup">
              <SignupForm
                onSubmit={onSignup}
                loading={loading}
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
