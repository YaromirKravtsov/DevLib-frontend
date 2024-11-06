import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styles from './ReviewModal.module.css';

interface ReviewModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  reviewText: string;
  setReviewText: (text: string) => void;
  onReviewSubmit: () => void;
}

const MAX_CHAR_COUNT = 500;

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onRequestClose,
  reviewText,
  setReviewText,
  onReviewSubmit,
}) => {
  const [charCount, setCharCount] = useState<number>(0);

  useEffect(() => {
    setCharCount(reviewText.length);
  }, [reviewText]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Ваш відгук"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <button onClick={onRequestClose} className={styles.closeModalButton}>
        ✖
      </button>
      <h2 className={styles.title}>Ваш відгук</h2>
      <div className={styles.textAreaContainer}>
        <textarea 
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Напишіть свій відгук..."
          className={styles.reviewTextArea}
          maxLength={MAX_CHAR_COUNT}
        />
        <p className={styles.charCount}>{charCount}/{MAX_CHAR_COUNT}</p>
      </div>
      <button
        onClick={onReviewSubmit}
        className={styles.submitReviewButton}
        disabled={charCount === 0} 
      >
        Відправити відгук
      </button>
    </Modal>
  );
};

export default ReviewModal;
