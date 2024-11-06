import React, { FC, MouseEvent, useEffect } from 'react';
import styles from './DirectorItem.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { IDirectoryItem } from '../../models/IDirectoryItem';
import EditItemButton from '../../UI/EditItemButton/EditItemButton';
import { useAuthStore } from '../../app/store/auth';

interface DirectorItemProps {
  directory: IDirectoryItem
}
const DirectorItem: FC<DirectorItemProps> = ({ directory }) => {
  const staticUrl = process.env.STATIC_URL || 'http://localhost:3200/';
  const role = useAuthStore(store => store.role)
  const navigate = useNavigate()
  const handleEdit = () => {
    navigate('/edit-directory/' + directory.directoryId)
  };


/*   const fetchbookImg = async () => {
    const res = await fetch(staticUrl + (directory.imgLink || directory.directoryImg))
    console.log(res)
  }
  useEffect(() => {
    fetchbookImg()
  }, []) */
  return (
    <div onClick={() => navigate(`/reference/${directory.directoryId}`)} className={styles.item} key={directory.directoryId}>
      {role == 'admin' && <EditItemButton onClick={handleEdit} />}
      <img src={staticUrl + (directory.imgLink || directory.directoryImg)} alt={directory.directoryName} />
      <div className={styles.title}>
        {directory.directoryName}
      </div>
    </div>
  )
}

export default DirectorItem
