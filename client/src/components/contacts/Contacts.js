import React, { Fragment, useContext } from 'react'
import ContactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem'
import { CSSTransition, TransitionGroup } from "react-transition-group";

// This is to have access to any state associated with this context
const Contacts = () => {
    // init context
    const contactContext = useContext(ContactContext)
        // pulled contacts and filtered from contactstate
    const { contacts, filtered } = contactContext

    if(contacts.length === 0) {
       return  <h4>Please add a contact</h4>
    }

    return (
        <Fragment>
            <TransitionGroup>
            {/* check if filterd is not empty, then map through the filtered contacts, then load the contact item */}

            {filtered !== null ? filtered.map(contact => (
            <CSSTransition key={contact.id} timeout={500} classNames='item'>
                <ContactItem contact={contact} />
            </CSSTransition>   
            ))
            : contacts.map(contact => (
                <CSSTransition key={contact.id} timeout={500} classNames='item'>
                <ContactItem contact={contact} />
                </CSSTransition>
            ))}
       
       </TransitionGroup>
        </Fragment>
    )
}
export default Contacts