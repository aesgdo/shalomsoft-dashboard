export const runtime = "nodejs";

import {ShadCnLoginForm} from "./ShadCnLoginForm";

export default function LoginPage() {
  return (
    <section id="LoginPage" className="section section_login_page p-[40px] flex flex-col items-center justify-center min-h-[100dvh] justify-center">      
      <ShadCnLoginForm />
    </section>
  );
}
