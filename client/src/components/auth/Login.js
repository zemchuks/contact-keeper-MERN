import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Login = (props) => {
    const alertContext = useContext(AlertContext)
    const { setAlert } = alertContext

    const authContext = useContext(AuthContext)
     // Pull out from authContext the error in the state
     const { login, error, clearErrors, isAuthenticated } = authContext

    useEffect(() => {
        // if isAuthenticated is true, then redirect 
        if(isAuthenticated) {
            props.history.push('/')
        }
        if(error === 'Invalid Credentials') {
            setAlert(error, 'danger')
            clearErrors()
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

            const [user, setUser] = useState({
                email: '',  
                password: ''   
            })
            const { email, password } = user

    // onChange Method
    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value})

    //onSubmit Event
    const onSubmit = (e) => {
        e.preventDefault()
        if (email === '' || password === '') {
            setAlert('Please, fill in all fields', 'danger')
        } else  {
          login({ email, password })
        }
       }
    
    return (

        <div className='form-container'>
            <center>
            <h1>
                Account <span className='text-primary'>Login</span>
            </h1>
            </center>
            <form onSubmit={onSubmit}>
                
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' value={email} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' value={password} onChange={onChange}  minLength='6' />
                </div>

                {/* Submit button */}
                <input type='submit' value='LOG IN' className='btn btn-primary btn-block' />
            </form>
        </div>
    )
}

export default Login