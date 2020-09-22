import React from 'react'
import PropTypes from 'prop-types'

// this is a component for one of each contact
// contact is destructure from mapping of Contacts
const ContactItem = ({ contact }) => {

const { id, name, email, phone, type, facebook, twitter } = contact

   const style = {
        marginRight: '8px'
    }

    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {/* {''} this is a space */}
                {name}{' '} 
                <span style={{ float: 'right'}} className={'badge ' + (type === 'Professional' ? 'badge-success' : 'badge-primary')}>{type}</span>
            </h3>

            {/* since email and phone are not required, i need to check for them first */}
            <ul className="list grid-2 m-1">
                {email && (<li>
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
            <button className="btn btn-primary btm-sm">Edit</button>
            <button className="btn btn-dark btm-sm">Delete</button>
            </p>

        </div>
    )
}

ContactItem.proptype = {
    contact: PropTypes.object.isRequired
}
export default ContactItem