

export default function ClientLoanCard({ data } : { data: any }) {

  console.log("ClientLoanCard data:", data);

  const totalCapitalAdeudado = data.loans?.reduce((acc:any, loan:any) => {

    const paidPrincipal = loan.details?.reduce((a:any, d:any) => {
      const dist = d.paymentDistributions?.[0];
      return a + (dist?.principalAmount || 0);
    }, 0);

    console.log(paidPrincipal);

    return acc + (loan.amount - paidPrincipal);
  }, 0);

  return (
    <div className="space-y-6 p-4">
      {/* CLIENTE */}
      <div className="bg-white shadow rounded-xl p-5 border">
        <h2 className="text-xl font-bold text-gray-800 mb-3">
          Información del Cliente
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <p><span className="font-semibold text-gray-700">Nombre:</span> {data.name}</p>
          <p><span className="font-semibold text-gray-700">DNI:</span> {data.dni}</p>
          <p><span className="font-semibold text-gray-700">Teléfono:</span> {data.phone}</p>
          <p><span className="font-semibold text-gray-700">Email:</span> {data.email}</p>
          <p className="md:col-span-2">
            <span className="font-semibold text-gray-700">Dirección:</span> {data.address}
          </p>
        </div>

        {/* CAPITAL ADEUDADO TOTAL */}
        <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-red-600 text-lg font-bold">
            Capital adeudado total: RD${" "}
            { totalCapitalAdeudado && totalCapitalAdeudado.toLocaleString("es-DO")}
          </p>
        </div>
      </div>


      {/* PRÉSTAMOS */}
      {data.loans?.map((loan:any) => {
        const paidPrincipal = loan.details?.reduce((a:any, d:any) => {
          const dist = d.paymentDistributions?.[0];
          return a + (dist?.principalAmount || 0);
        }, 0);

        const capitalAdeudado = loan.amount - paidPrincipal;

        return (
          <div
            key={loan.id}
            className="bg-white shadow rounded-xl p-5 border"
          >
            {/* Encabezado */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                Préstamo {loan.customId}
              </h3>

              <p className="text-red-600 font-semibold">
                Capital adeudado: RD${" "}
                {capitalAdeudado.toLocaleString("es-DO")}
              </p>
            </div>

            {/* Datos del préstamo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-4">
              <p><span className="font-semibold text-gray-700">Monto:</span> RD${loan.amount.toLocaleString("es-DO")}</p>
              <p><span className="font-semibold text-gray-700">Tasa anual:</span> {loan.ratesPerYear}%</p>
              <p><span className="font-semibold text-gray-700">Plazo:</span> {loan.term} meses</p>
              <p><span className="font-semibold text-gray-700">Frecuencia:</span> {loan.frequency}</p>
              <p><span className="font-semibold text-gray-700">Inicio:</span> {new Date(loan.startDate).toLocaleDateString()}</p>
              <p><span className="font-semibold text-gray-700">Fin:</span> {new Date(loan.endDate).toLocaleDateString()}</p>
              <p className="md:col-span-2"><span className="font-semibold text-gray-700">Prestamista:</span> {loan.lenderName}</p>
            </div>


            {/* DETALLES DE PAGOS */}
            <div className="mt-3">
              <h4 className="text-md font-bold text-gray-700 mb-2">
                Detalles de pagos
              </h4>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border">
                  <thead className="bg-gray-100">
                    <tr className="text-left">
                      <th className="p-2 border"># Cuota</th>
                      <th className="p-2 border">Monto pagado</th>
                      <th className="p-2 border">Capital</th>
                      <th className="p-2 border">Interés</th>
                      <th className="p-2 border">Fecha</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loan.details?.map((d:any) => {
                      const dist = d.paymentDistributions?.[0];

                      return (
                        <tr key={d.id} className="border">
                          <td className="p-2 border">{d.installment}</td>
                          <td className="p-2 border">
                            RD${d.amountPaid.toLocaleString("es-DO")}
                          </td>
                          <td className="p-2 border text-blue-700 font-medium">
                            RD${dist?.principalAmount.toLocaleString("es-DO")}
                          </td>
                          <td className="p-2 border">
                            RD${dist?.interestAmount.toLocaleString("es-DO")}
                          </td>
                          <td className="p-2 border">
                            {new Date(d.paymentDate).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}
