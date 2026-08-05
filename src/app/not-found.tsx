import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <h1 className="mt-4 text-4xl text-gold-bold font-bold">Oops!</h1>
      <p className="mt-4 text-slate-300">We don`t have such page!</p>
      <Link className="mt-4 text-gold-soft" href="/">
        Return Home
      </Link>
    </div>
  );
}
