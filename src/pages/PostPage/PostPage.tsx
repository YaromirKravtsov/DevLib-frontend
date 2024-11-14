import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './PostPage.module.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useHeaderStore } from '../../layouts/Header/store/header';
import { IPostItem } from './models/IPostItem';
import { ICommentItem } from '../../app/models/ICommentItem';
import { IReplyItem } from '../../app/models/IReplyItem';
import Comment from '../../components/Comment/Comment';
import commentIcon from '../../assets/images/icons/comment.png';
import PostPageService from './api/PostPageService';
import CommentService from '../../components/Comment/CommentService';
import { useAuthStore } from '../../app/store/auth'; 

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const useUserId = () => {
  return useAuthStore(state => state.userId);
};

const PostPage: React.FC = () => {
  const setHeaderVersion = useHeaderStore(store => store.setHeaderVersion);
  const [post, setPost] = useState<IPostItem | null>(null);
  const { postId } = useParams<{ postId: string }>();
  const [comments, setComments] = useState<ICommentItem[]>([]);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [newCommentText, setNewCommentText] = useState<string>("");
  const userId = useUserId(); 
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data } = await PostPageService.getPost(postId!);
        setPost(data);
        setComments(data.comments || []);
      } catch (error) {
        console.error("Error loading articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [postId]);

  useEffect(() => {
    setHeaderVersion('minimized');
  }, [setHeaderVersion]);

  const handleBack = () => {
    navigate('`/forum`')
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewCommentText(e.target.value);
  };

  const handleAddComment = async () => {
    console.log('userId:', userId); 
    console.log('newCommentText:', newCommentText);

    if (!newCommentText.trim()) return;

    const newComment: ICommentItem = {
      commentId: '',
      userId: userId,
      postId: postId!,
      text: newCommentText,
      replies: []
    };

    try {
      console.log('Sending comment:', newComment);
      const { data } = await CommentService.addComment(newComment);
      console.log('Response data:', data); // Ответ от сервера
      setComments(prevComments => [...prevComments, data]);
      setNewCommentText('');
    } catch (error) {
      console.error("Ошибка при добавлении комментария:", error);
    }
  };

  const handleAddReply = async (commentId: string, replyText: string) => {
    if (!replyText.trim()) return;

    try {
      const newReply: IReplyItem = {
        userId: userId, 
        postId: postId!,
        commentId: commentId,
        text: replyText,
      };

      const { data } = await CommentService.addReply(newReply);
      setComments(prevComments => 
        prevComments.map(comment => 
          comment.commentId === commentId 
            ? { ...comment, replies: [...(comment.replies || []), data] } 
            : comment
        )
      );
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className={styles.postContainer}>
      <div className={styles.postHeader}>
        <button onClick={handleBack} className={styles.backButton}>
          <FaArrowLeft />
        </button>
        <div className={styles.userIcon}></div>
        <div className={styles.userInfo}>
          <span><b>{post.authorName}</b> • {formatDate(post.dateTime)}</span>
        </div>
      </div>

      <h2 className={styles.postTitle}>{post.postName}</h2> 
      <p className={styles.postContent}>{post.text}</p>

      <div className={styles.postFooter}>
        <button className={styles.iconButton} onClick={() => {}}>
          <img src={commentIcon} alt="Comment Icon" className={styles.commentIcon} /> {post.commentsQuantity}
        </button>
      </div>

      <div className={styles.commentInputContainer}>
        <textarea
          ref={textAreaRef}
          value={newCommentText}
          onChange={handleInputChange}
          onFocus={() => setIsInputFocused(true)}
          placeholder="Write a comment..."
          className={styles.commentInput}
        />
        {isInputFocused && (
          <div className={styles.commentActions}>
            <button onClick={handleAddComment} className={styles.sendButton}>Відправити</button>
            <button onClick={() => setIsInputFocused(false)} className={styles.cancelButton}>Відмінити</button>
          </div>
        )}
      </div>

      {comments.map((comment) => (
        <Comment key={comment.commentId} comment={comment} onAddReply={handleAddReply} />
      ))}
    </div>
  );
};

export default PostPage;
