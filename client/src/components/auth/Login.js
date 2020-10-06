import React, { useState, useContext } from 'react'
import AlertContext from '../../context/alert/alertContext'

const Login = () => {
    const alertContext = useContext(AlertContext)
    const { setAlert } = alertContext

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
            setAlert('Please, Fill all fields', 'danger')
        } else  {
          console.log('register user');
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
                    <input type='password' name='password' value={password} onChange={onChange} />
                </div>

                {/* Submit button */}
                <input type='submit' value='LOG IN' className='btn btn-primary btn-block' />
            </form>
        </div>
    )
}

export default Login