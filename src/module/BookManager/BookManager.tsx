import React, { act, FC, useEffect, useState } from 'react';
import RecordType from '../../components/RecordType/RecordType';
import styles from './BookManager.module.css';
import AddRecordInputRow from '../../components/AddRecordInputRow/AddRecordInputRow';
import ListEditor, { IListItem } from '../../components/ListEditor/ListEditor';
import BlueButton from '../../UI/BlueButton/BlueButton';
import { validateStringFields } from '../../helpers/checkStringFields';
import { AddBookReq } from './api/req';
import BookManagerService from './api/BookManagerService';
import { urlToFile } from '../../helpers/urlToFile';
import { Navigate, useNavigate } from 'react-router-dom';
import MySelect, { SelectOption } from '../../UI/MySelect/MySelect';
import TagsService from '../../api/tags/TagsService';
import { ITag } from '../../models/ITag';


interface BookManagerProps {
  action: 'create' | 'edit';
  bookId?: string;
}

const BookManager: FC<BookManagerProps> = ({ action, bookId }) => {
  const [bookName, setBookName] = useState<string>('');
  const [bookAutor, setBookAutor] = useState<string>('');
  const [material, setMaterial] = useState<File | null>(null);
  const [initialMaterial, setInitialMaterial] = useState<File | null>(null); // начальное значение для материала
  const [photo, setPhoto] = useState<File | null>(null);
  const [initialPhoto, setInitialPhoto] = useState<File | null>(null); // начальное значение для фото
  const [tags, setTags] = useState<SelectOption[]>([]);

  const [selectedTag, setSelectedTag] = useState<string>('')
  const [redirectToHome, setRedirectToHome] = useState(false);
  const navigate = useNavigate()
  const handleCreate = async () => {
    const reqData: AddBookReq = {
      BookName: bookName,
      Author: bookAutor,
      BookPdf: material as File,
      BookImg: photo as File,
      Tag: selectedTag,
    };
    if (validateStringFields(reqData)) {
      try {
        await BookManagerService.addBook(reqData);

        setRedirectToHome(true)
      } catch (e) {
        console.log(e);
        alert('Виникла помилка');
      }
    }

  };

  const handleEdit = async () => {
    const formData = new FormData();
    formData.append('BookId', String(bookId))
    formData.append('Author', bookAutor)
    formData.append('BookName', bookName)
    formData.append('BookName', bookName)
    formData.append('TagId', selectedTag)


    const materialChanged = material && (!initialMaterial || material.name !== initialMaterial.name);
    const photoChanged = photo && (!initialPhoto || photo.name !== initialPhoto.name);

    if (materialChanged) {
      formData.append('BookPdf', material as File)
    }

    if (photoChanged) {
      formData.append('BookImg', photo as File)
    }
    try {
      await BookManagerService.editBook(formData)
    } catch (e) {
      console.log(e)
    }




    navigate('/books/' + String(bookId))
  };

  const handleAction = () => {
    if (action === 'create') {
      handleCreate();
    } else {
      handleEdit();
    }
  };


  const fetchBook = async () => {
    const { data } = await BookManagerService.getBook(String(bookId));
    setBookName(data.bookName);
    setBookAutor(data.author);
    if(action == 'create') {
      setSelectedTag(data.tags[0].tagText as string)

    }else{
      setSelectedTag(data.tags[0].tagId as string)
    }
    const url = 'http://localhost:3200';
    urlToFile(url + data.pdf).then(file => {
      if (file) {
        setMaterial(file);
        setInitialMaterial(file); // Устанавливаем начальное значение
      } else {
        console.log('Не удалось получить файл.');
      }
    });

    urlToFile(data.bookImg).then(file => {
      if (file) {
        setPhoto(file);
        setInitialPhoto(file); // Устанавливаем начальное значение
      } else {
        console.log('Не удалось получить файл.');
      }
    });
  };

  const fetchTags = async () => {
    const { data: tagsData } = await TagsService.getAllTags();
    console.log(tagsData)
    if (action === 'edit') {
      setTags(tagsData.map(tag => {
        return {
          value: tag.tagId,
          label: tag.tagText
        }
      }))
    } else {
      setTags(tagsData.map(tag => {
        return {
          value: tag.tagText,
          label: tag.tagText
        }
      }))
    }

  }

  useEffect(() => {
    fetchTags()
    if (bookId && action === 'edit') fetchBook();
  }, [bookId]);
  if (redirectToHome) {
    return <Navigate to="/" />; // react-router-dom v6
  }
  return (
    <div className={styles.main}>
      {action === 'create' && <RecordType recordType={'book'} />}
      <AddRecordInputRow
        title='Назва книги'
        placeholder='Введіть назву'
        value={bookName}
        setValue={setBookName}
        type={'normal'}
      />
      <AddRecordInputRow
        title='Автор'
        placeholder='Введіть автора'
        value={bookAutor}
        setValue={setBookAutor}
        type={'normal'}
      />
      <AddRecordInputRow
        title='Матеріал'
        placeholder='Прикріпити файл'
        onFileChange={setMaterial}
        file={material}
        type={'file'}
      />
      <AddRecordInputRow
        title='Фото'
        placeholder='Прикріпити фото'
        onFileChange={setPhoto}
        file={photo}
        type={'file'}
      />

      <MySelect options={tags} value={selectedTag} onChange={setSelectedTag} placeholder='Оберіть тег' />
      <BlueButton onClick={handleAction}>{action === 'create' ? 'Опублікувати' : 'Зберігти'}</BlueButton>
    </div>
  );
};

export default BookManager;