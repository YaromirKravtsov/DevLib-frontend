import path from 'path';
import React from 'react';
import LoginPage from '../../pages/LoginPage/LoginPage';
import MainPage from '../../pages/MainPage/MainPage';
import BookMarksPage from '../../pages/BookMarksPage/BookMarksPage';
import AddRecord from '../../pages/AddBook/AddBook';
import Forum from '../../pages/ForumPage/ForumPage';
import UsersAdmin from '../../pages/UsersAdmin/UsersAdmin';
import BooksPage from '../../pages/BooksPage/BooksPage';
import DirectoriesPage from '../../pages/DirectoriesPage/DirectoriesPage';
import AccountPage from '../../pages/AccountPage/AccountPage';
import Register from '../../pages/Register/Register';
import ReferencePage from '../../pages/ReferencePage/ReferencePage';
import BookDetailsPage from '../../pages/BookDetailsPage/BookDetailsPage';
import ReadingPage from '../../pages/ReadingPage/ReadingPage';
import ArticlePage from '../../pages/ArticlePage/ArticlePage';
import AddBook from '../../pages/AddBook/AddBook';
import AddDirectory from '../../pages/AddDirectory/AddDirectory';
import EditBook from '../../pages/EditBook/EditBook';
import EditDerectory from '../../pages/EditDerectory/EditDerectory';
import AddArticle from '../../pages/AddArticle/AddArticle';
import EditArticle from '../../pages/EditArticle/EditArticle';
import PasswordForgetReset from '../../pages/PasswordForgetReset/PasswordForgetReset';
/* import LoginPage from '../../pages/LoginPage/LoginPage';
import SeatchRealEstate from '../../pages/SeatchRealEstate/SeatchRealEstate'; */
import EditProfilePage from '../../pages/EditProfilePage/EditProfilePage';
import TagManager from '../../pages/TagManager/TagManager';
import PostPage from '../../pages/PostPage/PostPage';
import CreatePost from '../../pages/CreatePost/CreatePost';




export interface IRoute {
  path: string;
  element: React.ComponentType;

}
export enum RouteNames {
  LOGIN = "/login",
  MAIN = "/",
  ADMIN = "/admin",
  BOOK_MARKS = "/book-marks",
  FORUM = "/forum",
  ADD_BOOK = '/add-book',
  USERS_ADMIN = '/users',
  BOOKS = "/books",
  DIRECTORIES = "/directories",
  ACCOUNT = "/account/:userId",
  REGISTER = "/register",
  REFERENCE = "/reference/:directoryId",
  BOOK_DETAILS = "/books/:bookId", 
  READING = "/reading/:bookId", 
  ARTICLE = "/article/:articleId", 
  ADD_DIRECTORY ="/add-directory",
  ADD_ARTICLE ="/add-article/:articleId",
  EDIT_ARTICLE= "edit-article/:articleId",
  EDIT_DIRECTORY ="/edit-directory/:directoryId",
  PASSWORDFORGETRESET = "/reset-user-password",
  EDIT_BOOK ="/edit-book/:bookId",
  EDIT_PROFILE = "/edit-profile",
  TAG_MANAGER ="/tag-manager",
  POST = "/post/:postId",
  CREATE_POST = "/create-post"

}


// маршруты только для админа 
export const adminRoutes: IRoute[] = [
  { path: RouteNames.ADD_BOOK, element: AddBook },
  { path: RouteNames.USERS_ADMIN, element: UsersAdmin },
  { path: RouteNames.ADD_DIRECTORY, element: AddDirectory },
  { path: RouteNames.ADD_ARTICLE, element: AddArticle },
  { path: RouteNames.EDIT_ARTICLE, element: EditArticle },
  { path: RouteNames.EDIT_DIRECTORY, element: EditDerectory },
  { path: RouteNames.EDIT_BOOK, element: EditBook },
  { path: RouteNames.TAG_MANAGER, element: TagManager },
  { path: RouteNames.CREATE_POST, element: CreatePost },
  


]

// маршруты только для пользователя 
export const userRoutes: IRoute[] = [
  { path: RouteNames.LOGIN, element: LoginPage },
 
  { path: RouteNames.BOOK_MARKS, element: BookMarksPage },
  { path: RouteNames.EDIT_PROFILE, element: EditProfilePage },
  { path: RouteNames.CREATE_POST, element: CreatePost },
  { path: RouteNames.ACCOUNT, element: AccountPage },

  

]

// маршруты для всех пользователей, включая как зарегистрированных, так и незарегистрированных  
export const publicRoutes: IRoute[] = [
  { path: RouteNames.LOGIN, element: LoginPage },
  { path: RouteNames.MAIN, element: MainPage },
  { path: RouteNames.FORUM, element: Forum },
  { path: RouteNames.BOOKS, element: BooksPage },
  { path: RouteNames.DIRECTORIES, element: DirectoriesPage },
  { path: RouteNames.REGISTER, element: Register },
  { path: RouteNames.REFERENCE, element: ReferencePage },
  { path: RouteNames.BOOK_DETAILS, element: BookDetailsPage },
  { path: RouteNames.READING, element: ReadingPage },
  { path: RouteNames.POST, element: PostPage },
  { path: RouteNames.PASSWORDFORGETRESET, element: PasswordForgetReset },
  { path: RouteNames.ARTICLE, element: ArticlePage },
  

]