import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useHeaderStore } from '../../layouts/Header/store/header';
import styles from '../AccountPage/AccountPage.module.css';

const EditProfilePage: React.FC = () => {
    const [username, setUsername] = useState("Kei_rin0");
    const [email, setEmail] = useState("Kei_rin0@Gmail.сom");
    const [password, setPassword] = useState("123#$^S");
    const [showPassword, setShowPassword] = useState(false); 
    const setHeaderVersion = useHeaderStore(store => store.setHeaderVersion);
    const navigate = useNavigate();

    useEffect(() => {
        setHeaderVersion('minimized');
        return () => setHeaderVersion('normal');
    }, []);

    const handlePhotoChange = () => alert("Змінити фото");
    const handleSave = () => alert("Зберегти зміни");
    const handleCancel = () => navigate('/account') ;

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.profilePage}>
            <div className={styles.sidebar}>
                <div className={styles.photoContainer} onClick={handlePhotoChange}>
                    <img src="path_to_avatar_image" alt="" className={styles.avatar} />
                    <div className={styles.photoOverlay}>+</div>
                </div>
                <div className={styles.usernameSection}>
                    <h2 className={styles.username}>{username}</h2>
                </div>
                <hr className={styles.smallSeparator} />
            </div>

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
                    
                    <label className={styles.label}>
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
                    </label>
                    
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
