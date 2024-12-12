import React, {FC, useState} from 'react';
import styles from './DirectoryContent.module.css';
import { FaArrowLeft, FaShareAlt, FaClipboard  } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { IArticleItem } from '../models/article';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon } from 'react-share';



interface DirectoryContentProps {
  directory_name: string;
  articles: IArticleItem[];
}

const DirectoryContent: FC<DirectoryContentProps> = ({ directory_name, articles }) => {

  const [menuVisible, setMenuVisible] = useState(false);
  const { directoryId } = useParams<{ directoryId: string }>();
  const shareUrl = `${window.location.origin}/reference/${directoryId}`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert(' Адресу скопійовано в буфер обміну!');
  };
  return (


    <div className={styles.DirectoryContent}>
      <div className={styles.contentHeader}>
      <h1>{directory_name}</h1> 
      <button className={styles.shareButton} onClick={() => setMenuVisible(!menuVisible)}>
          <FaShareAlt />
        </button>
        {menuVisible && (
          <div className={styles.shareMenu}>
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton url={shareUrl}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <button onClick={copyToClipboard}>
              <FaClipboard size={25} />
            </button>
          </div>
        )}
        </div>
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
