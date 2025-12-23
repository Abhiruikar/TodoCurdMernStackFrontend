import React from 'react'
import Add from './components/Add'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import User from './components/User'
import Edit from './components/Edit'

const App = () => {
  return (
    <div>
      <BrowserRouter>
          

        <Routes>
          <Route path='/' element={<User/>}/>
          <Route path='/add' element={<Add/>}/>
          <Route path='/edit/:id' element={<Edit/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App