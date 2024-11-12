import React, { useState, useRef, useEffect } from 'react';
import styles from './Comment.module.css';
import commentIcon from '../../../assets/images/icons/comment.png';
import { ICommentItem } from '../../../app/models/ICommentItem';

interface ICommentProps {
  comment: ICommentItem;
  onAddReply: (commentId: string, content: string) => void; // Function to add reply
}

const Comment: React.FC<ICommentProps> = ({ comment, onAddReply }) => {
  const formattedDate = new Date(comment.DateTime).toLocaleString();
  const [newReply, setNewReply] = useState<string>('');
  const [isRepliesVisible, setIsRepliesVisible] = useState<boolean>(false);
  const [isReplyFieldVisible, setIsReplyFieldVisible] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  // Function to adjust the textarea height automatically
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'; // Reset height before calculation
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Adjust to content
    }
  }, [newReply]); // Re-run whenever newReply changes

  const handleAddReply = () => {
    if (newReply.trim()) {
      onAddReply(comment.CommentId, newReply);
      setNewReply('');
      setIsInputFocused(false);
      resetTextareaHeight(); // Reset height to 21px after submission
    }
  };

  const toggleRepliesVisibility = () => {
    if (isRepliesVisible) {
      setIsRepliesVisible(false);
      setIsReplyFieldVisible(false);
    } else {
      setIsRepliesVisible(true);
      setIsReplyFieldVisible(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewReply(e.target.value);
  };

  const handleCancel = () => {
    setNewReply('');
    setIsInputFocused(false);
    resetTextareaHeight(); // Reset height when cancelling
  };

  // Reset textarea height to initial value (21px)
  const resetTextareaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '21px'; // Set height back to 21px
    }
  };

  return (
    <div className={styles.commentContainer}>
      <div className={styles.userIcon}></div>
      <div className={styles.commentContent}>
        <div className={styles.commentHeader}>
          <span className={styles.userName}><b>{comment.UserId}</b></span> ・<span className={styles.commentDate}>{formattedDate}</span>
        </div>
        <div className={styles.commentTextContainer}>
          <div className={styles.verticalLine}></div>
          <div className={styles.commentText}>{comment.Content}</div>
        </div>

        <div className={styles.replyActions}>
          <button className={styles.iconButton} onClick={toggleRepliesVisibility}>
            <img src={commentIcon} alt="Comment Icon" className={styles.commentIcon} /> {comment.Replies?.length || 0}
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
                  <button
                    className={styles.sendButton}
                    onClick={handleAddReply}
                  >
                    Відправити
                  </button>
                  <button
                    className={styles.cancelButton}
                    onClick={handleCancel}
                  >
                    Відмінити
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {comment.Replies && comment.Replies.length > 0 && isRepliesVisible && (
          <div className={styles.repliesContainer}>
            {comment.Replies.map(reply => (
              <Comment key={reply.CommentId} comment={reply} onAddReply={onAddReply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
