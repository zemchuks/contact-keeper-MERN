import React, { Fragment } from 'react'

import { Link } from 'react-router-dom'

const Landing = () => {
    return (

      <Fragment>
        <div className='content'>
         
            
              <div className="text-center jumbo">
                  <h1 className="large">The Coolest Online storage of personal Information</h1>

                  <p className="lead">How you store contacts have never been more secure. Where you choose to work has impact on your productivity and creativity.</p>

                  <Fragment>
                    <ul><Link className="btn btn-primary btn-lg" role="button" to="/register">Get Started</Link>
                  </ul>
                  </Fragment>
              </div>
          </div>
        
      </Fragment>
    )
}

export default Landing
