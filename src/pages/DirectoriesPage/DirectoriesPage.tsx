import React, { useEffect, useState } from 'react';

import DirectorItem from '../../components/DirectorItem/DirectorItem';
import styles from './DirectoriesPage.module.css'; // Імпорт стилів
import DirectoriesPageService from './api/DirectoriesPageService'; // Імпорт сервісу
import { useHeaderStore } from '../../layouts/Header/store/header';
import { IDirectoryItem } from '../../models/IDirectoryItem';

const DirectoriesPage = () => {
    const [directories, setDirectories] = useState<IDirectoryItem[]>([]);
    const setHeaderVersion = useHeaderStore(store => store.setHeaderVersion)
    useEffect(() => {
        setHeaderVersion('normal')
        const fetchDirectories = async () => {
            try {
                const directoriesData = await DirectoriesPageService.getDirectories(); // Не передаємо параметр

                setDirectories(directoriesData);
            } catch (error) {
                console.error("Error fetching directories:", error);
            }
        };

        fetchDirectories();
    }, []);

    return (
        <div className={`${styles.directories} container`}>
            {directories.length === 0 ? (
                <p>Немає доступних довідників.</p>
            ) : (
                directories.map((directory) =>
                    <DirectorItem key={directory.directoryId} directory={directory} />
                )
            )}
        </div>
    );
};

export default DirectoriesPage;
