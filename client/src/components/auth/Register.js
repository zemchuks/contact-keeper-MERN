import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Register = (props) => {
    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)

    const { setAlert } = alertContext
    // Pull out from authContext the error in the state
    const { register, error, clearErrors, isAuthenticated } = authContext

    // Alert to let the user know that 'user already exist'
    useEffect(() => {
        // if isAuthenticated is true, then redirect 
        if(isAuthenticated) {
            props.history.push('/')
        }
        if(error === 'User already exist!') {
            setAlert(error, 'danger')
            clearErrors()
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        name: '',
        email: '',  
        password: '',
        password2: ''    
    })

    const { name, email, password, password2 } = user

    // onChange Method
    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value})

    //onSubmit Event
    const onSubmit = (e) => {
        e.preventDefault()
        if (name === '' || email === '' || password === '' || password2 === '') {
            setAlert('Please, Fill all fields', 'danger')
        } else if(password !== password2) {
         setAlert('Passwords do not match', 'danger')
        } else {
            register({ name, email, password })
        }
       }
    
    return (

        <div className='form-container'>
            
            <h1>
                Account <span className='text-primary'>Register</span>
            </h1>
            
            <form onSubmit={onSubmit} data-aos="fade-right">
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' value={name} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' value={email} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' value={password} onChange={onChange}  minLength='6' />
                </div>
                <div className='form-group'>
                    <label htmlFor='password2'>Confirm Password</label>
                    <input type='password' name='password2' value={password2} onChange={onChange}  minLength='6' />
                </div>

                {/* Submit button */}
                <input type='submit' className='btn btn-primary btn-block' />
            </form>
        </div>
    )
}

export default Register