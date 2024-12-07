import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Імпортуємо Link з react-router-dom
import styles from './Comment.module.css';
import commentIcon from '../../assets/images/icons/comment.png';
import { ICommentItem } from '../../app/models/ICommentItem';
import { formatDate } from '../../helpers/formatDate';

interface ICommentProps {
  comment: ICommentItem;
  onAddReply: (commentId: string, text: string) => void;
}

const Comment: React.FC<ICommentProps> = ({ comment, onAddReply }) => {
  const formattedDate = formatDate(comment.dateTime);
  const [newReply, setNewReply] = useState<string>('');
  const [isRepliesVisible, setIsRepliesVisible] = useState<boolean>(false);
  const [isReplyFieldVisible, setIsReplyFieldVisible] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Виправлена інтерполяція
    }
  }, [newReply]);

  const handleAddReply = () => {
    if (newReply.trim()) {
      onAddReply(comment.commentId, newReply);
      setNewReply('');
      setIsInputFocused(false);
      resetTextareaHeight();
    }
  };

  const toggleRepliesVisibility = () => {
    setIsRepliesVisible(!isRepliesVisible);
    setIsReplyFieldVisible(!isReplyFieldVisible);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewReply(e.target.value);
  };

  const handleCancel = () => {
    setNewReply('');
    setIsInputFocused(false);
    resetTextareaHeight();
  };

  const resetTextareaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '21px';
    }
  };

  const countAllComments = (comment: ICommentItem): number => {
    return 1 + (comment.comments?.reduce((total, nestedComment) => total + countAllComments(nestedComment), 0) || 0);
  };

  return (
    <div className={styles.commentContainer}>
      {/* Клікбельна іконка користувача та ім'я */}
      <div className={styles.userIcon}>
  <Link to={`/account/${comment.userId}`} className={styles.userProfileLink}>
    <img src={comment.userImg} alt="User Icon" className={styles.userIconImage} />
  </Link>
</div>

      <div className={styles.commentContent}>
        <div className={styles.commentHeader}>
          <span className={styles.userName}>
            <b>
              <Link to={`/account/${comment.userId}`} className={styles.userProfileLink}>
                {comment.authorName}
              </Link>
            </b>
          </span> 
          ・
          <span className={styles.commentDate}>{formattedDate}</span>
        </div>
        <div className={styles.commentTextContainer}>
          <div className={styles.verticalLine}></div>
          <div className={styles.commentText}>{comment.text}</div>
        </div>
     
        <div className={styles.replyActions}>
          <button className={styles.iconButton} onClick={toggleRepliesVisibility}>
            <img src={commentIcon} alt="Comment Icon" className={styles.commentIcon} /> {countAllComments(comment) - 1}
          </button>
          {isReplyFieldVisible && (
            <div className={styles.commentInputContainer}>
              <textarea
                ref={textAreaRef}
                className={`${styles.commentInput} ${isInputFocused ? styles.expanded : ''}`}
                placeholder="Додати відповідь"
                value={newReply}
                onFocus={() => setIsInputFocused(true)}
                onChange={handleInputChange}
              />
              {isInputFocused && (
                <div className={styles.commentActions}>
                  <button className={styles.sendButton} onClick={handleAddReply}>Відправити</button>
                  <button className={styles.cancelButton} onClick={handleCancel}>Відмінити</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
