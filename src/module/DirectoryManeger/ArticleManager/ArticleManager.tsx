import React, { FC, useEffect, useState } from 'react'
import useDirectoryManagerStore from '../store/directoryManeger';
import TextEditor from '../../../components/TextEditor/TextEditor';
import styles from './ArticleManager.module.css'
import AddRecordInputRow from '../../../components/AddRecordInputRow/AddRecordInputRow';
import BlueButton from '../../../UI/BlueButton/BlueButton';
import { useNavigate, useParams } from 'react-router-dom';
import { RouteNames } from '../../../app/router';
import { v4 as uuidv4 } from 'uuid';
interface ArticleManagerProps{
    action: 'edit'| 'create',
    
}
const ArticleManager:FC<ArticleManagerProps> = ({action}) => {

    const navigate = useNavigate()

    const articles = useDirectoryManagerStore(state => state.articles);
    const setArticles = useDirectoryManagerStore(state => state.setArticles);
    const currentArticleId = useDirectoryManagerStore(state => state.currentArticleId);

    const addArticle = useDirectoryManagerStore(state => state.addArticle);
    const setPage = useDirectoryManagerStore(state => state.setPage);

    const [name, setName] = useState<string>('');
    const [content, setContent] = useState<string>('');
    
    const haldleBack = () =>{
        setPage('directory')
    }
    useEffect(() => {
        if (currentArticleId !== 'new') {
            const article = articles.find(article => article.articleId === currentArticleId);
            if (article) {
                setName(article.articleName)
                setContent(article.articleContent)
            }

            console.log(articles, article)
        }
    }, [])
    console.log('currentArticleId    ' + currentArticleId)
    const haldleSave = () => {
        console.log(currentArticleId)
        if (currentArticleId !== 'new' ) {
            console.log("ЗАМЕНА")
          
            console.log(articles)
            console.log(name,content,currentArticleId)
            setArticles(
                articles.map(article => (article.articleId == currentArticleId) ? { ...article, articleName: name, articleContent: content } : article)
            )
        } else {
            addArticle({
                articleContent: content,
                articleName: name,
                articleId: uuidv4()
            })
        }
        setPage('directory')
  
    }
    return (
        <div className={styles.main}>
            {action}
            <div className={styles.text}>
                Статті
            </div>
            <AddRecordInputRow
                title='Назва статті' placeholder='Введіть назву'
                value={name} setValue={setName}
                
                type={'normal'}
            />
            <TextEditor setValue={setContent} value={content} className={styles.content} />
            <BlueButton onClick={haldleSave}>
                Зберегти
            </BlueButton>
            <BlueButton onClick={haldleBack}>
                Повернутись
            </BlueButton>
        </div>
    )
}

export default ArticleManager
