
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Key, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { loginSchema, LoginFormValues } from "./schemas";

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
  loading: boolean;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  defaultEmail?: string;
}

const LoginForm = ({ 
  onSubmit, 
  loading, 
  showPassword, 
  togglePasswordVisibility,
  defaultEmail = ""
}: LoginFormProps) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: defaultEmail,
      password: "",
      isAdmin: false
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
  );
};

export default LoginForm;
