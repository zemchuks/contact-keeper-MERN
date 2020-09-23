import React, { useReducer } from 'react'
import {v4 as uuid} from 'uuid'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types'

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Jane Frances',
                email: 'jane@gmail.com',
                phone: '234-158-192',
                facebook: 'Bruno Austin',
                twitter: '@bruno_austane',
                type: 'Personal'
            },
            {
                id: 2,
                name: 'Bruno Austin',
                email: 'bruno@gmail.com',
                phone: '234-634-524',
                facebook: 'Max Bon',
                twitter: '@maxbon_guy',
                type: 'Personal'
            },
            {
                id: 3,
                name: 'Vera Ana',
                email: 'ana@gmail.com',
                phone: '2345-544-455',
                facebook: 'Veralux',
                twitter: '@chukwusomeje',
                type: 'Professional'
            }
        ]
    }

    const [state, dispatch] = useReducer(contactReducer, initialState)

    // Add contact - This function reaches out to the API and adds the data to the database
    const addContact = contact => {
        contact.id = uuid
        // dispatch to reducer
        dispatch({ type: ADD_CONTACT, payload: contact })
    }

    // Delete Contact
    const deleteContact = (id) => {
        dispatch({ type: DELETE_CONTACT, payload: id })
    }

    // Set Current Conatct

    // Clear Current Contact

    // Update Contact

    // Filter Contacts

    // Clear filter


    return ( 
    <ContactContext.Provider value={{ 
        contacts: state.contacts,
        addContact,
        deleteContact
        }}> 
                {props.children} 
            </ContactContext.Provider>
        )     
}

export default ContactState