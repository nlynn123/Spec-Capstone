import React, {useState, useContext} from 'react'
import axios from 'axios' 
import AuthContext from '../../store/authContext'
import styles from './Auth.module.css'


const Auth = () => {
    const [register, setRegister] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const authCtx = useContext(AuthContext)

    const handleAuth = (e) => {
        e.preventDefault()
        const body = {username, password, email}
        axios.post (`${register ? '/register' : '/login'}`, body)
        .then(res => {
            console.log(res.data)
            console.log(authCtx)
            const {token, exp, userId, email, username} = res.data
            authCtx.login(token, exp, userId, email, username)
        })
        .catch(err => console.log(err))
    }

  return (
    <div>
        <h1>{register ? 'Register' : 'Login'} Below! </h1>
        {register ? (
            <div className= {styles.form}>
                <form className={styles.auth_form} onSubmit = {e => handleAuth(e)}>
                    <input 
                    placeholder = 'username'
                    onChange = {e=> setUsername(e.target.value)} 
                    value={username}/>
                    <input 
                    className='form-input'
                    placeholder = 'password' 
                    onChange = {e=> setPassword(e.target.value)} 
                    value={password}/>
                    <input
                    className='form-input'
                    placeholder = 'email' 
                    onChange = {e=> setEmail(e.target.value)} 
                    value={email}/>
                    <button className = {styles.submit_btn} >Submit</button>
                </form>
            </div>
        ) : (
            <div className= {styles.form}>
                <form className={styles.auth_form} onSubmit = {e => handleAuth(e)}>
                    <input 
                    className='form-input'
                    placeholder = 'username'
                    onChange = {e=> setUsername(e.target.value)} 
                    value={username}/>
                    <input 
                    className='form-input'
                    placeholder = 'password' 
                    onChange = {e=> setPassword(e.target.value)} 
                    value={password}/>
                    <button className = {styles.submit_btn}>Submit</button>
                </form>
            </div>
        )}

        <button className = {styles.nav_btn} onClick={() => setRegister(!register)}>{register ? "Login" : "Register"}</button>

    </div>
  )
}

export default Auth