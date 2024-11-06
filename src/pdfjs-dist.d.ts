declare module 'pdfjs-dist/build/pdf' {
    export function getDocument(url: string): any;
    export const GlobalWorkerOptions: {
        workerSrc: string;
    };
}
