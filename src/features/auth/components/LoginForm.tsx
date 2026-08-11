import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { authenticate } from "../api/authApi";
import { setAuth } from "../authStorage";
import type { User } from "../types/auth.types";

import { loginSchema, type LoginFormData } from "../schemas/loginSchema";
import { useAuth } from "../useAuth";

export function LoginForm() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoginError("");

      const response = await authenticate(data);

      const user: User = {
        id: response.userId,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        role: response.role,
      };

      login(response.accessToken, user);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      setLoginError("Invalid email or password.");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>

        <Input
          type="email"
          placeholder="admin@clientdesk.com"
          {...register("email")}
        />

        {errors.email && (
          <p className="text-sm text-clientdesk-red">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Password</label>

        <Input
          type="password"
          placeholder="Enter your password"
          {...register("password")}
        />

        {errors.password && (
          <p className="text-sm text-clientdesk-red">
            {errors.password.message}
          </p>
        )}
      </div>
      {loginError && (
        <p className="text-sm text-clientdesk-red">{loginError}</p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-clientdesk-red hover:bg-clientdesk-red/90"
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
