import React, { FC, useEffect, useState } from 'react';
import AddRecordInputRow from '../../../components/AddRecordInputRow/AddRecordInputRow';
import styles from './DirectoryPage.module.css';
import RecordType from '../../../components/RecordType/RecordType';
import useDirectoryManagerStore, { IArticle } from '../store/directoryManeger';
import ListEditor, { IListItem } from '../../../components/ListEditor/ListEditor';
import BlueButton from '../../../UI/BlueButton/BlueButton';
import { useNavigate, useParams } from 'react-router-dom';
import DirectoryManagerService from '../api/DirectoryManagerService';

interface DirectoryPageProps {
    action: 'create' | 'edit';
}

const DirectoryPage: FC<DirectoryPageProps> = ({ action }) => {
    const { directoryId } = useParams();
    const navigate = useNavigate();

    const [articlesList, setArticlesList] = useState<IListItem[]>();
    const addDirectory = useDirectoryManagerStore(state => state.addDirectory);
    const setFile = useDirectoryManagerStore(state => state.setFile);
    const file = useDirectoryManagerStore(state => state.file);
    const directoryName = useDirectoryManagerStore(state => state.directoryName);
    const setDirectoryName = useDirectoryManagerStore(state => state.setDirectoryName);
    const articles = useDirectoryManagerStore(state => state.articles);
    const firstArticles = useDirectoryManagerStore(store => store.firstArticles);
    const [firstFileName, setFirstFileName] = useState<string>('');

    const handleSetFile = (file: File | null) => {
        setFile(file);
    };

    const handleCreate = async () => {
        await addDirectory();
        navigate('/');
    };

    useEffect(() => {
        if (file && !firstFileName) {
            setFirstFileName(file.name); // Устанавливаем первоначальное имя файла только при первой загрузке
        }
    }, [file, firstFileName]);

    const handleUpdate = async () => {
        const editDirectoryDto = new FormData();
        editDirectoryDto.append('DirectoryId', String(directoryId));
        editDirectoryDto.append('DirectoryName', directoryName);

        if (file?.name && file?.name !== firstFileName) {
            editDirectoryDto.append('File', file as File);
        }
        
        try {
            await DirectoryManagerService.editDirectory(editDirectoryDto);

            // Удаляем старые статьи
            for (const article of firstArticles) {
                try {
                    await DirectoryManagerService.deleteArticle(article.articleId);
                } catch (deleteError) {
                    console.warn(`Failed to delete article with ID ${article.articleId}:`, deleteError);
                }
            }

            // Добавляем обновленные статьи
            for (const article of articles) {
                await DirectoryManagerService.addArticle({
                    articleName: article.articleName,
                    articleContent: article.articleContent,
                    directoryId: String(directoryId)
                });
            }
        } catch (e) {
            console.error(e);
        }

        navigate(`/reference/${directoryId}`);
    };

    const handleAction = () => {
        if (action === 'create') {
            handleCreate();
        } else {
            handleUpdate();
        }
    };

    useEffect(() => {
        const newArticlesList = articles.map(article => ({
            text: article.articleName,
            id: article.articleId
        }));
        setArticlesList(newArticlesList);
    }, [articles]);

    return (
        <div className={styles.main}>
            {action === 'create' && <RecordType recordType="directory" />}
            <AddRecordInputRow
                title="Назва довідника"
                placeholder="Введіть назву"
                value={directoryName}
                setValue={setDirectoryName}
                type="normal"
            />
            <AddRecordInputRow
                title="Фото"
                placeholder="Прикріпить фото"
                onFileChange={handleSetFile}
                type="file"
                file={file}
            />
            <div className={styles.text}>Статті</div>
            <ListEditor
                setList={setArticlesList}
                list={articlesList}
                itemPlaceholder="Нова стаття"
                type="article"
                isArticleEdit={action === 'edit'}
            />
            <BlueButton onClick={handleAction}>
                {action === 'create' ? 'Опублікувати' : 'Зберігти'}
            </BlueButton>
        </div>
    );
};

export default DirectoryPage;
