import React, { useState } from 'react';
import styles from '../Forum.module.css';

interface DropdownProps {
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ isDropdownOpen, toggleDropdown }) => {
  const [selectedItem, setSelectedItem] = useState<string>(''); // Стан для збереження вибраного елемента

  const handleSelectItem = (item: string) => {
    setSelectedItem(item); // Оновлюємо вибраний елемент
    toggleDropdown(); // Закриваємо список після вибору
  };

  return (
    <div className={styles.dropdown}>
      <button onClick={toggleDropdown} className={`${styles.filterButton} ${isDropdownOpen ? styles.open : ''}`}>
        {selectedItem || 'Фільтрувати'} <span>&#9662;</span> {/* Виводимо вибраний елемент або текст за замовчуванням */}
      </button>
      <div className={`${styles.dropdownMenu} ${isDropdownOpen ? styles.open : ''}`}>
        <div className={styles.dropdownItem} onClick={() => handleSelectItem('За весь час')}>
          За весь час
        </div>
        <div className={styles.dropdownItem} onClick={() => handleSelectItem('Минулій рік')}>
          Минулій рік
        </div>
        <div className={styles.dropdownItem} onClick={() => handleSelectItem('Минулій місяць')}>
          Минулій місяць
        </div>
        <div className={styles.dropdownItem} onClick={() => handleSelectItem('Минулій тиждень')}>
          Минулій тиждень
        </div>
        <div className={styles.dropdownItem} onClick={() => handleSelectItem('Сьогодні')}>
          Сьогодні
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
