"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function loginAction(formData) {
  const user = formData.get("user");
  const password = formData.get("password");

  // Buscar usuario en la DB
  const found = await prisma.user.findUnique({
    where: { user },
  });

  if (!found) {
    return { error: "Usuario no encontrado" };
  }

  // Comparar contraseña enviada con la encriptada en la base de datos en 
  // formato hash
  const ok = await bcrypt.compare(password, found.password);
  if (!ok) {
    return { error: "Contraseña incorrecta" };
  }

  // Crear cookie de sesión (simple)
  cookies().set({
    name: "session",
    value: String(found.id),
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });

  return { success: true };
}
