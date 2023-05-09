import React, {useState} from 'react'
import s from './NewTheme.module.scss'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const API_URL = process.env.REACT_APP_API_URL
const defaultQuiz = {
    // id: 1,
    question: '',
    correct: null, 
    answers: ['', '', '', '']
}

const NewTheme = () => {
    const navigate = useNavigate()
    const [quizes, setQuizes] = useState([defaultQuiz])
    const [title, setTitle] = useState('')

    const changeQuestion = (index, e) =>{
        setQuizes(quizes.map((quiz,i)=>{
            if(index===i){
                return {...quiz, question:e.target.value}
            }
            return quiz
        }))
    }

    const changeAnswers = (index, indexAnswers, e ) =>{
        setQuizes(quizes.map((quiz,i)=>{
            if(index===i){
                const newAnswers = quiz.answers.map((answer, j)=>{
                    if(j===indexAnswers){
                        return e.target.value
                    }
                    return answer
                })
                return {...quiz, answers:newAnswers}
            }
            return quiz
        }))
    }

    const addQuestion = () =>{
        setQuizes([...quizes,defaultQuiz])
    }
    const saveQuiz = () =>{
        const isCorrect = quizes.some((quiz)=>quiz.correct===null)
        const isAnswers = quizes.some((quiz)=>quiz.answers.some((answer)=>answer.length===0))
        const isQuestion = quizes.some((quiz)=>quiz.question==='')
        if(isCorrect){
            alert("Не все правильные варианты ответа выбраны")
        }
        else if(isAnswers){
            alert("Не все варианты ответов заполнены!!!")
        }
        else if(isQuestion){
            alert("Не все вопросы заполнены!")
        }
        else if(title===''){
            alert("Название темы не введено")
        }
        else{
            const data = {
                title: title,
                quizes: quizes
            }
            // axios.post(API_URL+'api/quizz', data)
            console.log(data)
            axios.post(API_URL+'api/quizz', data)
            .then(res=>{
                alert("тест добавлен")
                navigate('/')
            })
            .catch(err =>{
                console.log(err)
            })
        }
        
    }

    const deleteQuiz = (index) =>{
        setQuizes(quizes.filter((quiz, i)=> index !== i))
    }
    const changeCorrect = (e) =>{
        const index = Number(e.target.name.split('_')[1])
        setQuizes(quizes.map((quiz,i)=>{
            if(index===i){
                return {...quiz, correct:e.target.value}
            }
            return quiz
        }))
    }

    return (
        <div className={s.mein}>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} className={s.title} placeholder='Name of Theme'/>
            <div className={s.quizes}>
                {quizes.map((item, index)=>
                    <div key={index} className={s.quiz}>
                        <input className={s.pyt} onChange={(e)=>changeQuestion(index, e)} value={item.question} placeholder='question'/>
                        <div className={s.answers}>
                            <div className={s.right_answ}>
                                <input 
                                    type='radio' 
                                    name={`answer_${index}`}
                                    value={0}
                                    onChange={changeCorrect}
                                />
                                <input onChange={(e)=>changeAnswers(index, 0, e)} value={item.answers[0]}/>
                            </div>
                            <div className={s.right_answ}>
                                <input 
                                    type='radio' 
                                    name={`answer_${index}`}
                                    value={1}
                                    onChange={changeCorrect}
                                />
                                <input onChange={(e)=>changeAnswers(index, 1, e)} value={item.answers[1]}/>                                
                            </div>
                            <div className={s.right_answ}>
                                <input 
                                    type='radio' 
                                    name={`answer_${index}`}
                                    value={2}
                                    onChange={changeCorrect}
                                />
                                <input onChange={(e)=>changeAnswers(index, 2, e)} value={item.answers[2]}/>
                            </div>
                            <div className={s.right_answ}>
                                <input 
                                    type='radio' 
                                    name={`answer_${index}`}
                                    value={3}
                                    onChange={changeCorrect}
                                />
                                <input onChange={(e)=>changeAnswers(index, 3, e)} value={item.answers[3]}/>
                            </div>
                        </div>
                        <button className={s.delete} onClick={()=>deleteQuiz(index)}>delete</button>
                    </div>
                )}
                <div className={s.btns}>
                    <button className={s.back}><Link to='/'>back</Link></button>
                    <button onClick={addQuestion} className={s.make}>+</button>
                    <button onClick={saveQuiz} className={s.save}>save</button>
                </div>
                
                
            </div>
        </div>
    );
};
export default NewTheme