"use client";

import { useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("customer");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log({
      name,
      email,
      password,
      role,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold-soft">
          Join Handcrafted Haven
        </p>

        <h2 className="mt-4 text-3xl font-semibold text-white">
          Create your account
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-300">
          Create an account as a customer or seller.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-slate-200">
          Full name
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
            placeholder="Your full name"
          />
        </label>

        <label className="block text-sm font-medium text-slate-200">
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
            placeholder="you@example.com"
          />
        </label>

        <label className="block text-sm font-medium text-slate-200">
          Account type
          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none"
          >
            <option value="customer">Customer</option>
            <option value="seller">Seller</option>
          </select>
        </label>

        <label className="block text-sm font-medium text-slate-200">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
            className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
            placeholder="Create a password"
          />
        </label>

        <label className="block text-sm font-medium text-slate-200">
          Confirm password
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            minLength={6}
            className="mt-2 w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
            placeholder="Confirm your password"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-3xl bg-gold-bold px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-gold-soft"
        >
          Create account
        </button>
      </form>
    </div>
  );
}
