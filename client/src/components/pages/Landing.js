import React, { Fragment } from 'react'

import { Link } from 'react-router-dom'

const Landing = () => {
    return (

      <Fragment>
        <div className='content'>
          <div className="jumbotron jumbotron-fluid mb-0">
            <div className="jumbo">
              <div className="row justify-content-center text-center">
                <div className="col-md-10 col-lg-6">
                  <h1 className="display-5">The Coolest Online storage of personal Information</h1>

                  <p className="lead">How you store contacts have never been more secure. Where you choose to work has impact on your productivity and creativity.</p>

                  <Fragment>
                    <ul>
                  <li><Link className="btn btn-primary btn-lg" role="button" to="/register">Get Started</Link></li>
                  </ul>
                  </Fragment>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
}

export default Landing
