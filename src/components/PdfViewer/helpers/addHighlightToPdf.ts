import { PDFDocument } from "pdf-lib";

export const addHighlightToPdf = async (text: string) => {
   /*  try {
        const pdfBytes = await fetch(file).then(res => {
            if (!res.ok) {
                throw new Error("Failed to fetch PDF");
            }
            return res.arrayBuffer();
        });
        const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width, height } = firstPage.getSize();

        firstPage.drawRectangle({
            x: 50,
            y: height - 100,
            width: 200,
            height: 50,
            color: rgb(1, 1, 0),
            opacity: 0.5,
        });

        const modifiedPdfBytes = await pdfDoc.save();
        setAnnotatedPdf(modifiedPdfBytes);
    } catch (error) {
        console.error("Error processing PDF:", error);
    } */
};
