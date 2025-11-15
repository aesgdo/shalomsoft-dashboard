export const runtime = "nodejs";

import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <section id="LoginPage" className="section section_login_page p-[40px] flex flex-col min-h-[100dvh] justify-center">

      <div className="
            w-full 
            max-w-[400px] 
            flex 
            flex-col 
            items-center
            justify-center 
            mx-auto 
            bg-white 
            xdark:text-white 
            xdark:bg-zinc-700 
            p-[20px] 
            rounded-md 
            border-unset
        ">
        <h1 className="font-ubuntu font-bold text-[24px]">SHALOMSOFT</h1>
        <p>Consulta de Saldo</p>
        <LoginForm />
      </div>

    </section>
  );
}
