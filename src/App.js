import React, {useContext} from 'react'; 
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'; 
import Home from './Components/Home/Home';
import AddBook from './Components/AddBook/AddBook';
import Auth from './Components/Auth/Auth'
import Header from './Components/Nav/Header'
import MyBooks from './Components/MyBooks/MyBooks'
import Book from './Components/Book/Book'
import AuthContext from './store/authContext';

function App() {
  const authCtx = useContext(AuthContext)
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path= '/' element={<Home />} />
        <Route path='/auth' element={!authCtx.token ? <Auth/> : <Navigate to='/'/>}/>
        <Route path = '/addbook' element={<AddBook />} />
        <Route path = '/mybooks' element = { <MyBooks /> } />
        <Route path='/book/:id' element={<Book />} />
      </Routes>
    </div>
  );
}

export default App;
