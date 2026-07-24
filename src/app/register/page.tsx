import RegisterForm from "../../components/RegisterForm";
export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-md items-center">
        <div className="w-full rounded-[2rem] border border-white/10 bg-slate-950/80 p-8">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
