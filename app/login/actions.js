"use server";

// esta accion de servidor verifica el usuario y contraseña
// y crea una cookie de sesion para luego redireccional a dashboard

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function loginAction(formData) {
  const user = formData.get("user");
  const password = formData.get("password");

  try {
    // Buscar usuario en la DB
    const found = await prisma.user.findUnique({
      where: { user },
    });

    if (!found) {
      return { error: "Usuario o contraseña incorrecta" };
    }

    
    // Comparar contraseña enviada con la encriptada en la base de datos en 
    // formato hash
    const ok = await bcrypt.compare(password, found.password);
    if (!ok) {
      return { error: "Usuario o contraseña incorrecta" };
    }

    // cookies() es async en actions
    const cookieStore = await cookies();
    // Crear cookie
    cookieStore.set("session", String(found.id), {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 días
    });
    
    //return { success: true };

    
  } catch (error) {
    return { error: error.message };
  }

  // Redirigir a dashboard
  redirect("/dashboard");

}
