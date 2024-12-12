// pages/ForumPage/ForumPage.tsx
import React, { useState, useEffect } from 'react';
import styles from './Forum.module.css';
import ForumPageService from './api/ForumPageService';
import { IForumPost } from '../../app/models/IForumPage';
import Post from './components/Post';
import Dropdown from './components/Dropdown';
import { useHeaderStore } from '../../layouts/Header/store/header';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../app/store/auth';


const Forum: React.FC = () => {
  const setHeaderVersion = useHeaderStore(store => store.setHeaderVersion);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [posts, setPosts] = useState<IForumPost[]>([]); // Стан для постів
  const setRequestUrl = useHeaderStore((store) => store.setRequestUrl);
  const response = useHeaderStore(store => store.response);
  const role = useAuthStore(store => store.role)

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

  useEffect(() => {
    setHeaderVersion('normal');
  }, [setHeaderVersion]);

    // Видалення поста
    const handleDeletePost = async (postId: number) => {
        try {
            await ForumPageService.deletePost(postId); // Викликаємо метод для видалення
            setPosts(prevPosts => prevPosts.filter(post => post.postId !== postId)); // Оновлюємо список постів
            alert('Пост успішно видалено'); // Сповіщення про успішне видалення
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Сталася помилка при видаленні поста');
        }
    };

  // Тогл для фільтра
  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev); // Toggle the dropdown
  };
  const navigate = useNavigate()
  const handleCreateNewPost = () => {
    navigate('/create-post')
  }
  return (
    <div className={styles.forum}>
      <div className={styles.forumHeader}>
        <Dropdown isDropdownOpen={isDropdownOpen} toggleDropdown={toggleDropdown} />
        {role !== '' &&
          <button onClick={handleCreateNewPost} className={styles.newPostButton}>Створити новий пост</button>
        }
      </div>
          <div className={styles.postsContainer}>
              {posts.length > 0 ? (
                  posts.map((post) => (
                      <div key={post.postId} className={styles.postWithDelete}>
                          <Post {...post} />
                          {role === 'admin' && (
                              <button
                                  onClick={() => handleDeletePost(post.postId)}
                                  className={styles.deletePostButton}
                              >
                                  Видалити
                              </button>
                          )}
                      </div>
                  ))
              ) : (
                  <p>Завантаження постів...</p>
              )}
      </div>
    </div>
  );
};

export default Forum;
