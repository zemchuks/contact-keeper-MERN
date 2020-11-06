import React, { useReducer } from 'react'
import axios from 'axios'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from '../types'

const ContactState = props => {
    const initialState = {
        contacts: null,
        //when edit is clicked, it should be put into current state
        current: null,
        filtered: null,
        error: null
    }

    const [state, dispatch] = useReducer(contactReducer, initialState)

    const getContacts = async () => {
       
        // dispatch to reducer
        try {
            const res = await axios.get('/api/contacts')
            dispatch({ type: GET_CONTACTS, payload: res.data })
    
        } catch (err) { 
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }
       
    }

    // Add contact - This function reaches out to the API and adds the data to the database
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }   
        // dispatch to reducer
        try {
            const res = await axios.post('/api/contacts', contact, config)
            dispatch({ type: ADD_CONTACT, payload: res.data })
    
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }
       
    }

    // Delete Contact - remove a single contact
    const deleteContact = async id => {
        try {
            // Call the delete endpoint with ID
            await axios.delete(`/api/contacts/${id}`)
            dispatch({ type: DELETE_CONTACT, payload: id })

        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }
      
    }

     // Update Contact
     const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }   
        // dispatch to reducer
        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
            dispatch({ type: UPDATE_CONTACT, payload: res.data })
    
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }
        
    }


    // clear contacts 
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS })
    }

    // Set Current Conatct
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact })
    }

    // Clear Current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }

   
    // Filter Contacts
    const filterContact = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text })
    }

    // Clear filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })
    }

    return (
    <ContactContext.Provider value={{ 
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContact,
        clearFilter,
        getContacts,
        clearContacts
        }}> 
                {props.children} 
            </ContactContext.Provider>
        )     
}

export default ContactState