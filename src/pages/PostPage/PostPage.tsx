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
import CommentEditor from '../../components/CommentEditor/CommentEditor';
import { formatDate } from '../../helpers/formatDate';
import CommentsList from './CommentsList/CommentsList';



const useUserId = () => {
  return useAuthStore(state => state.userId);
};

const PostPage: React.FC = () => {
  const authorImg = process.env.STATIC_URL || 'http://localhost:3200';
  const setHeaderVersion = useHeaderStore(store => store.setHeaderVersion);
  const [post, setPost] = useState<IPostItem | null>(null);
  const { postId } = useParams<{ postId: string }>();
  const [comments, setComments] = useState<ICommentItem[]>([]);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [newCommentText, setNewCommentText] = useState<string>("");
  const userId = useUserId();
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();
  const sortedComments = comments.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
  const role = useAuthStore(store => store.role)
  const fetchPost = async () => {
    try {
      setLoading(true);
      const { data } = await PostPageService.getPost(postId!);
      console.log(data)
      setComments(data.comments)
      setPost(data);
    } catch (error) {
      console.error("Ошибка при загрузке поста:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchPost();
  }, [postId]);

  useEffect(() => {
    setHeaderVersion('minimized');
  }, [setHeaderVersion]);

  const handleBack = () => {
    navigate('/forum');
  };

  const handleAddComment = async () => {
    console.log({
      userId, text: newCommentText, postId: String(postId)
    })
    try {
      await PostPageService.createComment({
        userId, text: newCommentText, postId: String(postId)
      })
      await fetchPost();
    } catch (error) {
      console.log(error)
    }

    setNewCommentText('');
  };

  const handleAddReply = async (commentId: string, text: string) => {
    console.log(commentId, text);
    await PostPageService.createReplyComment({
      commentId, text, userId
    })

    await fetchPost();
    setNewCommentText('');
  };

  const countAllCommentsInList = (comments: ICommentItem[]): number => {
    return comments.reduce((total, comment) => total + countAllComments(comment), 0);
  };
  const countAllComments = (comment: ICommentItem): number => {
    // Считаем текущий комментарий (1) + вложенные комментарии
    return 1 + (comment.comments?.reduce((total, nestedComment) => total + countAllComments(nestedComment), 0) || 0);
  };

  if (loading) return <p>Загрузка...</p>;
  if (!post) return <p>Пост не найден.</p>;

  return (
    <div className={styles.postContainer}>
      <div className={styles.postHeader}>
        <button onClick={handleBack} className={styles.backButton}>
          <FaArrowLeft />
        </button>
        <div className={styles.userIcon}>
          {post.authorImg ? (
            <img
              src={authorImg + post.authorImg}
              alt={post.authorName}
              className={styles.userImage}
            />
          ) : null}
        </div>
        <div className={styles.userInfo}>
          <span><b>{post.authorName}</b> • {formatDate(post.dateTime)}</span>
        </div>
      </div>
      <h2 className={styles.postTitle}>{post.postName}</h2>
      <div
        className={`${styles.articleText} custom-text`}
        dangerouslySetInnerHTML={{ __html: post.text ? post.text : 'Тут буде контент статті' }}
      />
      <div className={styles.postFooter}>
        <button className={styles.iconButton} onClick={() => { }}>
          <img src={commentIcon} alt="Comment Icon" className={styles.commentIcon} /> {countAllCommentsInList(comments)}
        </button>
      </div>
      {role !== '' &&
        <div>
          <CommentEditor
            value={newCommentText}
            onChange={setNewCommentText}
            onSubmit={handleAddComment}
            onCancel={() => setNewCommentText('')}
          /> 
        </div>
      }
      <CommentsList comments={sortedComments} onAddReply={handleAddReply} />
    </div>
  );
};

export default PostPage;
