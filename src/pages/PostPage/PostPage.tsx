import React, { useEffect, useState, useRef } from 'react';
import styles from './PostPage.module.css';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';
import { useHeaderStore } from '../../layouts/Header/store/header';
import { IPostItem } from './models/IPostItem';
import { ICommentItem } from '../../app/models/ICommentItem';
import postsData from './api/posts/list.json';
import Comment from './components/Comment';
import commentIcon from '../../assets/images/icons/comment.png'; // Import image

const PostPage: React.FC = () => {
  const setHeaderVersion = useHeaderStore(store => store.setHeaderVersion);
  const [post, setPost] = useState<IPostItem | null>(null);
  const [comments, setComments] = useState<ICommentItem[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [likes, setLikes] = useState<number>(348);
  const [liked, setLiked] = useState<boolean>(false); // Track if user has liked
  const [commentsCount, setCommentsCount] = useState<number>(348);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const fetchedPost = postsData[0]; // Taking the first post as an example
    setCommentsCount(fetchedPost.comments?.length || 0);
    setPost(fetchedPost);
    setComments(fetchedPost.comments || []);
  }, []);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'; // Reset height before calculation
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Adjust to content
    }
  }, [newComment]); // Re-run whenever newReply changes

  useEffect(() => {
    setHeaderVersion('minimized');
  }, [setHeaderVersion]);

  const handleBack = () => {
    window.history.back();
  };
  
  const handleAddComment = (event: React.MouseEvent<HTMLButtonElement>, parentCommentId: string | null) => {
    event.preventDefault();  // Prevent any default action if needed
  
    if (newComment.trim()) {
      const newCommentObj: ICommentItem = {
        CommentId: Math.random().toString(36).substring(2, 9),
        UserId: "1",
        Content: newComment,
        DateTime: new Date().toISOString(),
        Replies: [],
        PostId: '1'
      };
  
      if (parentCommentId) {
        const addReplyToComment = (comments: ICommentItem[], commentId: string): ICommentItem[] => {
          return comments.map(comment => {
            if (comment.CommentId === commentId) {
              return { ...comment, Replies: [...comment.Replies, newCommentObj] };
            }
            if (comment.Replies) {
              return { ...comment, Replies: addReplyToComment(comment.Replies, commentId) };
            }
            return comment;
          });
        };
  
        setComments(prevComments => addReplyToComment(prevComments, parentCommentId));
      } else {
        setComments([...comments, newCommentObj]);
      }
  
      setNewComment('');
      resetTextareaHeight(); // Reset height after adding comment
      setIsInputFocused(false);
    }
  };
  
 const handleAddReply = (commentId: string, content: string) => {
  const newReply: ICommentItem = {
    CommentId: Math.random().toString(36).substring(2, 9),
    UserId: "1",
    PostId: post?.PostId || "", 
    Content: content,
    DateTime: new Date().toISOString(),
    Replies: [] 
  };

  const updatedComments = comments.map(comment => {
    if (comment.CommentId === commentId) {
      // Додаємо підкоментар до поточного коментаря
      return { ...comment, Replies: [...comment.Replies || [], newReply] };
    }
    return comment;
  });

  setComments(updatedComments); // Оновлюємо стейт з новим підкоментарем
};


  const handleCancel = () => {
    setNewComment('');
    setIsInputFocused(false);
    resetTextareaHeight(); // Reset height when cancelling
  };

  const handleLike = () => {
    setLikes(prev => liked ? prev - 1 : prev + 1);
    setLiked(!liked);
  };

  // Reset textarea height to initial value (21px)
  const resetTextareaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '21px'; // Set height back to 21px
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className={styles.postContainer}>
      <div className={styles.postHeader}>
        <button onClick={handleBack} className={styles.backButton}>
          <FaArrowLeft />
        </button>
        <div className={styles.userIcon}></div>
        <div className={styles.userInfo}>
          <span><b>{post.UserId}</b> • {post.DateTime}</span>
        </div>
      </div>
      
      <h2 className={styles.postTitle}>{post.Title}</h2>
      
      <p className={styles.postContent}>{post.Text}</p>
      
      <div className={styles.postFooter}>
        <button className={styles.iconButton} onClick={() => {}}>
          <img src={commentIcon} alt="Comment Icon" className={styles.commentIcon} /> {commentsCount}
        </button>
        <button className={`${styles.iconButton} ${liked ? styles.liked : ''}`} onClick={handleLike}>
          <FaHeart color={liked ? "red" : "gray"} /> {likes}
        </button>
      </div>
      
      <div className={`${styles.commentInputContainer} ${isInputFocused ? styles.focused : ''}`}>
        <textarea
          ref={textAreaRef}
          className={styles.commentInput}
          placeholder="Додати коментар"
          value={newComment}
          onFocus={() => setIsInputFocused(true)}
          onChange={handleInputChange}
          style={{ height: 'auto' }} />
        {isInputFocused && (
          <div className={styles.commentActions}>
            <button
              className={styles.sendButton}
              onClick={(e) => handleAddComment(e, null)}>Відправити</button>
            <button className={styles.cancelButton} onClick={handleCancel}>Відмінити</button>
          </div>
        )}
      </div>
      
      {comments.map((comment) => (
        <Comment key={comment.CommentId} comment={comment} onAddReply={handleAddReply} />
      ))}
    </div>
  );
};

export default PostPage;
