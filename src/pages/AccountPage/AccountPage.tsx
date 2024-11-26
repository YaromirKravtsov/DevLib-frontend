import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHeaderStore } from "../../layouts/Header/store/header";
import { useAuthStore } from "../../app/store/auth";
import { getUserData } from "./api/AccountPageService";
import styles from "./AccountPage.module.css";
import { Link } from "react-router-dom";

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

    const loggedIn = useAuthStore((store) => store.loggedIn);
    const userId = useAuthStore((store) => store.userId);
    const setUserId = useAuthStore.getState().setUserId; // Правильний доступ до функції setUserId

    useEffect(() => {
        console.log("loggedIn:", loggedIn);
        console.log("userId from store:", userId);

        const fetchUserId = () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken: any = JSON.parse(atob(token.split('.')[1]));
                const userIdFromToken = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
                console.log("Decoded userId from token:", userIdFromToken);
                if (userIdFromToken) {
                    setUserId(userIdFromToken);
                    localStorage.setItem('userId', userIdFromToken); // Зберігаємо в localStorage
                } else {
                    throw new Error("Не вдалося отримати ID користувача з токена.");
                }
            } else {
                throw new Error("Токен не знайдено.");
            }
        };

        if (!userId) {
            fetchUserId();
        }
    }, [userId, setUserId]);

    useEffect(() => {
        if (!loggedIn) {
            navigate("/login");
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                const finalUserId = userId || localStorage.getItem('userId');
                if (finalUserId) {
                    console.log("Fetching data for userId:", finalUserId);
                    const data = await getUserData(finalUserId);
                    setUserData(data);
                } else {
                    console.log("UserId is missing.");
                    throw new Error("Не вдалося отримати ID користувача.");
                }
            } catch (err: any) {
                setError(err.message || "Помилка завантаження даних.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        setHeaderVersion("minimized");
        return () => {
            setHeaderVersion("normal");
            setUserData(null); // Очищення стану профілю
            localStorage.removeItem('userId'); // Очищення userId з localStorage
        };
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

    const handleEditProfile = () => navigate('/edit-profile');

    return (
        <div className={styles.profilePage}>
            
            <div className={styles.sidebar}>
                <div className={styles.photoContainer}>
                    <img src={userData.photo} alt="" className={styles.avatar} />
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
                                <>
                                    <Link to = {'/post/' + post.postId}
                                        className={`${styles.postItem}`}
                                        dangerouslySetInnerHTML={{ __html: post ? post.text : 'Тут буде контент статті' }}
                                    />
                                  {/*   <li className={styles.postItem} key={post.postId}>{post.text}</li> */}
                                    </>
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
                                    <small>{new Date(comment.dateTime).toLocaleString()}</small>
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
