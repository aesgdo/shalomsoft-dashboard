"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ExportButtons() {
  // imprimir
  const handlePrint = () => window.print();

  // exportar PDF
  const handlePDF = async () => {
    const table = document.getElementById("loansTable");
    const canvas = await html2canvas(table);
    const img = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(img, "PNG", 10, 10, 190, 0);
    pdf.save("prestamos.pdf");
  };

  // exportar imagen (para WhatsApp)
  const handleImage = async () => {
    const table = document.getElementById("loansTable");
    const canvas = await html2canvas(table);
    const img = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = img;
    link.download = "prestamos.png";
    link.click();
  };

  return (
    <div className="flex gap-3 mb-4">
      <button
        onClick={handlePrint}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Imprimir
      </button>

      <button
        onClick={handlePDF}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Exportar PDF
      </button>

      <button
        onClick={handleImage}
        className="px-4 py-2 bg-purple-600 text-white rounded"
      >
        Exportar Imagen
      </button>
    </div>
  );
}
