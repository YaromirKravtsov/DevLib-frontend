
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReferencePageService from './api/ReferencePageService';
import DirectoryContent from './components/DirectoryContent';
import { useHeaderStore } from '../../layouts/Header/store/header';
import { IArticleItem } from './models/article';
import { IDirectory } from '../../models/IDirectory';



const ReferencePage: React.FC = () => {
  const setHeaderVersion = useHeaderStore(store => store.setHeaderVersion);
  const { directoryId } = useParams<{ directoryId: string }>();
  const [articles, setArticles] = useState<IArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [directory, setDirectory] = useState<IDirectory>();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const { data } = await ReferencePageService.getDirectory(directoryId!);
        setArticles(data.articles);
        setDirectory(data);
      } catch (error) {
        console.error("Error loading articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [directoryId]);
  setHeaderVersion('minimized')
  if (loading) return <p>Завантаження...</p>;

  return (
    <>
      <DirectoryContent
        directory_name={`${directory?.directoryName}`} // Optionally display directory name if needed
        articles={articles}
      />
      {!articles.length && <p>Статті не знайдені.</p>}
    </>
  );
};

export default ReferencePage;
