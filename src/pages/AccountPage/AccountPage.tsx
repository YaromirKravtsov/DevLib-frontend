import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
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

    const { userId: userIdFromStore, loggedIn } = useAuthStore((state) => ({
        userId: state.userId,
        loggedIn: state.loggedIn,
    }));

    const userIdFromParams = useParams<{ userId: string }>().userId;

    const userId = userIdFromParams && userIdFromParams !== ":userId"
        ? userIdFromParams
        : userIdFromStore;

    const isOwnProfile = userId === userIdFromStore;

    useEffect(() => {
        if (!loggedIn) {
            console.error("User is not logged in. Redirecting to login page...");
            navigate("/login");
            return;
        }

        if (!userId || userId === ":userId") {
            console.error("Invalid userId. Redirecting to login page...");
            navigate("/login");
            return;
        }

        const fetchData = async () => {
            try {
                console.log("Fetching data for userId:", userId);
                setLoading(true);
                const data = await getUserData(userId);
                console.log("Fetched user data:", data);
                setUserData(data);
            } catch (err: any) {
                console.error("Error fetching user data:", err);
                setError(err.message || "Помилка завантаження даних.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        setHeaderVersion("minimized");

        return () => {
            setHeaderVersion("normal");
        };
    }, [userId, loggedIn, navigate, setHeaderVersion]);

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

                {isOwnProfile && (
                    <button className={styles.editButton} onClick={handleEditProfile}>
                        Редагувати профіль
                    </button>
                )}
            </div>

            <div className={styles.content}>
                <section className={styles.postsSection}>
                    <h3>Пости, які ви опублікували</h3>
                    {userData.posts.length > 0 ? (
                        <ul>
                            {userData.posts.map((post) => (
                                <Link
                                    key={post.postId}
                                    to={`/post/${post.postId}`}
                                    className={`${styles.postItem}`}
                                    dangerouslySetInnerHTML={{ __html: post.text }}
                                />
                            ))}
                        </ul>
                    ) : (
                        <p>Ви ще не опублікували жодного посту.</p>
                    )}
                </section>

                <section className={styles.commentsSection}>
                    <h3>Коментарі</h3>
                    {userData.comments.length > 0 ? (
                        <ul>
                            {userData.comments.map((comment) => (
                                <li key={comment.commentId} className={styles.commentItem}>
                                    {comment.content}
                                    <small>{new Date(comment.dateTime).toLocaleString()}</small>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Немає коментарів.</p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default AccountPage;
