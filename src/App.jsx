import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './components/auth/Login'
import { Register } from './components/auth/Register'
import { Authorized } from './views/Authorized'
import { AuthorizedViews } from './views/AuthorizedViews'
import { HandleLikes } from './context/LikeContext'
import { NewPostHolder } from './context/NewPostContext'
import { EditPostProvider } from './context/EditPostContext'

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route 
          path='*'
          element={
            <Authorized>
                <HandleLikes>
                  <NewPostHolder>
                    <EditPostProvider>
                      <AuthorizedViews />
                    </EditPostProvider>
                  </NewPostHolder>    
                </HandleLikes>    
            </Authorized>
          }
        />
      </Routes>
    </>
  )}

export default App
