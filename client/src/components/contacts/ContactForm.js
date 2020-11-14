import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'

// This form is going to be used to ADD and UPDATE contact
const ContactForm = () => {
    const contactContext = useContext(ContactContext)
    const { addContact, current, updateContact, clearCurrent } = contactContext

    // Fill the form if there's anything in the 'current' value once the form is loaded
    useEffect(() => {
        if(current !== null) {
            setContact(current)
        } else {
          setContact({
              name: '',
              email: '',
              phone: '',
              facebook: '',
              twitter: '',
              type: 'personal'
          })
        }
        //eslint-disable-next-line
    }, [contactContext, current])

    // STATE
    const [contact, setContact] = useState({
        name: '',
        email: '',  
        phone: '', 
        facebook: '', 
        twitter: '',
        type: 'personal'
    })
    const { name, email, phone, type, facebook, twitter } = contact

    //Onchange event
    const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value})

    //Onsubmit event
    const onSubmit = e => {
        if(current === null) {
            // addContact() function will add the new contact to the database
            addContact(contact)
        } else {
            // update the state
            updateContact(contact)
        }
        // Clear the form
        setContact({
            name: '',
            email: '',  
            phone: '', 
            facebook: '', 
            twitter: '',
            type: 'personal'
        })
        e.preventDefault()
    }

    const clearAll = () => {
        clearCurrent()
    }

    return (
        <form className='homeClass' onSubmit={onSubmit}>
            <h2 className='text-primary'>{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input type='text' placeholder='Name' name='name' value={name} onChange={onChange} />

            <input type='email' placeholder='Email' name='email' value={email} onChange={onChange} />

            <input type='text' placeholder='Phone' name='phone' value={phone} onChange={onChange} />

            <input type='text' placeholder='Facebook' name='facebook' value={facebook} onChange={onChange} />

            <input type='text' placeholder='Twitter' name='twitter' value={twitter} onChange={onChange} />
            
            {/* // Type will be radio button */}
            <h5>Contact Type</h5>
            <input type='radio'
                    name='type'
                    value='personal'
                    onChange={onChange}
                    checked={type === 'personal'}
                    /> Personal{' '}

            <input type='radio'
                    name='type'
                    value='professional'
                    onChange={onChange}
                    checked={type === 'professional'}
                    /> Professional{' '}

                    {/* Submit button */}
                    <div className="">
                    <input type='submit'
                    name=''
                    value={current ? 'Update Contact' : 'Add Contact'}
                    className='btn btn-primary btn-block'
                    />
                    </div>
                    {current && <div>
                        <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
                    </div> }
        </form>
    )
}
export default ContactForm