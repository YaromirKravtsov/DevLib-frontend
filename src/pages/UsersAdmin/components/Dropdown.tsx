import React, { useState } from 'react';
import styles from '../UsersAdmin.module.css';

interface DropdownProps {
    isDropdownOpen: boolean;
    toggleDropdown: () => void;
    onFilterSelect: (filter: string) => void; // Додаємо пропс для фільтрації
}

const Dropdown: React.FC<DropdownProps> = ({ isDropdownOpen, toggleDropdown, onFilterSelect }) => {
    const [selectedItem, setSelectedItem] = useState<string>(''); // Стан для збереження вибраного елемента

    const handleSelectItem = (item: string) => {
        setSelectedItem(item); // Оновлюємо вибраний елемент
        onFilterSelect(item); // Передаємо фільтр до батьківського компонента
        toggleDropdown(); // Закриваємо список після вибору
    };

    return (
        <div className={styles.dropdown}>
            <button onClick={toggleDropdown} className={`${styles.filterButton} ${isDropdownOpen ? styles.open : ''}`}>
                {selectedItem || 'Фільтрувати'} <span>&#9662;</span> {/* Виводимо вибраний елемент або текст за замовчуванням */}
            </button>
            <div className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.open : ''}`}>
                <div className={styles.dropdownItem} onClick={() => handleSelectItem('Заблоковані')}>
                    Заблоковані
                </div>
                <div className={styles.dropdownItem} onClick={() => handleSelectItem('Не заблоковані')}>
                    Не заблоковані
                </div>
                <div className={styles.dropdownItem} onClick={() => handleSelectItem('Всі користувачі')}>
                    Всі користувачі
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
