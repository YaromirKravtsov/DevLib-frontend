import React, { useState, useRef, useEffect } from 'react'; 
import styles from '../Comment/Comment.module.css';
import commentIcon from '../../assets/images/icons/comment.png';
import { ICommentItem } from '../../app/models/ICommentItem';
import { IReplyItem } from '../../app/models/IReplyItem';

interface IReplyProps {
  onAddReply: (commentId: string, content: string) => void;
  reply?: IReplyItem;
  commentId: string;
}

const Reply: React.FC<IReplyProps> = ({ reply, onAddReply, commentId }) => {
    const formattedDate = new Date((reply as IReplyItem).dateTime as string).toLocaleString();
    const [newReply, setNewReply] = useState<string>('');
    const [isRepliesVisible, setIsRepliesVisible] = useState<boolean>(false);
    const [isReplyFieldVisible, setIsReplyFieldVisible] = useState<boolean>(false);
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  
    useEffect(() => {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = 'auto';
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Corrected interpolation
      }
    }, [newReply]);
  
    const handleAddReply = () => {
      if (newReply.trim()) {
        onAddReply(commentId, newReply);
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
  
    return (
      <div className={styles.commentContainer}>
        <div className={styles.userIcon}></div>
        <div className={styles.commentContent}>
          <div className={styles.commentHeader}>
            <span className={styles.userName}><b>{(reply as IReplyItem).userId}</b></span> ・<span className={styles.commentDate}>{formattedDate}</span>
          </div>
          <div className={styles.commentTextContainer}>
            <div className={styles.verticalLine}></div>
            <div className={styles.commentText}>{(reply as IReplyItem).text}</div>
          </div>
  
          <div className={styles.replyActions}>
            <button className={styles.iconButton} onClick={toggleRepliesVisibility}>
              <img src={commentIcon} alt="Comment Icon" className={styles.commentIcon} /> {(reply as ICommentItem).replies?.length || 0}
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
  
  export default Reply;
  