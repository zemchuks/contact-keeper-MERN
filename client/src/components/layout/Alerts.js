import React, { useContext } from 'react'
import AlertContext from '../../context/alert/alertContext'

const Alerts = () => {
    const alertContext = useContext(AlertContext)

    const { alerts } = alertContext
    const style = {
        marginRight: '8px'
    }
    const style2 = {
        width: '75%',
        margin: 'auto'
    }
    return (
        alerts.length > 0  && alerts.map(alert =>( 
            <div style={style2} key={alert.id} className={`alert alert-${alert.type}`}>
                <i style={style} className="fa fa-info-circle"></i>
                { alert.msg }
            </div>
        ))
    )
}
export default Alerts