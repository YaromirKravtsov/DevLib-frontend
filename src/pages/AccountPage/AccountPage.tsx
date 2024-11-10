import React, { useState, useEffect } from 'react';
import { useHeaderStore } from '../../layouts/Header/store/header';
import styles from './AccountPage.module.css';

const AccountPage: React.FC = () => {
    const [username] = useState("Ім'я");
    const setHeaderVersion = useHeaderStore(store => store.setHeaderVersion);

    useEffect(() => {
        setHeaderVersion('minimized');
        return () => setHeaderVersion('normal');
    }, []);

    const handlePhotoChange = () => alert("Змінити фото");

    return (
        <div className={styles.profilePage}>
            <div className={styles.sidebar}>
                <div className={styles.photoContainer} onClick={handlePhotoChange}>
                    <img src="path_to_avatar_image" alt="" className={styles.avatar} />
                    <div className={styles.photoOverlay}>+</div>
                </div>
                <div className={styles.usernameSection}>
                    <h2 className={styles.username}>{username}</h2>
                </div>
                <button className={styles.editButton}>
                    Редагувати профіль
                </button>
            </div>

            <div className={styles.content}>
                <section className={styles.postsSection}>
                    <h3>Пости які ви опублікували</h3>
                    <ul>
                        <li className={styles.postItem}>Назва посту</li>
                        <hr className={styles.separator} />

                    </ul>
                </section>

                <section className={styles.commentsSection}>
                    <h3>Коментарі які ви опублікували</h3>
                    <ul>
                        <li className={styles.commentItem}>
                            <strong>Назва посту:</strong>
                            <p>Коментар</p>
                        </li>
                        <hr className={styles.separator} />

                    </ul>
                </section>
            </div>
        </div>
    );
};

export default AccountPage;
