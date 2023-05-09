import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import s from './Subject.module.scss'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';
import { GoogleLogin } from '@leecheuk/react-google-login';
const YOUR_CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const API_URL = process.env.REACT_APP_API_URL

const Subject = () => {
    const { login, isLogin, logout } = useContext(AuthContext)
    const [themes, setThemes] = useState([])
    const onLogIn = async (res) => {
        const { email, googleId } = res.profileObj;
        await axios.post(API_URL + 'api/auth/login', { email: email, password: googleId })
            .then(res => {
                console.log(res)
                login(res.data.token, res.data.userId)
                alert('Вход в аккаунт прошел успешно')
            })
        console.log(res)
    }
    const onFailure = (res) => {
        console.log(res);
    }

    // const onLogInRes = async (res) => {
    //     const { email, googleId } = res.profileObj;
    //     await axios.post(API_URL + 'api/auth/registration', { email: email, password: googleId })
    //         .then(res => {
    //             console.log(res)
    //             alert('Регистрация прошла успешно. Войдите')
    //         })
    //     console.log(res)
    // }
    // const onFailureRes = (res) => {
    //     console.log(res);
    // }

    const deleteQuiz = (themeId) => {
        axios.delete(API_URL + 'api/quizz/' + themeId)
            .then((res) => {
                alert("Тема удалена")
                setThemes(themes.filter((theme) => {
                    return theme._id !== themeId
                }))
            })
            .catch((err) => {
                alert("Тема не удалена. Произошла ошибка")
            })
    }

    useEffect(() => {
        axios.get(API_URL + 'api/quizz/theme')
            .then((res) => {
                console.log(res.data)
                setThemes(res.data.themes)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    // const themes = ['theme1', 'theme2', 'theme3', 'theme4', 'theme5', 'theme6', 'theme7', 'theme8', 'theme9', 'theme10']
    const colors = ['#a82a2a', '#ef6969', '#f0b063', '#a0f063', '#63f0df', '#63a7f0', '#6c63f0', '#9453f6', '#e978ef', '#ef78aa']
    return (
        <div className={s.mein}>
            <div className={s.verh}>
                {/* <div></div>
                <div></div> */}
                <h1>Theme</h1>
                {isLogin
                    ? <button className={s.button} onClick={logout}>exit</button>
                    : <div className={s.btns}>
                        <GoogleLogin
                            clientId={YOUR_CLIENT_ID}
                            buttonText="Вход"
                            onSuccess={onLogIn}
                            onFailure={onFailure}
                            cookiePolicy={'single_host_origin'}
                            className={s.btn}
                        />
                        {/* <GoogleLogin
                            clientId={YOUR_CLIENT_ID}
                            buttonText="Регистрация"
                            onSuccess={onLogInRes}
                            onFailure={onFailureRes}
                            cookiePolicy={'single_host_origin'}
                            className={s.btn}
                        /> */}
                    </div>
                }

            </div>

            <ul className={s.list}>
                {isLogin
                    ? <li className={s.btn_add}><Link to='/newtheme'>+</Link></li>
                    : ''
                }

                {themes.map((theme, index) =>
                    <li key={theme._id} style={{ backgroundColor: colors[index] }} className={s.theme}>
                        <Link to={'/quiz/' + theme._id}>{theme.title}</Link>
                        {isLogin
                            ? <div className={s.redact}>
                                <i onClick={() => alert("в разработке")} class="bi bi-pencil-square"></i>
                                <i onClick={() => deleteQuiz(theme._id)} class="bi bi-trash3-fill"></i>
                              </div>
                            : ''
                        }

                    </li>
                )}
            </ul>
        </div>
    );
};
export default Subject