import './App.css';
import { AuthContext } from './context/AuthContext'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react';
import Subject from './pages/Subject/Subject';
import Quiz from './pages/Quiz/Quiz';
import NewTheme from './pages/NewTheme/NewTheme';
import { gapi } from 'gapi-script'
import { useAuth } from './hooks/useAuth';
const YOUR_CLIENT_ID = process.env.REACT_APP_CLIENT_ID

function App() {
  const { login, logout, token, userId, isReady } = useAuth()
  const isLogin = !!token
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: YOUR_CLIENT_ID,
        scope: ""
      })
    }
    gapi.load('client:auth2', start)
  })
  return (
    <AuthContext.Provider value={{ login, logout, token, userId, isReady, isLogin }}>
      <BrowserRouter>
        <div className='App'>
          {isLogin
            ? <Routes>
              <Route path='/' element={<Subject />} />
              <Route path='/quiz/:id' element={<Quiz />} />
              <Route path='/newtheme' element={<NewTheme />} />
            </Routes>
            : <Routes>
              <Route path='/' element={<Subject />} />
              <Route path='/quiz/:id' element={<Quiz />} />
              <Route path='/newtheme' element={<Navigate to='/' />} />
            </Routes>
          }

        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
