import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './PostPage.module.css';
import { FaArrowLeft, FaShareAlt, FaClipboard  } from 'react-icons/fa';
import { useHeaderStore } from '../../layouts/Header/store/header';
import commentIcon from '../../assets/images/icons/comment.png';
import { IPostItem } from './models/IPostItem';
import { ICommentItem } from '../../app/models/ICommentItem';
import PostPageService from './api/PostPageService';
import { useAuthStore } from '../../app/store/auth';
import CommentEditor from '../../components/CommentEditor/CommentEditor';
import { formatDate } from '../../helpers/formatDate';
import CommentsList from './CommentsList/CommentsList';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon } from 'react-share';
import { staticUrl } from '../../constants/staticLink';
import Viewer from 'react-viewer';


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
  const [newCommentText, setNewCommentText] = useState<string>('');
  const userId = useUserId();
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();
  const role = useAuthStore(store => store.role);
  const [visible, setVisible] = useState(false);
  // Завантаження поста та коментарів
  const sortedComments = comments.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
  const [menuVisible, setMenuVisible] = useState(false);
  const fetchPost = async () => {
    try {
      setLoading(true);
      const { data } = await PostPageService.getPost(postId!);
      setComments(data.comments);
      setPost(data);
    } catch (error) {
      console.error('Ошибка при загрузке поста:', error);
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

    if (!newCommentText.trim()) {
      alert('Заповніть поле коментаря!');
      return;
    }

    console.log({
      userId, text: newCommentText, postId: String(postId)
    })
    try {
      await PostPageService.createComment({
        userId,
        text: newCommentText,
        postId: String(postId),
      });
      await fetchPost();
    } catch (error) {
      console.error('Ошибка при добавлении комментария:', error);
    }

    setNewCommentText('');
  };

  const handleAddReply = async (commentId: string, text: string) => {
    try {
      await PostPageService.createReplyComment({
        commentId,
        text,
        userId,
      });
      await fetchPost();
      setNewCommentText('');
    } catch (error) {
      console.error('Ошибка при ответе на комментарий:', error);
    }
  };

  const handleUpdateComment = async (commentId: string, updatedText: string) => {
    try {
      await PostPageService.updateComment({
        comment_id: commentId,  
        text: updatedText,
        userId,
      });
      await fetchPost();
    } catch (error) {
      console.error('Ошибка обновления комментария:', error);
    }
  };
 
  const handleDeleteComment = async (comment_id: string) => {
    try {
      
      await PostPageService.deleteComment(comment_id);
      await fetchPost();  
      console.log('Коментар успішно видалено');
    } catch (error: any) {
      console.error('Помилка видалення коментаря:', error.message);
      console.error('Response data from server:', error.response?.data);
    }
  };
  
  
  
  
  const countAllCommentsInList = (comments: ICommentItem[]): number => {
    return comments.reduce((total, comment) => total + countAllComments(comment), 0);
  };

  const countAllComments = (comment: ICommentItem): number => {
    return 1 + (comment.comments?.reduce((total, nestedComment) => total + countAllComments(nestedComment), 0) || 0);
  };

  if (loading) return <p>Загрузка...</p>;
  if (!post) return <p>Пост не знайдено.</p>;

  const shareUrl = `${window.location.origin}/post/${postId}`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert(' Адресу скопійовано в буфер обміну!');
  };


  return (
    <div className={styles.postContainer}>
      {/* Заголовок посту */}
      <div className={styles.postHeader}>
        <button onClick={handleBack} className={styles.backButton}>
          <FaArrowLeft />
        </button>
        <div className={styles.userIcon}>
          {post.authorImg ? (
            <img
              src={`${authorImg}${post.authorImg}`}
              alt={post.authorName}
              className={styles.userImage}
            />
          ) : null}
        </div>
        <div className={styles.userInfo}>
          <span><b>{post.authorName}</b> • {formatDate(post.dateTime)}</span>
        </div>
      </div>
  
      {/* Назва посту */}
      <h2 className={styles.postTitle}>{post.postName}</h2>
  
      {/* Контент посту */}
      <div
        className={`${styles.articleText} custom-text`}
        dangerouslySetInnerHTML={{ __html: post.text || 'Тут буде контент статті' }}
      />
    <img className = {styles.img} src={staticUrl + post.imgLink} alt=""onClick={() => setVisible(true)} />
    <Viewer
        visible={visible}
        onClose={() => setVisible(false)}
        images={[{ src: staticUrl + post.imgLink, alt: 'Photo' }]}
      />
  
    
      <div className={styles.postFooter}>
        <button className={styles.iconButton} onClick={() => { }}>
          <img src={commentIcon} alt="Comment Icon" className={styles.commentIcon} />
          {countAllCommentsInList(comments)}
        </button>
  
        <button className={styles.shareButton} onClick={() => setMenuVisible(!menuVisible)}>
          <FaShareAlt />
        </button>
  
        {menuVisible && (
          <div className={styles.shareMenu}>
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton url={shareUrl}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <button onClick={copyToClipboard}>
              <FaClipboard size={25} />
            </button>
          </div>
        )}
      </div>
  
      {/* Коментарі */}
      {role !== '' && (
        <div>
          <CommentEditor
            value={newCommentText}
            onChange={setNewCommentText}
            onSubmit={handleAddComment}
            onCancel={() => setNewCommentText('')}
            placeholder="Напишіть коментар..."
            className={styles.commentInput}
          />
        </div>
      )}
  
      {/* Список коментарів */}
      <CommentsList
        comments={comments}
        onAddReply={handleAddReply}
        onUpdateComment={handleUpdateComment}
        onDeleteComment={handleDeleteComment}
      />
    </div>
  );
  
  
};

export default PostPage;
