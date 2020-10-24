import React, { Fragment, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem'
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Spinner from '../layout/Spinner'

// This is to have access to any state associated with this context
const Contacts = () => {
    // init context
    const contactContext = useContext(ContactContext)
        // pulled contacts and filtered from contactstate
    const { contacts, filtered, getContacts, loading } = contactContext

    useEffect(() => {
        getContacts()
        // eslint-disable-next-line
    }, [])

        //
    if(contacts !== null && contacts.length === 0 && !loading) {
       return  <h4>Please add a contact</h4>
    }

    return (
        <Fragment>
            {contacts !== null && !loading ? (
                 <TransitionGroup>
                 {/* check if filterd is not empty, then map through the filtered contacts, then load the contact item */}
     
                 {filtered !== null ? filtered.map(contact => (
                 <CSSTransition key={contact._id} timeout={500} classNames='item'>
                     <ContactItem contact={contact} />
                 </CSSTransition>   
                 ))
                 : contacts.map(contact => (
                     <CSSTransition key={contact._id} timeout={500} classNames='item'>
                     <ContactItem key={contact.id} contact={contact} />
                     </CSSTransition>
                 ))}
            
            </TransitionGroup>
            ) : <Spinner />}
           
        </Fragment>
    )
}
export default Contacts