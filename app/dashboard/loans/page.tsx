import { prisma } from "@/lib/prisma";
import ExportButtons from "./export-buttons";

export default async function LoansPage() {
  const loans = await prisma.loans.findMany({
    include: { client: true },
    orderBy: { id: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Préstamos</h1>

      {/* botones de exportación */}
      <ExportButtons />

      <table
        id="loansTable"
        className="w-full border border-gray-300 mt-4 text-left"
      >
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Cliente</th>
            <th className="p-2 border">Monto</th>
            <th className="p-2 border">Estado</th>
            <th className="p-2 border">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              <td className="p-2 border">{loan.client.name}</td>
              <td className="p-2 border">${loan.amount}</td>
              <td className="p-2 border">{loan.status}</td>
              <td className="p-2 border">
                {new Date(loan.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
