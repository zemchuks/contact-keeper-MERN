import React, { Fragment } from 'react'
import loader from './loading.gif'

const Spinner = () => (
    <Fragment>
        <img src={loader} className='loader' alt='Loading...' />
    </Fragment>
)
export default Spinner 