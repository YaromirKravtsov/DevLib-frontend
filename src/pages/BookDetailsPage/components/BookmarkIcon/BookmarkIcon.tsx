import React from 'react';
import { FaBookmark } from 'react-icons/fa';
import styles from './BookmarkIcon.module.css';

interface BookmarkIconProps {
  isBookmarked: boolean; // Доданий пропс для відстеження стану закладки
  onToggleBookmark: () => void;
}

const BookmarkIcon: React.FC<BookmarkIconProps> = ({ isBookmarked, onToggleBookmark }) => {
  return (
    <div
      className={`${styles.bookmarkIcon} ${isBookmarked ? styles.bookmarked : ''}`}
      onClick={onToggleBookmark}
    >
      <FaBookmark />
    </div>
  );
};

export default BookmarkIcon;
