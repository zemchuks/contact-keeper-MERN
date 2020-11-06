import React, { useState, useContext, useEffect, Fragment } from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'
import loader from "./loading.gif"

const Register = (props) => {
    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

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
            setLoading(true)
            setTimeout(()=>{
                register({ name, email, password })
                setLoading(false)
            }, 1500)
            }
        }
    
    return (
        <Fragment>
            {loading ? <img src={loader} className='loader' alt='' /> :  <div className='form-container'>
            
            <h1>
                Account <span className='text-secondary'>Register</span>
            </h1>
            
            <form onSubmit={onSubmit} >
                <div className='form-group'>
                    <label htmlFor='name' style={{ fontWeight: 'bold', fontSize: '15px'}}>Name</label>
                    <input  type='text' name='name' value={name} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='email' style={{ fontWeight: 'bold', fontSize: '15px'}}>Email</label>
                    <input type='email' name='email' value={email} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='password' style={{ fontWeight: 'bold', fontSize: '15px'}}>Password</label>
                    <input type='password' name='password' value={password} onChange={onChange}  minLength='6' />
                </div>
                <div className='form-group'>
                    <label htmlFor='password2' style={{ fontWeight: 'bold', fontSize: '15px'}}>Confirm Password</label>
                    <input type='password' name='password2' value={password2} onChange={onChange}  minLength='6' />
                </div>

                {/* Submit button */}
                <input type='submit' className='btn btn-success btn-block' />
            </form>
        </div>
        }
       </Fragment>
    )
}

export default Register