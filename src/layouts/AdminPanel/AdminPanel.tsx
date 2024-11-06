import React, { useEffect, useState } from 'react'
import styles from './AdminPanel.module.css'
import { useHeaderStore } from '../Header/store/header';
import { RouteNames } from '../../app/router';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
interface NavList {
    text: string,
    url: RouteNames,
    active: boolean
}
const AdminPanel = () => {
    const setHeaderVersion = useHeaderStore(store => store.setHeaderVersion);
    const [navList, setNavList] = useState<NavList[]>([
        {
            text: 'Додати матеріал',
            url: RouteNames.ADD_BOOK,
            active: true
        },
        {
            text: 'Форум',
            url: RouteNames.FORUM,
            active: false
        },
        {
            text: 'Користувачі',
            url: RouteNames.USERS_ADMIN,
            active: false
        }
    ]);
    useEffect(() => {
        setHeaderVersion('minimized')
    }, [])
    const setActive = (text: string) => {

        setNavList(prev =>
            prev.map(filter => ({
                ...filter,
                active: filter.text === text
            }))
        );

    }
    return (
        <div className={styles.main}>
            <div className={styles.title}>
                Admin Panel
            </div>
            <div className={styles.navList}>
                {navList.map(navItem =>
                    <Link to = {navItem.url} onClick={()=> setActive(navItem.text)}
                    className={`${styles.navItem} ${navItem.active && styles.active}`}
                    >{navItem.text}</Link>
                )}
            </div>
        </div>
    )
}

export default AdminPanel
