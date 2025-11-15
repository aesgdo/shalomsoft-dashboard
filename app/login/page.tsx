export const runtime = "nodejs";

import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="p-[40px]">
      <h1>Iniciar sesión</h1>
      <LoginForm />
    </div>
  );
}
