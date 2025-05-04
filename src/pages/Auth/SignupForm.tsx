
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Key, ShieldCheck, User, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { signupSchema, SignupFormValues } from "./schemas";

interface SignupFormProps {
  onSubmit: (values: SignupFormValues) => void;
  loading: boolean;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}

const SignupForm = ({ onSubmit, loading, showPassword, togglePasswordVisibility }: SignupFormProps) => {
  const form = useForm<SignupFormValues>({
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

  // Watch isAdmin field to conditionally show admin token field
  const watchIsAdmin = form.watch("isAdmin");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
            control={form.control}
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
  );
};

export default SignupForm;
