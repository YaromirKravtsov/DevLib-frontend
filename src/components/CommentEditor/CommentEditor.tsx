import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './CommentEditor.module.css';

interface CommentEditorProps {
  value: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  placeholder?: string; 
  className?: string;  // Додали placeholder
}

const CommentEditor: React.FC<CommentEditorProps> = ({ value, onChange, onSubmit, onCancel, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const toolbar = document.querySelector('.ql-toolbar.ql-snow') as HTMLElement;
    const container = document.querySelector('.ql-container.ql-snow') as HTMLElement;
    if (toolbar) {
      toolbar.style.border = 'none';
    }
    if (container) {
      container.style.border = 'none';
    }
  }, [isFocused]);

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit();
      setIsFocused(false);
    } else {
      alert('Поле комментаря не може бути порожнім.');
    }
  };

  const modules = {
    toolbar: [
      [{ 'font': [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ],
  };

  const handleCancel = () => {
    onCancel();
    setIsFocused(false);
  };

  return (
    <div className={styles.commentEditorContainer}>
      {isFocused ? (
        <div className={styles.editor}>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            placeholder={placeholder}  
          />
          <div className={styles.actions}>
            <button className={styles.submitButton} onClick={handleSubmit}>Коментувати</button>
            <button className={styles.cancelButton} onClick={handleCancel}>Скасувати</button>
          </div>
        </div>
      ) : (
        <div
          className={styles.placeholder}
          onClick={() => setIsFocused(true)}
        >
          {placeholder || 'Додати коментар'}
        </div>
      )}
    </div>
  );
};

export default CommentEditor;
