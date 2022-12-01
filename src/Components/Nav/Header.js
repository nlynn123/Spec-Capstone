import React, { useContext } from 'react'
import {NavLink} from 'react-router-dom'
import AuthContext from '../../store/authContext'
import styles from "./Header.module.css";


const Header = () => {
  const authCtx = useContext(AuthContext)
  return (
    <header>
      <h2 className={styles.header_title}></h2>
      <nav>
        { authCtx.token ? (
           <ul className='main-nav'>
     <NavLink to='/' className={styles.nav_btn}>Home</NavLink>
      <NavLink to='/addbook' className={styles.nav_btn}>Add a Favorite Book</NavLink>
      <NavLink to='/mybooks' className={styles.nav_btn}>My TBR List</NavLink>
      <button className={styles.nav_btn} onClick={() => authCtx.logout()}>Logout</button>
      </ul>
        ) : (
          <ul className='main-nav'>
          <NavLink to='/' className={styles.nav_btn}>Home</NavLink>
          <NavLink to='/auth' className={styles.nav_btn}>Login or Sign Up</NavLink>
          </ul>
        )}
      </nav>
    </header>
  )
}

export default Header