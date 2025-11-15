import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export default async function DashboardPage() {

  const cookieStore = await cookies();

  const session = cookieStore.get("session");
  
  const id = Number(session?.value);

  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, user: true, email: true },
  });

  return (
    <div>
      <h1>Bienvenido, {user.name}</h1>

      <a href="/logout">Cerrar sesión</a>
    </div>
  );
}
