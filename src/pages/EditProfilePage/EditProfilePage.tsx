import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useHeaderStore } from '../../layouts/Header/store/header';
import styles from './EditProfilePage.module.css';
import { useAuthStore } from '../../app/store/auth';
import { EditProfilePageService, EditUserInfoDto } from './api/EditProfilePageService';
import { validateStringFields } from '../../helpers/checkStringFields';

const EditProfilePage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); 
    const setHeaderVersion = useHeaderStore(store => store.setHeaderVersion);
    const navigate = useNavigate();
    const userId = useAuthStore(store=> store.userId);

    const fetchUserInfo = async () =>{
        const {data} = await EditProfilePageService.getUserInfo(userId);
        setUsername(data.username);
        setEmail(data.email)
    }
    useEffect(() => {
        setHeaderVersion('minimized');
        fetchUserInfo()
        return () => setHeaderVersion('normal');
 
    }, []);
/* 
    const handlePhotoChange = () => alert("Змінити фото"); */
    const handleSave = async () => {
        const faormData:FormData = new FormData;
        faormData.append('UserId', userId)
        faormData.append('UserName', username)
        faormData.append('Email', email)
        if(validateStringFields({userId,username,email})){
            await EditProfilePageService.editUserInfo(faormData);
            await alert('Данні успішно оновленно!')
        }
    }
    const handleCancel = () => navigate(-1) ;

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.profilePage}>
          {/*   <div className={styles.sidebar}>
                {userId} dfdf
                <div className={styles.photoContainer} onClick={handlePhotoChange}>
                    <img src="path_to_avatar_image" alt="" className={styles.avatar} />
                    <div className={styles.photoOverlay}>+</div>
                </div>
                <div className={styles.usernameSection}>
                    <h2 className={styles.username}>{username}</h2>
                </div>
                <hr className={styles.smallSeparator} />
            </div>
 */}

            <div className={styles.content}>
                <h2 className={styles.title}>РЕДАГУВАТИ ПРОФІЛЬ</h2>
                
                <form className={styles.form}>
                    <label className={styles.label}>
                        Ім'я Користувача
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={styles.input}
                        />
                    </label>
                    
                    <label className={styles.label}>
                        Електронна Пошта
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                        />
                    </label>
                    
                 {/*    <label className={styles.label}>
                        Пароль
                        <div className={styles.passwordContainer}>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.input}
                            />
                            <span
                                className={styles.eyeIcon}
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                    </label> */}
                    
                    <div className={styles.buttonContainer}>
                        <button type="button" className={styles.cancelButton} onClick={handleCancel}>
                            Відмінити
                        </button>
                        <button type="button" className={styles.saveButton} onClick={handleSave}>
                            Зберегти
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfilePage;
