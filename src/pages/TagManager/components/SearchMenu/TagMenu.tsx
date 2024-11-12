import React, { useState } from 'react';
import styles from './TagMenu.module.css';
import MyInput from '../../../../UI/MyInput/MyInput';
import useTagStore from '../../store/tag';
import BlueButton from '../../../../UI/BlueButton/BlueButton';

const TagMenu = () => {
    const tagName = useTagStore(store => store.tagName);
    const setTagName = useTagStore(store => store.setTagName);

    const createTag = useTagStore(store => store.createTag);
    const editMode = useTagStore(store => store.editMode);
    const editTag = useTagStore(store => store.editTag);
    const setEditMode = useTagStore(store => store.setEditMode);
    const clearTagFields = useTagStore(store => store.clearTagFields);

    const [tagNameError, setTagNameError] = useState<boolean>(false);
    const [tagUrlError, setTagUrlError] = useState<boolean>(false);

    const handleCreate = async () => {
        setEditMode(false);
        const isTagNameEmpty = tagName.trim() === '';


        setTagNameError(isTagNameEmpty);


        if (isTagNameEmpty) return;

        await createTag();
    };

    const handleEdit = async () => {
        await editTag();
        setEditMode(false);
        clearTagFields();
    };

    return (
        <div className={styles.main}>
            <MyInput
                setValue={setTagName}
                value={tagName}
                placeholder='Назва тегу'
                type='text'
                hasError={tagNameError}
                errorText='Заповніть це поле, будь ласка'
                className={styles.input}
            />
            <div className={styles.buttonRow}>
                {editMode && (
                    <BlueButton className={styles.button} onClick={handleEdit}>
                        Bearbeiten
                    </BlueButton>
                )}
                <BlueButton className={styles.button} onClick={handleCreate}>
                    Erstellen
                </BlueButton>
            </div>
        </div>
    );
};

export default TagMenu;
