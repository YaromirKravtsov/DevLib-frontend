import React, { FC, useEffect, useState } from 'react';
import RecordType from '../../components/RecordType/RecordType';
import styles from './BookManager.module.css';
import AddRecordInputRow from '../../components/AddRecordInputRow/AddRecordInputRow';
import ListEditor, { IListItem } from '../../components/ListEditor/ListEditor';
import BlueButton from '../../UI/BlueButton/BlueButton';
import { validateStringFields } from '../../helpers/checkStringFields';
import { AddBookReq } from './api/req';
import BookManagerService from './api/BookManagerService';
import { urlToFile } from '../../helpers/urlToFile';
import { useNavigate } from 'react-router-dom';

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
  const [tags, setTags] = useState<IListItem[]>([]);
  const [firstTags, setFirstTags] = useState<IListItem[]>([]);
  const navigate = useNavigate()
  const handleCreate = async () => {
    console.log('handleCreate')
    const reqData: AddBookReq = {
      BookName: bookName,
      Author: bookAutor,
      BookPdf: material as File,
      BookImg: photo as File,
      tags: tags.map(item => item.text),
    };
    if (validateStringFields(reqData)) {
      try {
        await BookManagerService.addBook(reqData);
      } catch (e) {
        console.log(e);
        alert('Виникла помилка');
      }
    }
    navigate('')
  };

  const handleEdit = async () => {
    console.log("editediteditedit");
    console.log('firstTags:', firstTags);
    console.log('bookName:', bookName);
    console.log('material:', material);
    console.log('photo:', photo);
    const formData = new FormData();
    formData.append('BookId', String(bookId))
    formData.append('Author', bookAutor)
    formData.append('BookName', bookName)

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

    for (const tag of firstTags) {
      try {
        await BookManagerService.deleteTag({
          bookId: String(bookId),
          tagId: tag.id
        });
      } catch (deleteError) {
        console.warn(`Failed to delete article with ID ${tag.id}:`, deleteError);
      }
    }

    for (const tag of tags) {
      try {
        await BookManagerService.createTag({
          bookId: String(bookId),
          tagText: tag.text
        });
      } catch (deleteError) {
        console.warn(`Failed to delete article with ID ${tag.id}:`, deleteError);
      }
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

  useEffect(() => {
    const fetchBook = async () => {
      const { data } = await BookManagerService.getBook(String(bookId));
      setBookName(data.bookName);
      setBookAutor(data.author);
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

      const { data: tagsData } = await BookManagerService.getTags(String(bookId));
      const newTags = tagsData.map(tag => ({
        text: tag.tagText,
        id: tag.tagId,
      }));
      setFirstTags(newTags);
      setTags(newTags);
    };

    if (bookId && action === 'edit') fetchBook();
  }, [bookId]);

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
      <AddRecordInputRow title='Теги' type={'custom'}>
        <ListEditor setList={setTags} list={tags} itemPlaceholder='Новий тег' />
      </AddRecordInputRow>

      <BlueButton onClick={handleAction}>{action === 'create' ? 'Опублікувати' : 'Зберігти'}</BlueButton>
    </div>
  );
};

export default BookManager;