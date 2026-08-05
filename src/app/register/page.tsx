import RegisterForm from "../../components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-md self-center rounded-[32px] border border-slate-200 bg-white p-10 shadow-2xl shadow-slate-200/50">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}