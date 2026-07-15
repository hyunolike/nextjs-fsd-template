import { LoginForm } from "@/features/auth/login-form";
import { Card } from "@/shared/ui";

export default function LoginPage() {
  return (
    <Card className="flex w-full max-w-sm flex-col items-center">
      <h1 className="mb-6 text-lg font-semibold text-neutral-900">Sign in</h1>
      <LoginForm />
    </Card>
  );
}
