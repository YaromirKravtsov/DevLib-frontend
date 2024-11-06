import React, { FC } from 'react';
import styles from './DirectoryContent.module.css';
import { Link, useParams } from 'react-router-dom';
import { IArticleItem } from '../models/article';


interface DirectoryContentProps {
  directory_name: string;
  articles: IArticleItem[];
}

const DirectoryContent: FC<DirectoryContentProps> = ({ directory_name, articles }) => {

  const { directoryId } = useParams<{ directoryId: string }>();
  return (


    <div className={styles.DirectoryContent}>
      <h1>{directory_name}</h1>
      <h3>Статті</h3>
      <ol>
        {articles.map((article, index) => (
          <li key={index}>
            <Link
              to={`/article/${article.articleId}`}
              state={{ directoryId: directoryId }}
            >{article.name}</Link>
          </li>
        ))}
      </ol>
    </div>
  )
};

export default DirectoryContent;
