import React, { useEffect, useState } from 'react'
import styles from './Header.module.css';
import logoImage from '../../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { RouteNames } from '../../app/router';
import { useAuthStore } from '../../app/store/auth';

import { useHeaderStore } from './store/header';
import SearchInput from './components/SearchInput/SearchInput';

interface FilterItem {
    text: string,
    active: boolean,
    url: string
}


const Header = () => {
    const role = useAuthStore(store => store.role);
    const isLoggedIn = useAuthStore(store => store.loggedIn);
    const logout = useAuthStore(store => store.logout);

    const setFilterValue = useHeaderStore(store => store.setFilterValue);
    const headerVersion = useHeaderStore(store => store.headerVersion)




    const [filet, setFilter] = useState<FilterItem[]>([
        {
            text: 'Книги',
            active: true,
            url: RouteNames.BOOKS
        },
        {
            text: 'Довідники',
            active: false,
            url: RouteNames.DIRECTORIES
        },
        {
            text: 'Форум',
            active: false,
            url: RouteNames.FORUM
        }
    ]);

    const setActive = (text: string) => {

        setFilterValue(text)
        setFilter(prev =>
            prev.map(filter => ({
                ...filter,
                active: filter.text === text
            }))
        );

    }

    return (
        <div className={`${styles.header} container ${headerVersion == 'small' && styles.small}  ${headerVersion == 'minimized' && styles.minimized}`}>
            <div className={styles.top}>
                <Link to={RouteNames.MAIN}><img src={logoImage} alt="" className={styles.logo} /></Link>
                {headerVersion == 'small'
                    &&
                    <SearchInput />
                }


                <div className={styles.iconsRow}>
                

                    {isLoggedIn ?
                        <button className={styles.icon} onClick={logout}
                        >
                            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_409_995)">
                                    <path d="M45.4624 0.0312805C45.4106 0.0270844 45.3667 0 45.3125 0H22.9168C19.471 0 16.6668 2.80418 16.6668 6.25V8.33321C16.6668 9.48334 17.5999 10.4168 18.75 10.4168C19.9001 10.4168 20.8332 9.48334 20.8332 8.33321V6.25C20.8332 5.10216 21.7686 4.16679 22.9168 4.16679H32.6229L31.9874 4.37927C30.3002 4.96254 29.1668 6.55212 29.1668 8.33321V39.5832H22.9168C21.7686 39.5832 20.8332 38.6478 20.8332 37.5V33.3332C20.8332 32.1835 19.9001 31.25 18.75 31.25C17.5999 31.25 16.6668 32.1835 16.6668 33.3332V37.5C16.6668 40.9458 19.471 43.75 22.9168 43.75H29.1668V45.8332C29.1668 48.1312 31.0352 50 33.3332 50C33.7792 50 34.2022 49.9355 34.6604 49.7936L47.1771 45.6207C48.8667 45.0375 50 43.4479 50 41.6668V4.16679C50 1.73759 47.9061 -0.166702 45.4624 0.0312805Z" fill="#6FC3FF" />
                                    <path d="M22.3061 19.3604L13.9729 11.0271C13.377 10.4313 12.4813 10.252 11.702 10.5751C10.9249 10.8978 10.4168 11.6585 10.4168 12.5V18.75H2.08321C0.933457 18.75 0 19.6835 0 20.8332C0 21.9833 0.933457 22.9168 2.08321 22.9168H10.4168V29.1668C10.4168 30.0083 10.9249 30.7686 11.702 31.0917C12.4813 31.4144 13.377 31.2355 13.9729 30.6396L22.3061 22.3061C23.1209 21.4916 23.1209 20.1752 22.3061 19.3604Z" fill="#6FC3FF" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_409_995">
                                        <rect width="50" height="50" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>



                        </button>
                        :
                        <Link className={styles.icon} to={RouteNames.LOGIN}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 4H20C20.2652 4 20.5196 4.10536 20.7071 4.29289C20.8946 4.48043 21 4.73478 21 5V19C21 19.2652 20.8946 19.5196 20.7071 19.7071C20.5196 19.8946 20.2652 20 20 20H17M10.56 18.35L9 17.05C8.90019 16.9646 8.81817 16.8605 8.75862 16.7434C8.69908 16.6264 8.66317 16.4987 8.65296 16.3678C8.64274 16.2369 8.65842 16.1052 8.69909 15.9803C8.73976 15.8554 8.80463 15.7398 8.89 15.64L10.34 14H3V10H10.34L8.93 8.36C8.76773 8.16639 8.68474 7.91853 8.69773 7.66624C8.71072 7.41395 8.81871 7.17593 9 7L10.52 5.7C10.6178 5.60057 10.7354 5.5227 10.8651 5.47142C10.9949 5.42013 11.1339 5.39656 11.2733 5.40221C11.4127 5.40786 11.5493 5.44261 11.6745 5.50423C11.7996 5.56585 11.9105 5.65297 12 5.76L16.79 11.35C16.9449 11.5311 17.0301 11.7616 17.0301 12C17.0301 12.2384 16.9449 12.4689 16.79 12.65L12 18.24C11.9143 18.3443 11.8085 18.4301 11.6888 18.4924C11.5691 18.5546 11.438 18.592 11.3035 18.6023C11.1689 18.6126 11.0337 18.5955 10.9059 18.5522C10.7782 18.5088 10.6605 18.44 10.56 18.35Z" stroke="#6FC3FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </Link>
                    }

                    {
                        role == 'admin' &&
                        <>
                            <Link className={styles.icon} to={RouteNames.TAG_MANAGER}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.48 21L11.31 3M5 9H20H5ZM4 15H19H4ZM17.52 3L12.69 21L17.52 3Z" stroke="#6FC3FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </Link>

                        </>
                    }
                  
                    {
                        role == 'user' &&
                        <>
                            <Link className={styles.icon} to={RouteNames.BOOK_MARKS}>
                                <svg viewBox="0 0 38 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.2596 31.536L17.2574 31.534C12.3356 27.0318 8.37065 23.3966 5.61857 20.0001C2.88337 16.6244 1.5 13.6657 1.5 10.5417C1.5 5.43701 5.43697 1.5 10.45 1.5C13.2977 1.5 16.0593 2.8451 17.8575 4.95867L19 6.30147L20.1425 4.95867C21.9407 2.8451 24.7023 1.5 27.55 1.5C32.563 1.5 36.5 5.43701 36.5 10.5417C36.5 13.6657 35.1166 16.6244 32.3814 20.0001C29.6294 23.3966 25.6644 27.0318 20.7426 31.534L20.7404 31.536L19 33.1343L17.2596 31.536Z" stroke="#6FC3FF" stroke-width="3" />
                                </svg>
                            </Link>

                        </>
                    }
                    {isLoggedIn &&
                        <Link className={styles.icon} to={role == 'admin' ? RouteNames.ADD_BOOK : RouteNames.ACCOUNT}>
                            <svg viewBox="0 0 35 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.7168 16.8C21.9371 16.8 25.3584 13.4869 25.3584 9.4C25.3584 5.31309 21.9371 2 17.7168 2C13.4965 2 10.0752 5.31309 10.0752 9.4C10.0752 13.4869 13.4965 16.8 17.7168 16.8Z" stroke="#6FC3FF" stroke-width="3" />
                                <path d="M33 30.675C33 35.2723 33 39 17.7168 39C2.43359 39 2.43359 35.2723 2.43359 30.675C2.43359 26.0778 9.27665 22.35 17.7168 22.35C26.157 22.35 33 26.0778 33 30.675Z" stroke="#6FC3FF" stroke-width="3" />
                            </svg>
                        </Link>
                    }

                </div>

            </div>
            {headerVersion == 'minimized' ? <></> :
                <div className={styles.bottom}>
                    {headerVersion == 'normal'
                        &&
                        <SearchInput />
                    }

                    <div className={styles.filterRow}>
                        {filet.map(filterItem =>
                            <Link to={filterItem.url} className={`${styles.filterItem} ${filterItem.active && styles.active}`}
                                onClick={() => setActive(filterItem.text)}
                            >{filterItem.text}</Link>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}

export default Header
