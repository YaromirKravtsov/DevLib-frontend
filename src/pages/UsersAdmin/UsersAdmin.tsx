import React, { useState, useEffect } from 'react';
import styles from './UsersAdmin.module.css';
import Dropdown from './components/Dropdown';
import { useHeaderStore } from '../../layouts/Header/store/header';
import { getUsers, assignModeratorRole, banUser, User } from './api/UsersAdminService';

const UsersAdmin: React.FC = () => {
    const setHeaderVersion = useHeaderStore((store) => store.setHeaderVersion);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // Стан для фільтрованих користувачів
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>(''); // Стан для фільтра

    useEffect(() => {
        setHeaderVersion('normal'); // Встановлюємо стандартний хедер
    }, [setHeaderVersion]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await getUsers();
                console.log("Fetched users:", fetchedUsers); // Логування отриманих користувачів
                setUsers(fetchedUsers);
                setFilteredUsers(fetchedUsers); // Завантажуємо всі користувачів до filteredUsers
            } catch (err: any) {
                setError(err.message || "Помилка завантаження користувачів.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (filter === 'Заблоковані') {
            setFilteredUsers(users.filter((user) => user.isBanned)); // Фільтруємо заблокованих
        } else if (filter === 'Не заблоковані') {
            setFilteredUsers(users.filter((user) => !user.isBanned)); // Фільтруємо незаблокованих
        } else if (filter === 'Всі користувачі') {
            setFilteredUsers(users); // Виводимо всіх користувачів
        } else {
            setFilteredUsers(users); // Якщо фільтр не вибрано, показуємо всіх
        }
    }, [filter, users]);

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleFilterSelect = (filter: string) => {
        setFilter(filter);
    };

    const handleAssignModerator = async (userId: string) => {
        try {
            console.log("Assigning moderator role to userId:", userId); // Логування для перевірки
            await assignModeratorRole(userId); // Надання прав модератора через API

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId ? { ...user, isModerator: true } : user // Оновлюємо статус модератора
                )
            );
            alert('Права модератора надано');
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleBanUser = async (userId: string, isBanned: boolean) => {
        console.log("Banning userId:", userId, "isBanned:", isBanned); // Перевіряємо правильний userId
        try {
            await banUser(userId, isBanned); // Викликаємо API для блокування/розблокування
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId ? { ...user, isBanned: isBanned } : user // Оновлюємо статус блокування
                )
            );
            alert(isBanned ? 'Користувача заблоковано' : 'Користувача розблоковано');
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div>Завантаження...</div>;
    }

    if (error) {
        return <div className={styles.error}>Помилка: {error}</div>;
    }

    return (
        <div className={styles.adminPage}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Користувачі</h1>
                    <Dropdown isDropdownOpen={isDropdownOpen} toggleDropdown={toggleDropdown} onFilterSelect={handleFilterSelect} />
                </div>
                <div className={styles.usersList}>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => ( // Використовуємо filteredUsers замість users
                            <div key={user.id} className={styles.userItem}>
                                <img src={user.photo} alt={user.username} className={styles.userImage} />
                                <span className={styles.userName}>{user.username}</span>
                                <div className={styles.buttons}>
                                    <button
                                        className={`${styles.moderatorButton} ${user.isModerator ? styles.disabled : ''}`} // Додаємо клас для неактивної кнопки
                                        onClick={() => handleAssignModerator(user.id)}
                                        disabled={user.isModerator} // Задаємо атрибут disabled
                                    >
                                        {user.isModerator ? 'Модератор' : 'Надати права модератора'}
                                    </button>
                                    <button
                                        className={styles.blockButton}
                                        onClick={() => handleBanUser(user.id, !user.isBanned)} 
                                    >
                                        {user.isBanned ? 'Розблокувати' : 'Заблокувати'}
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Користувачі не знайдені</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UsersAdmin;
