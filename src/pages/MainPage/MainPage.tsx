import React, { useEffect, useState } from 'react'
import AppLayout from '../../layouts/AppLayout/AppLayout'

import $api from '../../app/api/http';
import MainPageService from './api/MainPageService';

import styles from './MainPage.module.css'
import DirectoriesList from './components/DirectoriesList/DirectoriesList';
import LastBooksList from './components/LastBooksList/LastBooksList';
import { useHeaderStore } from '../../layouts/Header/store/header';
import { IDirectoryItem } from '../../models/IDirectoryItem';
import { IBookItem } from '../../models/IBookItem';

const MainPage = () => {
  const setHeaderVersion = useHeaderStore(store => store.setHeaderVersion);
  const [directories,setDirectories] = useState<IDirectoryItem[]>([]);
  const [books,setBooks] = useState<IBookItem[]>([]);


  useEffect(() => {
  
    const fetch = async () =>{
      const directoriesData = await MainPageService.get8Directories();
      setDirectories(directoriesData.data);
      const {data} = await MainPageService.getLastBooks();
      setBooks(data);
    }
    fetch()
    setHeaderVersion('normal')
  }, []);

  return (
    <div className={`${styles.main} container`}>
        <DirectoriesList directories={directories}/>
        <LastBooksList books = {books}/>
    </div>
  )
}

export default MainPage
