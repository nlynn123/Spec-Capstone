import React, {useContext} from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'
import styles from './BookItem.module.css'


const BookItem = ({book, myBooks}) => {
  const authCtx = useContext(AuthContext)

  const saveToMyBooks = () => {
    axios.post('/mybooks', {userId: authCtx.userId, bookId: book.id}, {
      headers: {
        authorization: authCtx.token
      } 
    })
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  }
  
  return (
    <div className = {styles.card}>
    <div className = {styles.book_card}>
      <div className={styles.book_img_container}>
      <img src={book.image} alt="book_pic"/>
      </div>
      
      <h2>Username:  {book.user.username}</h2>
      <p className= {styles.book_title}>{book.bookTitle}</p>
      <p className = {styles.book_description}> {book.bookDescription}</p>
    {myBooks ? (<button className= {styles.card_btn}>Remove</button>) : (<button className= {styles.card_btn} onClick={() => saveToMyBooks()}>Save Book</button>)}
    </div>
    
</div>
  )
}

export default BookItem