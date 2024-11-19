import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useHeaderStore } from '../../layouts/Header/store/header';
import styles from './PasswordForgetReset.module.css';
import MyInput from '../../UI/MyInput/MyInput';
import { resetUserPassword } from './api/PasswordForgetResetService';

const PasswordForgetReset = () => {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const setHeaderVersion = useHeaderStore((store) => store.setHeaderVersion);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setHeaderVersion('minimized');
        return () => setHeaderVersion('normal');
    }, [setHeaderVersion]);

    const handlePasswordReset = async () => {
        if (password !== confirmPassword) {
            setError('Паролі не співпадають');
            return;
        }

        setError('');

        try {
            const queryParams = new URLSearchParams(location.search);
            const email = queryParams.get('email');
            const token = queryParams.get('token');

            // Перевірка на наявність параметрів email та token у URL
            if (!email || !token) {
                setError('Посилання для скидання пароля некоректне.');
                return;
            }

            // Логування параметрів URL
            console.log('Отримані параметри URL: email -', email, ', token -', token);

            // Надсилаємо запит на зміну пароля
            await resetUserPassword({ password, confirmPassword, email, token });
            alert('Пароль успішно змінено');
            navigate('/login');
        } catch (err) {
            console.error('Помилка при зміні пароля:', err);
            setError('Не вдалося змінити пароль. Спробуйте ще раз.');
            if (err instanceof Error) {
                console.error('Текст помилки:', err.message); // Лог тексту помилки
            }
        }
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
