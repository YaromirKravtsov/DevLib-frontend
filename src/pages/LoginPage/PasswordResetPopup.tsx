import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PasswordResetPopup.module.css';
import { RouteNames } from '../../app/router';

interface PasswordResetPopupProps {
    onClose: () => void;
}

const PasswordResetPopup: React.FC<PasswordResetPopupProps> = ({ onClose }) => {
    const [email, setEmail] = React.useState<string>('');
    const navigate = useNavigate();

    const handlePasswordReset = () => {
        // Логіка для скидання паролю
        console.log(`Скидання паролю для: ${email}`);
        onClose();
        navigate(RouteNames.PASSWORDFORGETRESET); // перенаправлення на сторінку PasswordForgetReset
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
