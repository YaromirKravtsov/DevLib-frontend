import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHeaderStore } from '../../layouts/Header/store/header';
import BookService from '../BookDetailsPage/api/BookService';
import styles from './ReadingPage.module.css';
import { IBookDetails } from '../../models/IBookDetails';
import SimplePdfViewer from './components/PdfViewer';
import ReadingPageServce from './api/ReadingPage';
import { useAuthStore } from '../../app/store/auth';
import { text } from 'stream/consumers';
import PdfViewer from '../../components/PdfViewer/PdfViewer';

export interface Note {
    noteId: string;
    note: string;
    type: string
}

const ReadingPage = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const setHeaderVersion = useHeaderStore((store) => store.setHeaderVersion);
    const [notes, setNotes] = useState<Note[]>([]);
    const [newNote, setNewNote] = useState('');
    const [pdfUrl, setPdfUrl] = useState<string>('');
    const userId = useAuthStore(store => store.userId);
    const [underlining, setUnderlining] = useState<Note[]>([]);
    const fetchBookDetails = async () => {
        if (!bookId) {
            console.error('No book ID provided');
            return;
        }

        try {
            const bookDetails: IBookDetails = await BookService.getBookDetails(bookId);
            const baseUrl = 'http://localhost:3200';
            const fullPdfUrl = `${baseUrl}${bookDetails.pdf}`;
            console.log('Fetched Book Details:', bookDetails);
            console.log('PDF URL:', fullPdfUrl);
            setPdfUrl(fullPdfUrl);
        } catch (error) {
            console.error('Error fetching book details:', error);
        }
    };
    const fetchNotes = async () => {
        const { data } = await ReadingPageServce.getNotes(String(bookId), userId)
        console.log(data)
        setNotes(data.filter(note => note.type == '1'))
        setUnderlining(data.filter(note => note.type !== '1'))

    }
    const createNote = async (type: string, note: string) => {
        await ReadingPageServce.createNote({
            bookId: String(bookId),
            userId: userId,
            text: note,
            type: type
        });
    }

    useEffect(() => {
        setHeaderVersion('minimized');


        fetchBookDetails();
    }, [setHeaderVersion, bookId]);

    useEffect(() => {
        if (userId.trim() !== '') {
            fetchNotes()
        }
    }, [userId])

    const handleAddNote = async () => {
        if (newNote.trim()) {
            await createNote('1', newNote)
            await fetchNotes()
            setNewNote('');
        }
    };


    const delteNote = async (id: string) => {
        await ReadingPageServce.deleteNote(id)
    }

    const handleDeleteNote = (id: string) => {

        delteNote(id)
        setNotes(notes.filter((note) => note.noteId !== id));
    };
    const handleAddNewHighlight = async (text: string) => {
        console.log(text)
        await createNote('2', text)
        await fetchNotes()
        setNewNote('');

    }

    return (
        <div className={styles.container}>
            <div className={styles.notesSection}>
                <h2>Додати нотатки</h2>
                <div className={styles.addNoteForm}>
                    {/*  {quote && (
                        <blockquote className={styles.quote}>
                            {quote}
                        </blockquote>
                    )} */}
                    <textarea
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Введіть нотатку..."
                        className={styles.noteInput}
                    />
                    <button
                        onClick={handleAddNote}
                        className={styles.addButton}
                    >
                        Зберегти
                    </button>
                </div>
            </div>



            <PdfViewer file={pdfUrl} /* addNewHighlight={handleAddNewHighlight} highlightedTexts={underlining} */ />


            <div className={styles.notesList}>
                <h2>Ваші нотатки:</h2>
                {notes.map((note) => (
                    <div key={note.noteId} className={styles.noteItem}>
                        {note.note}
                        <button
                            onClick={() => handleDeleteNote(note.noteId)}
                            className={styles.deleteButton}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReadingPage;
