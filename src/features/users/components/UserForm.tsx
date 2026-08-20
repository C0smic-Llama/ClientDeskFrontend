import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import type {
  UserFormValues,
  UserResponse,
} from "../types/user.types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UserFormProps {
  initialData?: UserResponse;
  onSubmit: (data: UserFormValues) => Promise<void>;
  isSubmitting?: boolean;
  submitLabel?: string;
}

const emptyForm: UserFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  role: "STAFF",
};

export default function UserForm({
  initialData,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Create User",
}: UserFormProps) {
  const [formData, setFormData] = useState<UserFormValues>(emptyForm);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        email: initialData.email,
        phoneNumber: initialData.phoneNumber,
        password: "",
        role: initialData.role,
      });
    } else {
      setFormData(emptyForm);
    }
  }, [initialData]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setError("");

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong.",
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {initialData ? "Edit User" : "Create User"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium">
                First Name
              </label>

              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium">
                Last Name
              </label>

              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>

            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="off"
              value={formData.email}
              onChange={handleChange}
              placeholder="user@example.com"
              required
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="text-sm font-medium">
              Phone Number
            </label>

            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="10 digit phone number"
              maxLength={10}
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                placeholder={
                  initialData
                    ? "Enter new password"
                    : "Enter password"
                }
                required={!initialData}
                className="pr-10"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((current) => !current)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>

            <p className="text-xs text-muted-foreground">
              8–50 characters with uppercase, lowercase, number and
              special character.
            </p>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium">
              Role
            </label>

            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border bg-background px-3 text-sm"
              required
            >
              <option value="STAFF">Staff</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}