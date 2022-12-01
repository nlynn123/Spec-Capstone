import React, {useContext, useState} from 'react'
import AuthContext from '../../store/authContext'
import axios from 'axios'
import styles from './AddBook.module.css'

const AddBook = () => {
  const authCtx = useContext(AuthContext)

  const [bookTitle, setBookTitle] = useState('')
  const [bookDescription, setBookDescription] = useState('')
  const [image, setImage] = useState('')
  
  const addBook = (e) => {
    e.preventDefault()
    const body = {bookTitle, bookDescription, image}
    e.target.reset()
    axios.post(`/book/${authCtx.userId}`, body, {
      headers: {
        authorization: authCtx.token
      } 
    })
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  }


  return (
    <div className={styles.input_container}>
      <form className = {styles.form} onSubmit={e => addBook(e)}>
        <textarea
        placeholder = 'Book Title' 
        type='text' 
        rows = {2}
        onChange={e => setBookTitle(e.target.value)}/>
        <div >
        <textarea
         className = {styles.description_input} 
         placeholder = 'Why Is It A Favorite?' 
         type='text' 
         rows = {5}
         onChange={e => setBookDescription(e.target.value)}/>
        </div>
        <input placeholder = 'image' type='text' onChange={e => setImage(e.target.value)}/>
        <button className = {styles.submit_btn}>Submit</button>
      </form>

    </div>
  )
}

export default AddBook