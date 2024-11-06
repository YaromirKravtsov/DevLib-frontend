import React, { useEffect, useState } from 'react'
import AppLayout from '../../layouts/AppLayout/AppLayout'
import styles from './LoginPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { RouteNames } from '../../app/router';
import googleIcon from '../../assets/images/icons/google.png'
import gitIcon from '../../assets/images/icons/git.png'
import { IGoogleRes, useAuthStore } from '../../app/store/auth';
import MyInput from '../../UI/MyInput/MyInput';
import LoginService from './api/LoginService';
import { validateStringFields } from '../../helpers/checkStringFields';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';


const CLIENT_ID_GUTHUB = 'Ov23liVP1fdpjqeZ6yPh'
const SECRET_GUTHUB = '7b3f86da428ca938d69f5e9ec477a511758c54f6'

const LoginPage = () => {
  /*   const [loginData, setLoginData] = useState<ILoginData>({
      email: '',
      password: ''
    }); */
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const login = useAuthStore(store => store.login)
  const loginWithGoogle = useAuthStore(store => store.loginWithGoogle)
  const loginWithGithub = useAuthStore(store => store.loginWithGithub)

  
  const loggedIn = useAuthStore(store => store.loggedIn)
  const setLoggedIn = useAuthStore(store => store.setLoggedIn)
  const navigate = useNavigate()

  const handelLogin = async () => {
    console.log(validateStringFields({ email, password }))
    //TODO validation
    if (validateStringFields({ email, password })) {
      try {
        await login(email, password)
      } catch (e) {
        alert(e)
      }
    }
  }
/*   const loginWithGoogle = useGoogleLogin({
    onSuccess: credentialResponse => console.log(credentialResponse),
  }); */

  const loginWithGitHub = () => {
    window.location.assign('https://github.com/login/oauth/authorize?client_id=' + CLIENT_ID_GUTHUB)
  }
  
  const getGitHubAccess = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    try {
       await loginWithGithub(codeParam as string) // Господи, помоги!
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  useEffect(() => {
    getGitHubAccess()
    if (loggedIn) {
      navigate('/')
    }
  }, [loggedIn])
  return (
    <div className={styles.main}>
      <div className={styles.title}>Вхід до акаунту</div>

      <div className={styles.inputRow}>

        <MyInput
          placeholder='Пошта'
          value={email} setValue={setEmail}
          type='email'
        />
        <MyInput
          placeholder='Пароль'
          value={password} setValue={setPassword}
          type='password'
        />
      </div>

      <div className={styles.textRow}>
        <div className={styles.text}>забули пароль ?</div>
        <Link to={RouteNames.REGISTER} className={styles.text}>Зарееструватися</Link>
      </div>

{/*       <button className={styles.googleButton} onClick={() => loginWithGoogle()}>
        <img src={googleIcon} alt="Google icon" />
        <div className={styles.buttonText}>зайти через google</div>
      </button> */}

      <GoogleLogin
        onSuccess={credentialResponse => {
          loginWithGoogle(credentialResponse as IGoogleRes);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
      
      <button className={styles.gitButton} onClick={loginWithGitHub}>
        <img src={gitIcon} alt="Git icon" />
        <div className={styles.buttonText}>зайти через github</div>
      </button>
      <button className={styles.logiButton} onClick={handelLogin}>
        Увійти
      </button>
    </div>
  )
}

export default LoginPage
