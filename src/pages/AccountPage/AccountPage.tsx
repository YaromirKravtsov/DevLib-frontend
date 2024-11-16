import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHeaderStore } from "../../layouts/Header/store/header";
import { useAuthStore } from "../../app/store/auth"; 
import { getUserData } from "./api/AccountPageService"; 
import styles from "./AccountPage.module.css";

interface Post {
    postId: string;
    text: string;
}

interface Comment {
    bookId: string;
    postId: string;
    title: string;
    commentId: string;
    content: string;
    dateTime: string;
}

interface UserData {
    username: string;
    email: string;
    photo: string;
    posts: Post[];
    comments: Comment[];
}

const AccountPage: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const setHeaderVersion = useHeaderStore((store) => store.setHeaderVersion);
    const navigate = useNavigate();

    const loggedIn = useAuthStore((store) => store.loggedIn); // Стан авторизації
    const userId = useAuthStore((store) => store.userId); // Беремо userId з zustand (перевірено, що він є)

    useEffect(() => {

        //console.log("userId:", userId);
        if (!loggedIn) {
            navigate("/login"); // Перенаправляємо на сторінку входу, якщо користувач не авторизований
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getUserData(userId); // Використовуємо userId
                setUserData(data);
            } catch (err: any) {
                setError(err.message || "Помилка завантаження даних.");
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchData();
        } else {
            setError("Не вдалося отримати ID користувача.");
            setLoading(false);
        }

        setHeaderVersion("minimized");
        return () => setHeaderVersion("normal");
    }, [loggedIn, userId, setHeaderVersion, navigate]);

    if (loading) {
        return <div>Завантаження...</div>;
    }

    if (error) {
        return <div className={styles.error}>Помилка: {error}</div>;
    }

    if (!userData) {
        return <div>Користувач не знайдений.</div>;
    }

    //const handlePhotoChange = () => alert("Змінити фото");
    const handleEditProfile = () => navigate('/edit-profile');

    return (
        <div className={styles.profilePage}>
            <div className={styles.sidebar}>
                <div className={styles.photoContainer} /*onClick={handlePhotoChange}*/>
                    <img src={userData.photo} alt="" className={styles.avatar} />
                    {/*<div className={styles.photoOverlay}>+</div>*/}
                </div>
                <div className={styles.usernameSection}>
                    <h2 className={styles.username}>{userData.username}</h2>
                </div>
                <hr className={styles.smallSeparator} />
                <button className={styles.editButton} onClick={handleEditProfile}>
                    Редагувати профіль
                </button>
            </div>
            <div className={styles.content}>
                <section className={styles.postsSection}>
                    <h3>Пости які ви опублікували</h3>
                    {userData.posts.length > 0 ? (
                        <ul>
                            {userData.posts.map((post) => (
                                <li className={styles.postItem} key={post.postId}>{post.text}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>Ви ще не опублікували жодного посту.</p>
                    )}
                    <hr className={styles.separator} />
                </section>
                <section className={styles.commentsSection}>
                    <h3>Коментарі які ви опублікували</h3>
                    {userData.comments.length > 0 ? (
                        <ul>
                            {userData.comments.map((comment) => (
                                <li className={styles.commentItem} key={comment.commentId}>{comment.content}
                                    <small>{new Date(comment.dateTime).toLocaleString()}</small> {/* Виводимо дату і час */}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Ви ще не залишили жодного коментаря.</p>
                    )}
                    <hr className={styles.separator} />
                </section>
            </div>
        </div>
    );
};

export default AccountPage;
