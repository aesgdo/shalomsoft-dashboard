import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function DashboardPage() {

  const cookieStore = await cookies();

  const session = cookieStore.get("session");
  
  const id = Number(session?.value);
  //const id = 2;

  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, user: true, email: true },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      
      <h2 className="font-ubuntu text-blue-600 font-bold text-[24px] text-center">SHALOMSOFT - DASHBOARD</h2>
      <Image
        src="/assets/images/dashboard_init.png"
        alt="Logo dashboard"
        width={200}
        height={200}
      />
      <h1>Bienvenido, {user.name}</h1>
    </div>
  );
}
