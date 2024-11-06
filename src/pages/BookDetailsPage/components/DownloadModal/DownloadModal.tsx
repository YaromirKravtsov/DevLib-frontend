import React from 'react';
import styles from './DownloadModal.module.css';

interface DownloadModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onDownload: (format: string) => void;
}

const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onRequestClose, onDownload }) => {
  const formats = ['PDF', 'EPUB', 'MOBI'];

  const handleDownload = (format: string) => {
    onDownload(format);
    onRequestClose();
  };

  return (
    <div className={`${styles.modal} ${isOpen ? styles.open : styles.closed}`}>
    <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onRequestClose}>✖</button>
        <h2>Оберіть формат файлу</h2>
        <select /* onChange={(e) => handleDownload(e.target.value)} */>
            <option value="" disabled>Виберіть формат</option>
           {/*  {formats.map((format) => (
                <option key={format} value={format}>{format}</option>
            ))} */}
            <option  value={'PDF'}>{'PDF'}</option>
        </select>
        <button className={styles.button} onClick={() => handleDownload('PDF')}>Завантажити</button>
    </div>
</div>

  );
};

export default DownloadModal;
