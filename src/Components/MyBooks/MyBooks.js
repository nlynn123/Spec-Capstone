import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import AuthContext from '../../store/authContext'
import BookItem from '../../Elements/BookItem'

function MyBooks () {
  const authCtx = useContext (AuthContext)
  const [mybooks, setMyBooks] = useState([])

const getAllMyBooks = () => {
  axios.get(`/mybooks/${authCtx.userId}`, {
    headers: {
      authorization: authCtx.token
    } 
  })
  .then(res => {
    console.log(res.data)
    setMyBooks(res.data)
  })
}

useEffect(getAllMyBooks, [])

  return (
    <div>
      
     {mybooks.map(book => {
      return <BookItem book={book.book} myBooks={true}/>
     })}
    </div>
  )
}

export default MyBooks