import React, { useState, useRef, useEffect } from 'react';

interface AutoResizeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const AutoResizeInput: React.FC<AutoResizeInputProps> = (props) => {
  const [inputWidth, setInputWidth] = useState<number>(1);
  const spanRef = useRef<HTMLSpanElement | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (spanRef.current) {
      spanRef.current.textContent = event.target.value || ' '; // Обновление текста для расчета ширины
      setInputWidth(spanRef.current.offsetWidth + 10); // Добавление отступа
    }
    if (props.onChange) {
      props.onChange(event); // Вызов оригинального обработчика onChange, если он передан
    }
  };

  useEffect(() => {
    // Начальное вычисление ширины на основе props.value или пустой строки
    if (spanRef.current) {
      spanRef.current.textContent = props.value as string || ' ';
      setInputWidth(spanRef.current.offsetWidth + 10);
    }
  }, [props.value]);

  return (
    <div style={{ display: 'inline-block', position: 'relative' }}>
      <input
        {...props}
        type="text"
        style={{ 
          width: inputWidth, 
          boxSizing: 'content-box', 
          fontSize: 'inherit', // Наследование стилей шрифта
          fontFamily: 'inherit',
          padding: '0', // Обнуление padding, чтобы расчет был точнее
          border: 'none', // Убрать рамку, если не нужна
          outline: 'none' // Убрать outline, если не нужен
        }}
        onChange={handleInputChange}
      />
      {/* Невидимый элемент для вычисления ширины */}
      <span
        ref={spanRef}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          whiteSpace: 'pre',
          fontSize: 'inherit', // Наследование стилей шрифта
          fontFamily: 'inherit',
          padding: '0', // Обнуление padding
          fontWeight: 'inherit', // Наследование font-weight
          fontStyle: 'inherit' // Наследование font-style
        }}
      />
    </div>
  );
};

export default AutoResizeInput;
