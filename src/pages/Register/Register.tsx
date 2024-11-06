import React, { useEffect, useState } from 'react'
import { RouteNames } from '../../app/router'
import styles from './Register.module.css'
import MyInput from '../../UI/MyInput/MyInput';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../app/store/auth';
import RegiserService from './api/RegisterService';
import { validateStringFields } from '../../helpers/checkStringFields';
const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  const navigate = useNavigate()


  const loggedIn = useAuthStore(store => store.loggedIn)

  const register = async () => {
    const data = {
      email, password, userName
    }
    try {
      if (validateStringFields(data)){
        try {
          await RegiserService.register(data)
          navigate('/login')
        } catch (e) {
          console.log(e)
        }
      }
    } catch (e) {
      alert('Помилка')
    }
  }

  useEffect(() => {
    if (loggedIn) {
      navigate('/')
    }
  }, [loggedIn])
  return (
    <div className={styles.main}>
      <div className={styles.title}>реєстрація нового акаунту</div>

      <div className={styles.inputRow}>
      <MyInput
          placeholder='Iм’я користувача'
          value={userName} setValue={setUserName}

        />
        <MyInput
          placeholder='Пошта'
          value={email} setValue={setEmail}

        />
        <MyInput
          placeholder='Пароль'
          value={password} setValue={setPassword}
        />
      </div>


      <button className={styles.button} onClick={register}>
        Увійти
      </button>
    </div>
  )
}

export default Register
