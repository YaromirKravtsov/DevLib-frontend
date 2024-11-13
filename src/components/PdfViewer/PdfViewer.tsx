import React, { FC, useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import styles from './PdfViewer.module.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
    file: string; // URL или путь к файлу PDF
}

interface HighlightedText {
    text: string;
    page: number;
    coordinates: DOMRect;
}

const PdfViewer: FC<PdfViewerProps> = ({ file }) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [highlightedTexts, setHighlightedTexts] = useState<HighlightedText[]>([]);
    const pageContainerRef = useRef<HTMLDivElement>(null);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setCurrentPage(1);
    };

    const goToNextPage = () => {
        if (currentPage < (numPages || 0)) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleTextSelection = () => {
        const selection = window.getSelection();
        if (selection && selection.toString()) {
            const selectedText = selection.toString();
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            // Get page container's position to calculate relative coordinates
            const pageContainerRect = pageContainerRef.current?.getBoundingClientRect();

            if (pageContainerRect) {
                setHighlightedTexts(prevTexts => [
                    ...prevTexts,
                    {
                        text: selectedText,
                        page: currentPage,
                        coordinates: {
                            top: rect.top - pageContainerRect.top,
                            left: rect.left - pageContainerRect.left,
                            width: rect.width,
                            height: rect.height,
                        } as DOMRect,
                    },
                ]);
            }

            selection.removeAllRanges();
        }
    };

    useEffect(() => {
        document.addEventListener('mouseup', handleTextSelection);
        return () => {
            document.removeEventListener('mouseup', handleTextSelection);
        };
    }, [currentPage]);

    return (
        <div className={styles.viewerContainer}>
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess} className={styles.document}>
                <div ref={pageContainerRef} className={styles.pageContainer}>
                    <Page pageNumber={currentPage} />
                    {highlightedTexts
                        .filter(highlight => highlight.page === currentPage)
                        .map((highlight, index) => (
                            <div
                                key={index}
                                style={{
                                    position: 'absolute',
                                    top: `${highlight.coordinates.top + 5}px`,
                                    left: `${highlight.coordinates.left + 420}px`,
                                    width: `${highlight.coordinates.width}px`,
                                    height: `${highlight.coordinates.height}px`,
                                    backgroundColor: 'rgba(255, 255, 0, 0.5)',
                                    pointerEvents: 'none',
                                }}
                            />
                        ))}
                </div>
            </Document>

            <div className={styles.navigation}>
                <button onClick={goToPreviousPage} disabled={currentPage <= 1}>
                    Назад
                </button>
                <span>Страница {currentPage} из {numPages}</span>
                <button onClick={goToNextPage} disabled={currentPage >= (numPages || 0)}>
                    Вперед
                </button>
            </div>
        </div>
    );
};

export default PdfViewer;
