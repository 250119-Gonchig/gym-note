import LoginPageClient from "./LoginPageClient";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <LoginPageClient />
    </div>
  );
}