import React, { useEffect, useState } from 'react';
import AppLayout from '../../layouts/AppLayout/AppLayout';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useHeaderStore } from '../../layouts/Header/store/header';
import styles from './ArticlePage.module.css';
import ArticlePageService from './api/ArticlePageService';
import homeIcon from '../../assets/images/home-icon.png';
import toggleIcon from '../../assets/images/ToggleSidePanel.png';
import DirecoryService from '../../api/DirectoryService';
import { IDirectory } from '../../models/IDirectory';
import { IArticle } from '../../models/IArticle';
import { Link } from 'react-router-dom';




const ArticlePage: React.FC = () => {
    const { articleId } = useParams<{ articleId: string }>();
    const [article, setArticle] = useState<IArticle | null>(null);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [direcory, setDirecory] = useState<IDirectory>()
    const navigate = useNavigate();
    const setHeaderVersion = useHeaderStore(store => store.setHeaderVersion);
    const [comments, setComments] = useState<string[]>([])
    const fetchArticle = async () => {
        if (articleId) {
            const { data } = await ArticlePageService.getArticle(articleId);
            setArticle(data);
        }
    };

    const fetchDirectory = async () => {
        if (article?.directoryId) {
            const { data } = await DirecoryService.getDirectory(article.directoryId);
            setDirecory(data);
        }
    };

    useEffect(() => {
        fetchDirectory()
    }, [article])
    useEffect(() => {
        setHeaderVersion('minimized');



        fetchArticle();
        return () => setHeaderVersion('normal');
    }, [articleId]);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };



    return (
        <div className={styles.articlePage}>
            {<div className={`${styles.sidebar} ${isSidebarOpen ? '' : styles.hidden}`}>
                <h2 className={styles.sectionTitle}>Статті</h2>
                {(direcory?.articles.length !== undefined && direcory?.articles.length > 0) ? (
                    direcory?.articles.map((article) => (
                        <Link to={`/article/${article.articleId}`} key={article.articleId} className={styles.sectionName}>{article.name}</Link>
                    ))
                ) : (
                    <p className={styles.noChapters}>Немає розділів для відображення</p>
                )}
            </div>}
            <div className={styles.content}>
                <div className={styles.buttonContainer}>
                    <button className={styles.toggleButton} onClick={toggleSidebar}>
                        {!isSidebarOpen ?
                            <svg width="37" height="27" viewBox="0 0 37 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="37" height="5" rx="2.5" fill="#D9D9D9" />
                                <rect y="11" width="37" height="5" rx="2.5" fill="#D9D9D9" />
                                <rect y="22" width="37" height="5" rx="2.5" fill="#D9D9D9" />
                            </svg>
                            :
                            <svg width="25" height="25" viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3.53516" y="-1" width="49.9514" height="5" rx="2.5" transform="rotate(45 3.53516 -1)" fill="#D9D9D9" />
                                <rect x="-0.114258" y="34.278" width="49.8907" height="5" rx="2.5" transform="rotate(-45 -0.114258 34.278)" fill="#D9D9D9" />
                            </svg>

                        }

                    </button>

                </div>
                <h1 className={styles.articleTitle}>{article ? article.chapterName : 'Стаття зараз недоступна'}</h1>
                <div
                    className={`${styles.articleText} custom-text`}
                    dangerouslySetInnerHTML={{ __html: article ? article.text : 'Тут буде контент статті' }}
                />


                <section className={styles.commentsSection}>
                    <h2>Коментарі</h2>
                    <form className={styles.commentForm}>
                        <textarea placeholder="Додати коментар" className={styles.commentInput}></textarea>
                        <button type="submit" className={styles.submitButton}>Надіслати</button>
                    </form>

                    {comments.length > 0 ? comments.map(() =>
                        <div className={styles.comment}>
                            <p><strong>User Name</strong> - 1 хв. тому</p>
                            <p>Приклад коментаря до статті.</p>
                        </div>
                    ) :
                        <div>Коментарів поки нема</div>
                    }

                </section>
            </div>
        </div>
    );
};

export default ArticlePage;
