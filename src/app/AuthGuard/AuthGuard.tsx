import React, { FC, ReactNode, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import Loader from '../../UI/Loader/Loader';
import { publicRoutes, RouteNames } from '../router';


interface AuthGuardProps {
    children: ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = (props) => {
    const isAuth = useAuthStore(state => state.loggedIn);
    const isLoading = useAuthStore(state => state.isLoading);
    const setIsLoading = useAuthStore(state => state.setIsLoading);

    const role = useAuthStore(state => state.role);
    const checkAuth = useAuthStore(state => state.checkAuth);



    const fetchCheckAuth = async() =>{
        const token = localStorage.getItem('token');
        if (token) {
            console.log(token);
            await checkAuth(); // Проверка авторизации, если есть токен
            await setIsLoading(false)
        }else{
            setIsLoading(false);
        }
        
    }
    useEffect(() => {
        fetchCheckAuth()
        
        
    }, []);

  
    useEffect(() => {
        console.log(isLoading, isAuth, role);
    }, [isAuth, role, isLoading]);

    if (isLoading) {
        // Если идет загрузка, отображаем Loader
        return <Loader />;
    }
    
    if (!isLoading && isAuth && (role === 'admin' || role === 'user')) {
        // Если авторизован и роль соответствует
        return <>{props.children}</>;
    }

    // Если не авторизован, перенаправляем на страницу входа
    return (
        <Routes>
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

export default AuthGuard;
