import React, { useState, useEffect } from 'react'
import s from './Quiz.module.scss'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import AlertApp from '../../components/AlertApp/AlertApp'
const API_URL = process.env.REACT_APP_API_URL

const Quiz = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]) //массив всех вопросов
    const [quiz, setQuiz] = useState(null)  //объект текущего вопроса
    const [count, setCount] = useState(1)
    const [alertMess, setAlertMess] = useState(null)
    const [uncorrect, setUncorrect] = useState(0)
    const [finish, setFinish] = useState(false)
    useEffect(() => {
        axios.get(API_URL + 'api/quizz/' + id)
            .then((res) => {
                // console.log(res.data)
                setQuizzes(res.data)
                getQuestion(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])
    const colors = ['blue', 'green', 'red', 'yellow']

    useEffect(() => {
        if (finish && !alertMess) {
            navigate('/')
        }
    }, [finish, navigate, alertMess])

    const getQuestion = (dataQuizzes) => {  //функция рандома вопроса
        const data = dataQuizzes || quizzes
        const index = Math.floor(Math.random() * data.length)
        setQuiz({ ...data[index], index: index })
        // console.log({...data[index], index:index})
    }
    const changeAnswer = (index) => {

        if (quiz.correct === index) {  //проверка правильный ли ответ
            setAlertMess('правильный ответ')

            if (quizzes.length <= 1) {
                setAlertMess("количество неправильных ответов: " + uncorrect)
                setFinish(true)
            }
            else {
                // console.log(quiz)
                console.log(quizzes)
                const filterQuizzes = quizzes.filter((item) => item._id !== quiz._id)
                setQuizzes(filterQuizzes) //фильтрует вопросы на которые уже ответили
                getQuestion(filterQuizzes) //вызывает функцию рандома нового вопроса
                setCount(count + 1)
            }


        }
        else {
            setAlertMess('Не верный ответ, попробуйте ещё раз')
            setUncorrect(uncorrect + 1)
        }
    }


    if (!!quiz === false) {
        return (<h1>loading..</h1>)
    }
    return (
        <div className={s.main}>
            <div className={s.top}>
                <p>{count} of {quizzes.length + count - 1}</p>
                <h1>{quiz.question}</h1>
                <div></div>
                <div></div>
            </div>
            <div className={s.bottom}>
                {quiz.answers.map((answer, index) =>
                    <div onClick={() => changeAnswer(index)} key={index} className={`${s.card} ${s[colors[index]]}`}>
                        {/* <i className="bi bi-check-circle-fill"></i> */}
                        <p className={s.answer}>{answer}</p>
                    </div>
                )}
            </div>
            {alertMess && <AlertApp mess={alertMess} setAlert={setAlertMess} />}
        </div>
    );
};
export default Quiz