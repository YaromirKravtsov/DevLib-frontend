import React, { useState, useRef, useEffect } from 'react'; 
import { Link } from 'react-router-dom'; // Імпортуємо Link з react-router-dom
import styles from './Comment.module.css';
import commentIcon from '../../assets/images/icons/comment.png';
import { ICommentItem } from '../../app/models/ICommentItem';
import { formatDate } from '../../helpers/formatDate';
import CommentEditor from '../CommentEditor/CommentEditor'; 

interface ICommentProps {
  comment: ICommentItem;
  onAddReply: (commentId: string, text: string) => void;
}

const Comment: React.FC<ICommentProps> = ({ comment, onAddReply }) => {
  const authorImg = process.env.STATIC_URL || 'http://localhost:3200';
  const formattedDate = formatDate(comment.dateTime);
  const [newReply, setNewReply] = useState<string>('');
  const [isRepliesVisible, setIsRepliesVisible] = useState<boolean>(false);
  const [isReplyFieldVisible, setIsReplyFieldVisible] = useState<boolean>(false);

  const handleAddReply = () => {
    if (newReply.trim()) {
      onAddReply((comment as ICommentItem).commentId, newReply);
      setNewReply('');
    }
  };
  
  

  const toggleRepliesVisibility = () => {
    setIsRepliesVisible(!isRepliesVisible);
    setIsReplyFieldVisible(!isReplyFieldVisible);
  };

  const countAllComments = (comment: ICommentItem): number => {
    return 1 + (comment.comments?.reduce((total, nestedComment) => total + countAllComments(nestedComment), 0) || 0);
  };

  return (
    <div className={styles.commentContainer}>
      {/* Клікбельна іконка користувача та ім'я */}
  <Link to={`/account/${comment.userId}`} className={styles.userProfileLink}>
  <div className={styles.userIcon}>
          {comment.authorImg ? (
            <img
              src={authorImg + comment.authorImg}
              alt={comment.authorName}
              className={styles.authorImage}
            />
          ) : null}
        </div>
  </Link>

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
          {/* Используем dangerouslySetInnerHTML для рендера текста с HTML */}
          <div
            className={styles.commentText}
            dangerouslySetInnerHTML={{ __html: (comment as ICommentItem).text }}
          />
        </div>

        <div className={styles.replyActions}>
          <button className={styles.iconButton} onClick={toggleRepliesVisibility}>
            <img src={commentIcon} className={styles.commentIcon} />
            {countAllComments(comment) - 1}
          </button>
          {isReplyFieldVisible && (
            <div className={styles.commentInputContainer}>
              <div className={styles.commentInput}>
                <CommentEditor
                  value={newReply}
                  onChange={setNewReply}
                  onSubmit={handleAddReply}
                  onCancel={() => setNewReply('')}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
