"use client";

import {
  exportAsImage,
  exportAsPDF,
  printSection,
} from "./export-buttons";

import { useEffect, useState } from "react";

export default function ClientCard({ data } : { data: any }) {

    const [loan, setLoan] = useState<any>(null);
    const [detail, setDetail] = useState<any>(null);
    const [distribution, setDistribution] = useState<any>(null);
    const [adeudado, setAdeudado] = useState<number>(0);

    useEffect(() => {
        const adeudado = extractLoanData(data);
        setAdeudado(adeudado);
    }, [data]);

    const extractLoanData = (data: any) => {
        
        if (data.loans && data.loans.length > 0) {
            const loan = data.loans[0];
            setLoan(loan);
            const detail = loan?.details?.[0];
            setDetail(detail);
            const distribution = detail?.paymentDistributions?.[0];
            setDistribution(distribution);
        
            const adeudado = loan.amount - (distribution?.principalAmount ?? 0);
            
            return adeudado;
        }
        return 0;
    };


  return (
    <>
        { loan ? (
        <div className="w-full max-w-3xl mx-auto">

        {/* --- Botones de exportación --- */}
        <div className="flex gap-3 justify-end mb-4">
            <button
            onClick={() => exportAsPDF("client-info-card")}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
            Exportar PDF
            </button>

            <button
            onClick={() => exportAsImage("client-info-card")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
            Exportar Imagen
            </button>

            <button
            onClick={() => printSection("client-info-card")}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
            >
            Imprimir
            </button>
        </div>

        {/* --- Tarjeta principal --- */}
        <div
            id="client-info-card"
            className="bg-white shadow-md rounded-xl p-6 border border-gray-200 space-y-6"
        >
            {/* Información del cliente */}
            <div>
            <h2 className="text-xl font-bold mb-2 text-gray-900">
                Información del Cliente
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <p><span className="font-semibold">Nombre:</span> {data.name}</p>
                <p><span className="font-semibold">DNI:</span> {data.dni}</p>
                <p><span className="font-semibold">Email:</span> {data.email}</p>
                <p><span className="font-semibold">Teléfono:</span> {data.phone}</p>
                <p className="sm:col-span-2">
                <span className="font-semibold">Dirección:</span> {data.address}
                </p>
            </div>
            </div>

            {/* Información del préstamo */}
            {loan && (
            <div>
                <h2 className="text-xl font-bold mt-6 mb-3 text-gray-900">
                Detalles del Préstamo
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <p><span className="font-semibold">Código:</span> {loan.customId}</p>
                <p><span className="font-semibold">Banco:</span> {loan.lenderName}</p>
                <p><span className="font-semibold">Monto:</span> RD$ {loan.amount.toLocaleString()}</p>
                <p><span className="font-semibold">Tasa anual:</span> {loan.ratesPerYear}%</p>
                <p><span className="font-semibold">Plazo:</span> {loan.term} meses</p>
                <p><span className="font-semibold">Frecuencia:</span> {loan.frequency}</p>
                </div>

                {/* Capital adeudado resaltado */}
                <div className="mt-4 p-4 bg-red-50 border border-red-300 rounded-lg">
                <p className="text-lg font-bold text-red-700">
                    CAPITAL ADEUDADO: RD$ {adeudado.toLocaleString()}
                </p>
                </div>
            </div>
            )}

            {/* Último pago */}
            {detail && (
            <div>
                <h2 className="text-xl font-bold mt-6 mb-3 text-gray-900">
                Último Pago
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <p><span className="font-semibold">Cuota:</span> {detail.installment}</p>
                <p><span className="font-semibold">Pagado:</span> RD$ {detail.amountPaid.toLocaleString()}</p>
                <p><span className="font-semibold">Fecha:</span> {new Date(detail.paymentDate).toLocaleDateString()}</p>

                {distribution && (
                    <>
                    <p><span className="font-semibold">Capital:</span> RD$ {distribution.principalAmount.toLocaleString()}</p>
                    <p><span className="font-semibold">Interés:</span> RD$ {distribution.interestAmount.toLocaleString()}</p>
                    </>
                )}
                </div>
            </div>
            )}
        </div>
        </div> ) : null }
    </>
  );
}
