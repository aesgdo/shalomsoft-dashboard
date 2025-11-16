"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function logOutAction() {
  
    const cookieStore = await cookies();

    cookieStore.delete("session");

    // Redirigir a dashboard
    redirect("/login");

}
