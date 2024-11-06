export const downloadPDF = async (url: string, fileName: string) => {
    try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/pdf', // Убедитесь, что сервер возвращает PDF
          },
        });
  
        if (!response.ok) throw new Error("Ошибка при скачивании файла");
  
        // Преобразуем ответ в PDF Blob
        const blob = await response.blob();
  
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
  
        // Задаем имя файла с расширением .pdf
        link.download = fileName || 'downloaded-file.pdf';
        document.body.appendChild(link);
        link.click();
  
        // Чистим URL и удаляем временную ссылку
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error("Ошибка при скачивании файла:", error);
      }
    };