"use client";

import jsPDF from "jspdf";

let html2canvas = null; // se carga dinámicamente para evitar SSR errors

async function getCanvasLib() {
  if (!html2canvas) {
    const mod = await import("html2canvas-pro"); // <--- librería correcta
    html2canvas = mod.default || mod;
  }
  return html2canvas;
}

/* ------------------------------
      EXPORTAR COMO IMAGEN
--------------------------------*/
export const exportAsImage = async (id) => {
  const element = document.getElementById(id);
  if (!element) {
    console.error("Elemento no encontrado:", id);
    return;
  }

  const html2canvas = await getCanvasLib();

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: null,
  });

  const dataUrl = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.download = "cliente.png";
  link.href = dataUrl;
  link.click();
};

/* ------------------------------
          EXPORTAR PDF
--------------------------------*/
export const exportAsPDF = async (id) => {
  const element = document.getElementById(id);
  if (!element) return;

  const html2canvas = await getCanvasLib();

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const width = pdf.internal.pageSize.getWidth();
  const height = (canvas.height * width) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, width, height);
  pdf.save("cliente.pdf");
};

export const printSection = (elementId) => {
  const content = document.getElementById(elementId);
  if (!content) return;

  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
      <head>
        <title>Imprimir</title>
        <style>
          body { font-family: Arial; padding: 20px; }
        </style>
      </head>
      <body>
        <h2>ShalomSoft Dashboard</h2>
        <p><b>Consulta de Prestamo</b></p>
        <button onclick="window.print();">Imprimir esta página</button>
        <button onclick="window.close();">Cerrar página</button>
        <main>${content.innerHTML}</main>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.print();
};
