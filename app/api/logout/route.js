import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  
  cookieStore.delete("session");
  
  /* cookieStore.set("session", "", {
    httpOnly: true,
    secure: false,
    path: "/",
    maxAge: 0,
  }); */

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
