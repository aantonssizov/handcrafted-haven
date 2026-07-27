import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-md items-center">
        <div className="w-full rounded-4xl border border-slate-200 bg-slate-50 p-8">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
