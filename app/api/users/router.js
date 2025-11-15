import { prisma } from "@/lib/prisma";

/**
 * obtener todos los usuarios
 * @returns un array con todos los usuarios en la propiedad data
 */
export async function GET() {
  try {
    const users = await prisma.user.findMany();

    return Response.json({
      ok: true,
      data: users
    });
  } catch (error) {
    return Response.json({
      ok: false,
      error: error.message
    });
  }
}
