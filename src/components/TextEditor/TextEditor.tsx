import React, { FC, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Подключаем стили для Quill
import styles from './TextEditor.module.css'
interface TextEditorProps{
    className: string;
    setValue: (value: string) => void;
    value: string
}
const TextEditor:FC<TextEditorProps> = ({className, setValue, value}) => {
/*   const [value, setValue] = useState(''); */

  const modules = {
    toolbar: [
      [{ 'font': [] }, { 'size': [] }],
      ['bold', 'italic', 'underline', 'strike'],        // Форматирование текста
      [{ 'color': [] }, { 'background': [] }],          // Цвет текста и фона
      [{ 'script': 'sub'}, { 'script': 'super' }],      // Верхний и нижний индекс
      [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block'],  // Заголовки и блок кода
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],      // Списки
      [{ 'align': [] }],           
      ['clean']                                         // Кнопка очистки форматирования
    ],
  };
  
  return (
    <div>
      <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={setValue} 
        modules={modules}
        placeholder="Напишіть свої думки!" 
        className={`${className} custom-text ${styles.editor}`}
      />
    </div>
  );
};

export default TextEditor;
