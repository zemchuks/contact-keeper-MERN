import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import ContactContext from '../../context/contact/contactContext'

const Navbar = ({ icon, title }) => {
    const authContext = useContext(AuthContext)
    const contactContext = useContext(ContactContext)

    const { isAuthenticated, logout, user } = authContext
    // Bring clear contacts from contactContext
    const { clearContacts } = contactContext

        const onLogout = () => {
            // logs the user out
            logout()
            // When user logs out, clear the contacts as well
            clearContacts()
        }
        const style = {
            marginRight: '8px'
        }
        const style2 = {
            fontWeight: 'bold',
            fontSize: '16px'
        }

    const authLinks = (
        <Fragment>
            <li className='hello-item'>Hello, <span style={style2}>{ user && user.name }</span> </li>
            <li>
                <a href='#!' onClick={onLogout}><i className='fas fa-sign-out-alt'></i>
                <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/landing"><i className="fas fa-backward"><span className='hide-sm'><span style={style}></span>Home</span></i></Link></li>
        </Fragment>
    )

    return (
        <nav className='navbar bg-primary nav-heading'>
            <div className='container'>
            <h1><i className={icon}></i>{title}</h1>
            </div>
           
            <ul className='container pullRight'>
                {/* LINK to is used in place of <a> tag */}
                { isAuthenticated ? authLinks : guestLinks }
            </ul>
        </nav>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}
Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: 'fas fa-id-card-alt m-1'
}

export default Navbar