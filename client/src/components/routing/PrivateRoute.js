import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

/***
 * This is the standard way to create a private route component in React
 * that requires you to log in
 */

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext)
    
    const { isAuthenticated, loading } = authContext

    return (
        <Route { ...rest }
         render={props => !isAuthenticated && !loading ? (
            <Redirect to='/landing' />) : (
                <Component {...props} />
            )
        } />
    )
}

export default PrivateRoute
