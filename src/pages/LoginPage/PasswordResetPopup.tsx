import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PasswordResetPopup.module.css';
import { RouteNames } from '../../app/router';
import { resetPassword } from './api/PasswordResetPopupService';

interface PasswordResetPopupProps {
    onClose: () => void;
}

const PasswordResetPopup: React.FC<PasswordResetPopupProps> = ({ onClose }) => {
    const [email, setEmail] = React.useState<string>('');

    const handlePasswordReset = async () => {
        try {
            const clientUri = `${window.location.origin}/reset-user-password`;
            await resetPassword({ email, clientUri }); // Виклик API
            alert("На вашу пошту надіслано посилання для скидання паролю.");
            onClose();
        } catch (err) {
            alert("Не вдалося скинути пароль. Перевірте введену пошту.");
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <button className={styles.closeButton} onClick={onClose}>✖</button>
                <h2 className={styles.title}>Введіть пошту</h2>
                <input
                    type="email"
                    placeholder="Поштова адреса"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                />
                <button onClick={handlePasswordReset} className={styles.resetButton}>
                    Скинути пароль
                </button>
            </div>
        </div>
    );
};

export default PasswordResetPopup;
