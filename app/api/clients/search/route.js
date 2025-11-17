import { prisma } from "@/lib/prisma";

/**
 * obtener cliente por su dni
 * @returns un array con los datos del cliente en la propiedad data
 */
export async function POST(req) {
  try {
    const formData = await req.formData(); // ← Aquí capturas el FormData

    const dni = formData.get("dni");
    
    const clients = await prisma.clients.findFirst({
        where: { dni: dni },
        include: {
          loans: { 
            include: {
              details: {
                include: {
                  paymentDistributions: true // si quieres los pagos de los detalles de los préstamos
                }
              } 
            }       
          }
        },
    });

    if (!clients) {
      return Response.json({ error: "No hay resultados." }, { status: 200 });
    }

    // devuelve lo clientes encontrados
    return Response.json(clients);

  } catch (error) {
    return Response.json({ error: "Error interno" }, { status: 500 });
  }
}