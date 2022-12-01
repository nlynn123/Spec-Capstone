import React, { useState, useEffect, useCallback, createContext } from 'react'

let logoutTimer

const AuthContext = createContext ({
    token: '',
    login: () => {},
    logout: () => {}, 
    userId: null,
    email: null,
    username: null
})

const calculateRemaining = (exp) => {
    const currentTime = new Date().getTime()
    const expTime = exp
    const remainingTime = expTime - currentTime
    return remainingTime
}

const getLocalData = () => {
    const storedToken = localStorage.getItem('token')
    const storedExp = localStorage.getItem('exp')
    const storedUserId = localStorage.getItem('userId')
    const storedEmail = localStorage.getItem('email')
    const storedUsername = localStorage.getItem('username')

    const remainingTime = calculateRemaining(storedExp)

    if(remainingTime <= 1000* 60 * 30 ){
        localStorage.removeItem('token')
        localStorage.removeItem('exp')
        localStorage.removeItem('userId')
        localStorage.removeItem('email')
        localStorage.removeItem('username')

        return null
    }

    return {
        token: storedToken,
        duration: remainingTime, 
        userId: storedUserId,
        email: storedEmail,
        username: storedUsername
    }
}

export const AuthContextProvider = (props) => {
    let localData = getLocalData()

    let initialToken
    let initialUserId
    let initialEmail
    let initialUsername


    if(localData){
        initialToken = localData.token
        initialUserId = localData.userId
        initialEmail = localData.email
        initialUsername = localData.username
    }

    const [userId, setUserId] = useState(initialUserId)
    const [token, setToken] = useState(initialToken)
    const [email, setEmail] = useState(initialEmail)
    const [username, setUsername] = useState(initialUsername)

    const logout = useCallback(() => {
        setUserId(null)
        setToken(null)
        setEmail(null)
        setUsername(null)

        localStorage.removeItem('token')
        localStorage.removeItem('exp')
        localStorage.removeItem('userId')
        localStorage.removeItem('email')
        localStorage.removeItem('username')

        if(logoutTimer) {
            clearTimeout(logoutTimer)
        }
    }, [])

    const login = (token, exp, userId, email, username) => {
        setUserId(+userId)
        setToken(token)
        setEmail(email)
        setUsername(username)

        localStorage.setItem('token', token)
        localStorage.setItem('userId', +userId)
        localStorage.setItem('email', email)
        localStorage.setItem('username', username)
        localStorage.setItem('exp', exp)

        const remainingTime = calculateRemaining(exp)

        logoutTimer = setTimeout(logout, remainingTime)

    }

    useEffect(() =>{
        if(localData){
            logoutTimer = setTimeout(logout, localData.duration)
        }
    })


    const contextValue = {
        token,
        userId,
        email,
        username,
        login,
        logout
    }

    return (
        <AuthContext.Provider value = {contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext