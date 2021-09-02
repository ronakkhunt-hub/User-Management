import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import "./SeprateUser.css"

const SeprateUser = () => {
    const location = useLocation();
    const seprateId = location.pathname.substring(1);

    const employee = useSelector(state => state.EmpReducer.list)

    const seprateUser = employee.filter((user) => user.id === parseInt(seprateId))

    return (
        <>
            {seprateUser && seprateUser.map((user, i) => (
                <div key={i} className="containers">
                    <div className="avatar-flip">
                        <img src={user.profile} height="150" width="150" alt="Profile"></img>
                    </div>
                    <h2 className="name">{user.firstName} {user.lastName}</h2>
                    <h4>{user.email}</h4>
                    <p>{user.description}</p>
                    <p>{user.hobby}</p>
                </div>
            ))}
        </>
    )
}

export default SeprateUser

