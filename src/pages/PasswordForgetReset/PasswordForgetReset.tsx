import React, { useState, useEffect } from 'react';
import AppLayout from '../../layouts/AppLayout/AppLayout';
import { useNavigate } from 'react-router-dom';
import { useHeaderStore } from '../../layouts/Header/store/header';
import styles from './PasswordForgetReset.module.css';
import MyInput from '../../UI/MyInput/MyInput';

const PasswordForgetReset = () => {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const setHeaderVersion = useHeaderStore(store => store.setHeaderVersion);
    const navigate = useNavigate();

    useEffect(() => {
        setHeaderVersion('minimized');
        return () => setHeaderVersion('normal');
    }, [setHeaderVersion]);

    const handlePasswordReset = () => {
        if (password !== confirmPassword) {
            setError('Паролі не співпадають');
            return;
        }

        setError('');

        // Тут можна додати виклик API для скидання пароля
        console.log('Зміна пароля:', { password, confirmPassword });

        // Перенаправлення на сторінку логіну після успішної зміни пароля
        navigate('/login');
    };

    return (
        <div className={styles.main}>
            <div className={styles.title}>Змінити пароль</div>
            <div className={styles.inputRow}>
                <MyInput
                    placeholder="Пароль"
                    value={password}
                    setValue={setPassword}
                    type="password"
                />
                <MyInput
                    placeholder="Підтвердіть пароль"
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                    type="password"
                />
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <button className={styles.changeButton} onClick={handlePasswordReset}>
                Змінити
            </button>
        </div>
    );
};

export default PasswordForgetReset;
