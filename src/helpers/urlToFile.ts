export async function urlToFile(url: string): Promise<File | null> {
    try {
      console.log(url)
      const response = await fetch(url);
   
      const blob = await response.blob();
      const fileName = url.substring(url.lastIndexOf('/') + 1);
      const file = new File([blob], fileName, { type: blob.type });
      return file;
    } catch (error) {
      console.error('Ошибка при преобразовании URL в файл:', error);
      return null;
    }
  }
  