import { Suspense, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { RouteNames, adminRoutes, publicRoutes, userRoutes, } from '.';
import Loader from '../../UI/Loader/Loader';
import { useAuthStore } from '../store/auth';



const AppRouter = () => {
    const role = useAuthStore(state => state.role)
    const isLoading = useAuthStore(state => state.isLoading)
    const setIsLoadingAuth = useAuthStore(state => state.setIsLoading);
    const setLoggedIn = useAuthStore(state => state.setLoggedIn)
    const checkAuth = useAuthStore(state => state.checkAuth)

    useEffect(() => {
        /* setLoggedIn(true); // значения обозначающее зарегестрирован ли пользователь 
        setRole('user') // // значения обозначающее роль пользователя
        setIsLoadingAuth(false) */
        checkAuth()
    }, [])

    return (
        <Routes>
            {role == 'user' &&
                <>
                    {userRoutes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<Suspense fallback={<Loader />}><route.element /></Suspense>}
                        />

                    ))
                    }
                    <Route path="*" element={<Navigate to={RouteNames.MAIN} replace />} />
                </>
            }
            {role == 'admin' &&
                <>
                    {adminRoutes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<Suspense fallback={<Loader />}><route.element /></Suspense>}
                        />

                    ))
                    }
                    {userRoutes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<Suspense fallback={<Loader />}><route.element /></Suspense>}
                        />

                    ))
                    }
                    <Route path="*" element={<Navigate to={RouteNames.ADMIN} replace />} />
                </>
            }

            {publicRoutes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<Suspense fallback={<Loader />}><route.element /></Suspense>}
                />

            ))}

            <Route path="*" element={<Navigate to={RouteNames.LOGIN} replace />} />
        </Routes>
    );
};


export default AppRouter;
