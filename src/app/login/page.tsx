import LoginForm from "@/components/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Handcrafted Haven account.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-12 sm:px-10">
        <div className="rounded-[32px] border border-slate-200 bg-white p-10 shadow-2xl shadow-slate-200/50">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
