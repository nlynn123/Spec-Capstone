import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import BookItem from '../../Elements/BookItem'
import TitleBanner from './TitleBanner'
import AuthContext from '../../store/authContext'
import styles from './Home.module.css'

const Home = () => {
  const authCtx = useContext(AuthContext)
  const [books, setBooks] = useState([])

  const getAllBooks = () => {
    axios.get('/book', {
      headers: {
        authorization: authCtx.token
      } 
    })
    .then(res=> setBooks(res.data))
    .catch(err => console.log(err))
  }

  useEffect(getAllBooks, [])

  return (
    <div>
     <TitleBanner />
      {books.map(book => {
        return <BookItem 
        key = {book.id}
        book = {book}
        
        />
        
      })}
      </div>
    
  )
}

export default Home