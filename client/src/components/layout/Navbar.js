import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


const Navbar = ({ icon, title }) => {

    return (
        <nav className='navbar bg-primary'>
            <h1 style={{ fontWeight: 'bold', fontSize: '35px', color: 'whitesmoke'}}><i className={icon}></i>{title}</h1>
            <ul className='container pullRight'>
                {/* LINK to is used in place of <a> tag */}
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
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