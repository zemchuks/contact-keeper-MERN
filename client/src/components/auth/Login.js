import React, { useState, useContext, useEffect, Fragment } from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'
import loader from "./loading.gif"

const Login = (props) => {
    const [loading, setLoading] = useState(false)
    const alertContext = useContext(AlertContext)
    const { setAlert } = alertContext

    const authContext = useContext(AuthContext)
     // Pull out from authContext the error in the state
     const { login, error, clearErrors, isAuthenticated} = authContext

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
            setLoading(true)
            setTimeout(()=>{
                login({ email, password })
            }, 1500)
        }
       }
    
    return (
       <Fragment>
            {/* {isAuthenticated ? <Spinner setTimeout={2000} />  : ( */}
            {loading ? <img src={loader} className='loader' /> : 
            <div className='form-container'>
                <center>
                <h1>
                    Account <span className='text-primary'>Login</span>
                </h1>
                </center>
                <form onSubmit={onSubmit}>
                    
                    <div className='form-group'>
                        <label htmlFor='email' style={{ fontWeight: 'bold', fontSize: '15px'}}>Email</label>
                        <input type='email' name='email' value={email}  onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password' style={{ fontWeight: 'bold', fontSize: '15px'}}>Password</label>
                        <input type='password' name='password' value={password} onChange={onChange}  minLength='6' />
                    </div>
    
                    {/* Submit button */}
                    <input type='submit' value='LOG IN' className='btn btn-success btn-block' />
                </form>
            </div> }
            
            
            
       </Fragment>
        
    )
}

export default Login