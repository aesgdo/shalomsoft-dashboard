"use client";

import { useState } from "react";
import { loginAction } from "./actions";

export default function LoginForm() {
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const target = e.target as HTMLFormElement;

    const formData = new FormData(target);
    const res = await loginAction(formData);

    if (res?.error) {
      setError(res.error);
      return;
    }

    // Login OK → redirigir
    // window.location.href = "/dashboard";
    // Usar redirect del servidor en lugar de window.location para mejor experiencia
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-5 min-h-[180px] items-center justify-center gap-3 w-full">
      <input name="user" placeholder="Usuario" required />
      <input name="password" type="password" placeholder="Contraseña" required />

      <button type="submit">Entrar</button>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
