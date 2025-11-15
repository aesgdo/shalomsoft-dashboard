import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request) {
  // cookies() es async en actions
  const cookieStore = await cookies();

  const session = cookieStore.get("session");

  // Si NO hay sesión → redirigir al login
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Si hay sesión → continuar
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Rutas protegidas
};
