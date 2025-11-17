import { prisma } from "@/lib/prisma";

/**
 * obtener todos los usuarios
 * @returns un array con todos los usuarios en la propiedad data
 */
export async function POST() {
  try {
    const loans = await prisma.loans.findMany();

    return Response.json({
      ok: true,
      data: loans
    });
  } catch (error) {
    return Response.json({
      ok: false,
      error: error.message
    });
  }
}