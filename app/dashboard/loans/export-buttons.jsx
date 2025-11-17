// export-buttons.jsx
"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image-more";

/**
 * Helper: aplica CSS temporal para forzar colores en RGB si hiciera falta.
 * Devuelve una función cleanup() que remueve el style.
 */
const applyRgbForce = () => {
  const css = `
    /* forzar colores y quitar filtros problemáticos que usan lab() */
    .export-safe, .export-safe * {
      color: rgb(0 0 0) !important;
      background: transparent !important;
      box-shadow: none !important;
      filter: none !important;
    }
    /* opcional: mejora legibilidad en PNG/PDF */
    .export-safe { background: white !important; padding: 8px; }
  `;
  const style = document.createElement("style");
  style.setAttribute("data-export-force", "true");
  style.innerHTML = css;
  document.head.appendChild(style);

  return () => {
    style.remove();
  };
};

/**
 * Exportar como PDF (usa dom-to-image para generar imagen y luego jsPDF para PDF)
 */
export const exportAsPDF = async (elementId, fileName = "cliente.pdf") => {
  const element = document.getElementById(elementId);
  if (!element) return;

  element.classList.add("export-safe");
  const cleanup = applyRgbForce();

  try {
    // generar imagen alta resolución
    const dataUrl = await domtoimage.toPng(element, {
      bgcolor: "#ffffff",
      quality: 1,
      cacheBust: true,
      width: element.scrollWidth * 2,
      height: element.scrollHeight * 2,
      style: {
        transform: "scale(1)",
        transformOrigin: "top left",
      },
    });

    // crear PDF y ajustar tamaño manteniendo ratio
    const pdf = new jsPDF("p", "mm", "a4");
    const img = new Image();
    img.src = dataUrl;
    await new Promise((res, rej) => {
      img.onload = res;
      img.onerror = rej;
    });

    const pxToMm = (px) => (px * 25.4) / 96; // aproximación: 96dpi
    const pageWidthMm = pdf.internal.pageSize.getWidth();
    const pageHeightMm = pdf.internal.pageSize.getHeight();

    const imgWidthMm = pxToMm(img.width);
    const imgHeightMm = pxToMm(img.height);
    const scale = Math.min(pageWidthMm / imgWidthMm, pageHeightMm / imgHeightMm);

    const drawWidth = imgWidthMm * scale;
    const drawHeight = imgHeightMm * scale;

    // centrar en la página
    const x = (pageWidthMm - drawWidth) / 2;
    const y = (pageHeightMm - drawHeight) / 2;

    pdf.addImage(dataUrl, "PNG", x, y, drawWidth, drawHeight);
    pdf.save(fileName);
  } catch (err) {
    console.error("exportAsPDF error:", err);
    alert("Error al generar PDF. Revisa la consola.");
  } finally {
    cleanup();
    element.classList.remove("export-safe");
  }
};


export const exportAsImage = async (id) => {
  const element = document.getElementById(id);
  const dataUrl = await domtoimage.toPng(element);

  const link = document.createElement("a");
  link.download = "cliente.png";
  link.href = dataUrl;
  link.click();
};

/* export const exportAsPDF = async (elementId, fileName = "cliente.pdf") => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, { scale: 2 });
  const img = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const width = pdf.internal.pageSize.getWidth();
  const height = (canvas.height * width) / canvas.width;

  pdf.addImage(img, "PNG", 0, 0, width, height);
  pdf.save(fileName);
} */;

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
      <body>${content.innerHTML}</body>
    </html>
  `);

  printWindow.document.close();
  printWindow.print();
};
