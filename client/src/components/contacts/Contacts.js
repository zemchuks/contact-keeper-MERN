import React, { Fragment, useContext } from 'react'
import ContactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem'

// This is to have access to any state associated with this context
const Contacts = () => {
    // init context
    const contactContext = useContext(ContactContext)

    const { contacts } = contactContext

    return (
        <Fragment>
            {contacts.map(contact => (
                <ContactItem contact={contact} key={contact.id} />
            ))}
        </Fragment>
    )
}
export default Contacts