import React, { FC, useEffect, useState } from 'react';
import styles from './DirectoryManeger.module.css';
import useDirectoryManagerStore, { IArticle } from './store/directoryManeger';
import { useNavigate } from 'react-router-dom';
import DirectoryService from '../../api/DirectoryService';
import { urlToFile } from '../../helpers/urlToFile';
import DirectoryManagerService from './api/DirectoryManagerService';
import DirectoryPage from './DirectoryPage/DirectoryPage';
import ArticleManager from './ArticleManager/ArticleManager';
import { IListItem } from '../../components/ListEditor/ListEditor';

interface DirectoryManegerProps {
    action: 'create' | 'edit';
    directoryId?: string;
}

const DirectoryManeger: FC<DirectoryManegerProps> = ({ action, directoryId }) => {
    const navigate = useNavigate();
    const addDirectory = useDirectoryManagerStore(state => state.addDirectory);
    const setFile = useDirectoryManagerStore(state => state.setFile);
    const file = useDirectoryManagerStore(state => state.file);
    const directoryName = useDirectoryManagerStore(state => state.directoryName);
    const setDirectoryName = useDirectoryManagerStore(state => state.setDirectoryName);
    const articles = useDirectoryManagerStore(state => state.articles);
    const setArticles = useDirectoryManagerStore(state => state.setArticles);
    const setFirstArticles = useDirectoryManagerStore(store => store.setFirstArticles);
    const setIsFirstLoad = useDirectoryManagerStore(store => store.setIsFirstLoad);
    const page = useDirectoryManagerStore(state => state.page);
    const setPage = useDirectoryManagerStore(state => state.setPage);
    const resetState = useDirectoryManagerStore(store => store.resetState);

    const [articlesList, setArticlesList] = useState<IListItem[]>();

    useEffect(() => {
        const initializeData = async () => {
            const { data } = await DirectoryService.getDirectory(String(directoryId));
            setDirectoryName(data.directoryName);

            // Загрузка изображения
            const fileUrl = data.imgLink;
            urlToFile(fileUrl).then((file) => {
                if (file) {
                    setFile(file);
                } else {
                    console.log('Не удалось получить файл.');
                }
            });

            // Загрузка статей
            let fetchedArticles: IArticle[] = [];
            for (const element of data.articles) {
                const { data: articleData } = await DirectoryManagerService.getArticle(element.articleId);
                fetchedArticles = [
                    ...fetchedArticles,
                    {
                        articleName: articleData.chapterName,
                        articleContent: articleData.text,
                        directoryId: articleData.directoryId,
                        articleId: articleData.articleId
                    }
                ];
            }

            // Устанавливаем статьи и запоминаем их как изначальные
            setArticles(fetchedArticles);
            setFirstArticles(fetchedArticles); // Устанавливаем первоначальные статьи только при первой загрузке
            setIsFirstLoad(false); // Сбрасываем флаг первой загрузки

            setArticlesList(
                data.articles.map(article => ({
                    text: article.name,
                    id: article.articleId
                }))
            );
        };

        if (action === 'edit' && directoryId) {
            initializeData();
        }

        return () => resetState();
    }, [directoryId, action, resetState, setArticles, setFirstArticles, setDirectoryName, setFile, setIsFirstLoad]);

    if (page === 'directory') {
        return <DirectoryPage action={action} />;
    } else {
        return <ArticleManager action={action} />;
    }
};

export default DirectoryManeger;
