import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react'; 
import { Link } from 'react-router-dom'; // Імпортуємо Link з react-router-dom
import styles from './Comment.module.css';
import commentIcon from '../../assets/images/icons/comment.png';
import { ICommentItem } from '../../app/models/ICommentItem';
import { formatDate } from '../../helpers/formatDate';
import PostPageService from '../../pages/PostPage/api/PostPageService';
import { useAuthStore } from '../../app/store/auth';
import CommentEditor from '../CommentEditor/CommentEditor'; 

interface ICommentProps {
  comment: ICommentItem;
  onAddReply: (commentId: string, text: string) => void;
  onUpdateComment: (commentId: string, text: string) => void;
  onDeleteComment: (commentId: string) => void;
}


const Comment: React.FC<ICommentProps> = ({
  comment,
  onAddReply,
  onUpdateComment,
  onDeleteComment,
}) => {
const Comment: React.FC<ICommentProps> = ({ comment, onAddReply }) => {
  const authorImg = process.env.STATIC_URL || 'http://localhost:3200';
  const formattedDate = formatDate(comment.dateTime);
  const [newReply, setNewReply] = useState<string>('');
  const [isRepliesVisible, setIsRepliesVisible] = useState<boolean>(false);
  const [isReplyFieldVisible, setIsReplyFieldVisible] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(comment.text);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const userId = useAuthStore((state) => state.userId);

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);


  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [newReply]);


  const handleAddReply = () => {
    if (newReply.trim()) {
      onAddReply((comment as ICommentItem).commentId, newReply);
      setNewReply('');
    }
  };
  
  

 
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      const requestData = {
        comment_id: comment.commentId,
        text: editedText.trim(),
        userId: userId,
      };

      console.log('RequestData:', requestData);

      await PostPageService.updateComment(requestData);
      onUpdateComment(comment.commentId, editedText);
      setIsEditing(false);
    } catch (error: any) {
      console.error('Помилка оновлення коментаря:', error.message);
      console.error('Backend Response:', error.response?.data);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedText(comment.text);
  };

  const handleDeleteComment = async () => {
    try {
      await PostPageService.deleteComment(comment.commentId);
      setIsDeleted(true); 
      console.log('Коментар успішно видалено');
    } catch (error: any) {
      console.error('Помилка видалення коментаря:', error.message);
      console.error('Response data from server:', error.response?.data);
    }
  };

  if (isDeleted) {
    return null;
  }

  

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

  const countAllComments = (comment: ICommentItem): number =>
    1 + (comment.comments?.reduce((total, nestedComment) => total + countAllComments(nestedComment), 0) || 0);

  const isAuthor = comment.userId === userId; 

  return (
    <div className={styles.commentContainer}>
      <div className={styles.userIcon}>
        <Link to={`/account/${comment.userId}`} className={styles.userProfileLink}>
          <img src={comment.userImg} alt="User Icon" className={styles.userIconImage} />
        </Link>
      </div>
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

        {isEditing ? (
          <div className={styles.editContainer}>
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className={styles.editInput}
            />
            <div className={styles.editActions}>
              <button className={styles.saveButton} onClick={handleSaveEdit}>
                Зберегти
              </button>
              <button className={styles.cancelButton} onClick={handleCancelEdit}>
                Відмінити
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.commentTextContainer}>
            <div className={styles.commentText}>{comment.text}</div>
            {isAuthor && (
              <div className={styles.commentActions}>
                <button className={styles.editButton} onClick={handleEditClick}>
                  Редагувати
                </button>
                <button className={styles.deleteButton} onClick={handleDeleteComment}>
                  Видалити
                </button>
              </div>
            )}
          </div>
        )}

        <div className={styles.replyActions}>
          <button className={styles.iconButton} onClick={toggleRepliesVisibility}>
            <img src={commentIcon} alt="Comment Icon" className={styles.commentIcon} />

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
                  <button className={styles.sendButton} onClick={handleAddReply}>
                    Відправити
                  </button>
                  <button className={styles.cancelButton} onClick={handleCancel}>
                    Відмінити
                  </button>
                </div>
              )}
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
