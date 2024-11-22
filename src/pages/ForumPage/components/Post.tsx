// components/Post.tsx
import React from 'react';
import { IForumPost } from '../../../app/models/IForumPage';
import styles from '../Forum.module.css';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../helpers/formatDate';

const Post: React.FC<IForumPost> = ({ postId, postName, dateTime, authorName, authorImg, commentsQuantity }) => {
  return (
    <Link to = {'/post/' + postId}className={styles.post}>
      <div className={styles.author}>
        <img src={authorImg} alt={`${authorName}'s avatar`} className={styles.authorImg} />
        <div>
          <div className={styles.authorName}>{authorName}</div>
          <div className={styles.dateTime}>{formatDate(dateTime) }</div>
        </div>
      </div>
      <div className={styles.postName}>{postName}</div>
      <div className={styles.commentsQuantity}>{commentsQuantity} коментарів</div>
    </Link>
  );
};

export default Post;
