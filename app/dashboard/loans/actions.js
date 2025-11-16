"use server";

// esta accion de servidor verifica el usuario y contraseña
// y crea una cookie de sesion para luego redireccional a dashboard

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function loansAction(formData) {
  const client_id_or_dni = formData.get("clientId");
  

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
    return { error: "El Servicio no esta disponible. Contacte al administrador." };
  }

  // Redirigir a dashboard
  redirect("/dashboard");

}
