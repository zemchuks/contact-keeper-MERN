import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import ContactContext from '../../context/contact/contactContext'

// this is a component for one of each contact
// contact is destructure from mapping of Contacts
const ContactItem = ({ contact }) => {
     const contactContext = useContext(ContactContext)
     const { deleteContact, setCurrent, clearCurrent } = contactContext

const { id, name, email, phone, type, facebook, twitter } = contact

   const style = {
        marginRight: '8px'
    }
const style2 = {
    borderRadius: '10px'
}
    // Delete method calls the deleteContact method from contactState
    const handleDelete = () => {
        deleteContact(id)
        clearCurrent()
    }


    return (
        
        <div className='card bg-light'>
            <h3 className='text-primary text-left'style={style2} >
                {/* {''} this is a space */}
                {name}{' '} 
                <span style={{ float: 'right'}} className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>{type}</span>
            </h3>

            {/*  */}
            {/* since email and phone are not required, i need to check for them first */}
            <ul className="list grid-2 m-1">
                {email && (<li style={style2}>
                     <i className='fa fa-envelope-open'></i><span style={style}></span>{email}
                </li>)}
                {phone && (<li>
                     <i className='fa fa-phone'></i><span style={style}></span>{phone}
                </li>)}
                {facebook && (<li>
                     <i className='fab fa-facebook'></i><span style={style}></span>{facebook}
                </li>)}
                {twitter && (<li>
                     <i className='fab fa-twitter'></i><span style={style}></span>{twitter}
                </li>)}
            </ul>

            {/* Add buttons */}
            <p>
            <button className="btn btn-primary btm-sm" onClick={() => setCurrent(contact)} >Edit</button>
            <button className="btn btn-dark btm-sm" onClick={handleDelete}>Delete</button>
            </p>

        </div>
    )
}

ContactItem.proptype = {
    contact: PropTypes.object.isRequired
}
export default ContactItem