import React, { MouseEvent, useEffect, useState } from 'react';
import styles from './TagList.module.css';
import useTagStore from '../../store/tag';
import { ITag } from '../../../../models/ITag';
/* import { truncateString } from '../../../../helpers/truncateString';
import { ITag } from '../../../../models/tag'; // Переименуйте модель для тегов
import useTagStore from '../../store/tags'; // Используем новый Zustand стейт для тегов
 */
const TagList = () => {
    const tags = useTagStore(store => store.tags);
    const deleteTag = useTagStore(store => store.deleteTag);
    const fetchTags = useTagStore(store => store.fetchTags);
    const setTagName = useTagStore(store => store.setTagName);
    const setEditMode = useTagStore(store => store.setEditMode);
    const setEditTagId = useTagStore(store => store.setEditTagId);

    const [draggedTagId, setDraggedTagId] = useState<string | null>(null);
    const [draggedOverTagId, setDraggedOverTagId] = useState<string | null>(null);

    const handleEdit = (event: MouseEvent<HTMLSpanElement>, id: string) => {
        setEditTagId(id);
        event.stopPropagation();
        setEditMode(true);
        const tag = tags.find(tag => tag.tagId === id) as ITag;
        setTagName(tag.tagText);
 
    };

    const handleDelete = (event: MouseEvent<HTMLSpanElement>, id: string) => {
        event.stopPropagation();
        const userConfirmed = window.confirm('Ви впевнені, що хочете видалити тег?');
        if (!userConfirmed) return;
        console.log(id)
        deleteTag(id);
    };

    useEffect(() => {
        fetchTags();
    }, []);

    return (
        <div className={styles.main}>
            <div className={styles.titles}>
                <span>Назва тегу</span>
                <div className={styles.titlesRight}>
                    <span>Видалення</span>
                </div>
            </div>
            <div className={styles.list}>
                {tags.map(tag => (
                    <div
                        className={`${styles.item} ${draggedOverTagId === tag.tagId ? styles.dragOver : ''}`}
                        key={tag.tagId}
                        draggable

                        onClick={(event) => handleEdit(event, tag.tagId)}
                    >
                        <span>{tag.tagText}</span>
                 
                        <div className={styles.itemRight}>
                      
                            <span className={styles.delete} onClick={(event) => handleDelete(event, tag.tagId)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4 7H20H4ZM16 7V4C16 3.73478 15.8946 3.48043 15.7071 3.29289C15.5196 3.10536 15.2652 3 15 3H9C8.73478 3 8.48043 3.10536 8.29289 3.29289C8.10536 3.48043 8 3.73478 8 4V7H16ZM18 20V7H6V20C6 20.2652 6.10536 20.5196 6.29289 20.7071C6.48043 20.8946 6.73478 21 7 21H17C17.2652 21 17.5196 20.8946 17.7071 20.7071C17.8946 20.5196 18 20.2652 18 20Z"
                                        stroke="black"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagList;
