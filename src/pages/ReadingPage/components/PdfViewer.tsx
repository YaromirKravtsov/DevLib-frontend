/* 
import React from 'react';

const PdfViewer = ({ pdfUrl }: { pdfUrl: string }) => {
    if (!pdfUrl) {
        
    }

    return (
        <iframe
            src={pdfUrl}
            style={{ width: '100%', height: '600px' }}
            title="PDF Viewer"
            frameBorder="0"
        />
    );
};

export default PdfViewer;
 *//* 

import React, { useEffect, useState, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist/webpack';

// Определяем тип пропсов
interface CustomPdfViewerProps {
  fileUrl: string;
}

// Определяем типы состояний
const CustomPdfViewer: React.FC<CustomPdfViewerProps> = ({ fileUrl }) => {
  const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const loadPdf = async () => {
      const loadingTask = pdfjsLib.getDocument(fileUrl);
      const pdf = await loadingTask.promise;
      setPdf(pdf);
      setTotalPages(pdf.numPages);
    };

    loadPdf();
  }, [fileUrl]);

  useEffect(() => {
    if (pdf) {
      const renderPage = async () => {
        const currentPage = await pdf.getPage(page);
        const viewport = currentPage.getViewport({ scale: 1.5 });
        const canvas = canvasRef.current;

        if (canvas) {
          const context = canvas.getContext('2d');
          if (context) {
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };
            await currentPage.render(renderContext).promise;
          }
        }
      };
      renderPage();
    }
  }, [pdf, page]);

  const goToPrevPage = () => setPage(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setPage(prev => Math.min(prev + 1, totalPages));

  return (
    <div>
      <canvas ref={canvasRef} />
      <div>
        <button onClick={goToPrevPage} disabled={page <= 1}>
          Предыдущая
        </button>
        <button onClick={goToNextPage} disabled={page >= totalPages}>
          Следующая
        </button>
      </div>
      <p>
        Страница {page} из {totalPages}
      </p>
    </div>
  );
};

export default CustomPdfViewer;
 */

import React, { FC } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
/* import ssd from '../../../../node_modules/pdfjs-dist/build/pdf.worker.mjs' */
// Устанавливаем путь к воркеру
pdfjs.GlobalWorkerOptions.workerSrc = `../../../../node_modules/pdfjs-dist/build/pdf.worker.mjs`;
interface SimplePdfViewer{
    fileUrl: string
}
const SimplePdfViewer:FC<SimplePdfViewer> = ({ fileUrl }) => {
  return (
    <div>
       {fileUrl}
      <Document file={fileUrl}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default SimplePdfViewer;
