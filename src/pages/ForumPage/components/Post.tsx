// components/Post.tsx
import React from 'react';
import { IForumPost } from '../../../app/models/IForumPage';
import styles from '../Forum.module.css';

const Post: React.FC<IForumPost> = ({ postName, dateTime, authorName, authorImg, commentsQuantity }) => {
  return (
    <div className={styles.post}>
      <div className={styles.author}>
        <img src={authorImg} alt={`${authorName}'s avatar`} className={styles.authorImg} />
        <div>
          <div className={styles.authorName}>{authorName}</div>
          <div className={styles.dateTime}>{dateTime}</div>
        </div>
      </div>
      <div className={styles.postName}>{postName}</div>
      <div className={styles.commentsQuantity}>{commentsQuantity} коментарів</div>
    </div>
  );
};

export default Post;
