import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-clientdesk-light/30 p-6">
      <div className="w-full max-w-md rounded-2xl border border-clientdesk-light bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            ClientDesk
          </h1>

          <p className="mt-2 text-sm text-clientdesk-gray">
            Sign in to your account
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}