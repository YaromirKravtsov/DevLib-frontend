import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './PostPage.module.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useHeaderStore } from '../../layouts/Header/store/header';
import commentIcon from '../../assets/images/icons/comment.png';
import { IPostItem } from './models/IPostItem';
import { ICommentItem } from '../../app/models/ICommentItem';
import PostPageService from './api/PostPageService';
import { useAuthStore } from '../../app/store/auth'; 
import Comment from '../../components/Comment/Comment';

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

const testComments: ICommentItem[] = [
    {
        commentId: '1',
        userId: 'user1',
        postId: '1',
        text: 'Это первый тестовый комментарий',
        dateTime: '2024-11-10T10:00:00Z',
        replies: [
        ]
    },
    {
        commentId: '2',
        userId: 'user3',
        postId: '1',
        text: 'Это второй тестовый комментарий',
        dateTime: '2024-11-11T12:00:00Z',
        replies: []
    }
];

const PostPage: React.FC = () => {
  const setHeaderVersion = useHeaderStore(store => store.setHeaderVersion);
  const [post, setPost] = useState<IPostItem | null>(null);
  const { postId } = useParams<{ postId: string }>();
  const [comments, setComments] = useState<ICommentItem[]>(testComments);
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
        // setComments(data.comments || []);
      } catch (error) {
        console.error("Ошибка при загрузке поста:", error);
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
    navigate('/forum');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewCommentText(e.target.value);
  };

  const handleAddComment = () => {
    if (!newCommentText.trim()) return;

    const newComment: ICommentItem = {
      commentId: (comments.length + 1).toString(),
      userId: userId,
      postId: postId!,
      text: newCommentText,
      dateTime: new Date().toISOString(),
      replies: []
    };

    setComments(prevComments => [...prevComments, newComment]);
    setNewCommentText('');
  };

  const handleAddReply = (commentId: string, text: string) => {
    const newReply: ICommentItem = {
      commentId: Math.random().toString(36).substring(2, 9),
      userId: "1",
      postId: post?.postId || "", 
      text: text,
      dateTime: new Date().toISOString(),
      replies: [] 
    };

    setComments(prevComments => 
      prevComments.map(comment => 
        comment.commentId === commentId 
          ? { ...comment, replies: [...comment.replies, newReply] } 
          : comment
      )
    );
  };

  if (loading) return <p>Загрузка...</p>;
  if (!post) return <p>Пост не найден.</p>;

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
          placeholder="Напишите комментарий..."
          className={styles.commentInput}
        />
        {isInputFocused && (
          <div className={styles.commentActions}>
            <button onClick={handleAddComment} className={styles.sendButton}>Отправить</button>
            <button onClick={() => setIsInputFocused(false)} className={styles.cancelButton}>Отмена</button>
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
