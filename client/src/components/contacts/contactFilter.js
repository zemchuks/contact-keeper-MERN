import React, { useContext, useRef, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactFilter = () => {
    const contactContext = useContext(ContactContext)
    const { filterContact, clearFilter, filtered } = contactContext

    // init ref value
    const text = useRef('')

    // If filtered is === null, the value of the form should be empty
    useEffect(() => {
        if(filtered === null) {
            text.current.value = ''
        }
    })

    const onChange = e => {
        if (text.current.value !== '') {
            filterContact(e.target.value)
        } else {
            clearFilter()
        }
    }
    return (
        <form>
           <input ref={text} type="search" name='search' placeholder='Filter contacts...' onChange={onChange}  />
            
        </form>
    )
}


export default ContactFilter