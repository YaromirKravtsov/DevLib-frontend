// pages/ForumPage/ForumPage.tsx
import React, { useState, useEffect } from 'react';
import styles from './Forum.module.css';
import ForumPageService from './api/ForumPageService';
import { IForumPost } from '../../app/models/IForumPage';
import Post from './components/Post';
import Dropdown from './components/Dropdown';
import { useHeaderStore } from '../../layouts/Header/store/header';


const Forum: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [posts, setPosts] = useState<IForumPost[]>([]); // Стан для постів
  const setRequestUrl = useHeaderStore((store) => store.setRequestUrl);
  const response = useHeaderStore(store => store.response);

  // Отримання постів з API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await ForumPageService.getPosts(); // Отримуємо пости з API
        setPosts(fetchedPosts); // Зберігаємо пости у стан
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts(); // Завантаження постів при першому рендері
    setRequestUrl("/post/search/")
  }, []); 

    useEffect(() => {
      setPosts(response);
  }, [response])

  // Тогл для фільтра
  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev); // Toggle the dropdown
  };

  return (
    <div className={styles.forum}>
      <div className={styles.forumHeader}>
        <Dropdown isDropdownOpen={isDropdownOpen} toggleDropdown={toggleDropdown} />
        <button className={styles.newPostButton}>Створити новий пост</button>
      </div>
      <div className={styles.postsContainer}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Post key={post.postId} {...post} />
          ))
        ) : (
          <p>Завантаження постів...</p> 
        )}
      </div>
    </div>
  );
};

export default Forum;