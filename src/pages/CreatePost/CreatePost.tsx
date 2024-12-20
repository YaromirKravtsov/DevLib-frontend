import React, { useState } from 'react'
import styles from './CreatePost.module.css';
import MyInput from '../../UI/MyInput/MyInput';
import TextEditor from '../../components/TextEditor/TextEditor';
import { CreatePostServoce } from './api/CreatePostService';
import { useAuthStore } from '../../app/store/auth';
import { useNavigate } from 'react-router-dom';
import AddRecordInputRow from '../../components/AddRecordInputRow/AddRecordInputRow';

const CreatePost = () => {
    const [postName, setPostName] = useState<string>('');
    const [text, setText] = useState<string>('');
    const userId = useAuthStore(store => store.userId)
    const naviagte = useNavigate();
    const [file,setFile] = useState<File | null>()
    
    const handleSetFile = (file: File | null) => {
        setFile(file);
    };

    const handleCreatePost = async () => {
        const formData: FormData = new FormData();
        formData.append('postName', postName)
        formData.append('text', text)
        formData.append('userId', userId)
        formData.append('File', file as File)
        const { data } = await CreatePostServoce.createPost(formData);
        await alert('Пост успішно створено')
        await naviagte('/post/' + data)
    }
 
    return (
        <div className={styles.main}>
            <div className={styles.title}>Створити пост</div>
            <MyInput setValue={setPostName} value={postName} placeholder='Тема' />
            <AddRecordInputRow
                title="Фото"
                placeholder="Прикріпить фото"
                onFileChange={handleSetFile}
                type="file"
                file={file}
            />
            <TextEditor setValue={setText} value={text} className={styles.text} />
       
            <button
                onClick={handleCreatePost}
                className={styles.publish}>Опублікувати</button>
        </div>
    )
}

export default CreatePost;
