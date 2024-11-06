import React, { FC, ReactNode, useEffect, useState } from 'react'
import Header from '../Header/Header'
import styles from './AppLayout.module.css'
import { useAuthStore } from '../../app/store/auth'
import { adminPanelRoutes } from './constants/adminPanelRoutes'
import { useLocation } from 'react-router-dom'
import AdminPanel from '../AdminPanel/AdminPanel'
import { RouteNames } from '../../app/router'
interface Props {
  children: ReactNode
}
const AppLayout: FC<Props> = ({ children }) => {
  const location = useLocation();

  const [showAdminPanel, setShowAdminPanel] = useState<boolean>();
  const role = useAuthStore(store => store.role)
  useEffect(() => {
    const isAdminRoute = adminPanelRoutes.some(route => location.pathname.startsWith(route as RouteNames));

    if (isAdminRoute && role == 'admin') {
      setShowAdminPanel(true)
    }
    else {
      setShowAdminPanel(false)
    }
  }, [location.pathname, role])


  return (
    <div className={`${styles.app} ${showAdminPanel && styles.showAdminPanel}`}>
      <Header />
      <div className={`${styles.main}`}>
        {showAdminPanel &&
          <>
            <AdminPanel />
          </>
        }
        <div className={`${ showAdminPanel && styles.adminMain}`}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AppLayout
