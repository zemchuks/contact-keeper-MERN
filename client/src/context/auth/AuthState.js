import React, { useReducer } from 'react'
import AuthContext from '../auth/authContext'
import authReducer from '../auth/authReducer'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types'

const AuthState = props => {
    const initialState = {
       token: localStorage.getItem('token'),
       isAuthenticated: null,
       loading: true,
       user: null,
       error: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    // Load User
    const loadUser = async () => {
         // @todo - load token into global headers
        // check localStorage from the registered user to see if token is there
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        } 
       
        try {
            // Making a 'GET' request to check the token to see if user is valid 
            const res = await axios.get('/api/auth')


            dispatch({ type: USER_LOADED, payload: res.data})
        } catch (error) {
            // if something goes wrong dispatch the AUTH_ERROR MEthod
            dispatch({ type: AUTH_ERROR })
        }
    }

    // Register User
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }   
        }

        try {
            const res = await axios.post('/api/users', formData, config)
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            
            // call loadUser
            loadUser()

        } catch (err) { 
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            })
        }
    }

    // Login User
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }   
        }

        try {
            const res = await axios.post('/api/auth', formData, config)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })   
            // call loadUser
            loadUser()
        } catch (err) { 
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            })
        }
        
    }

    //Logout
    const logout = () => dispatch({ type: LOGOUT });

    // Clear Error
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return (
    <AuthContext.Provider value={{ 
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors
        }}> 
            {props.children} 
    </AuthContext.Provider>
        )     
}

export default AuthState