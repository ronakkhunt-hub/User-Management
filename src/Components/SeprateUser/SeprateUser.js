import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import { getOneUser } from '../../utils/axiosApi'

import "./SeprateUser.css"

const SeprateUser = (props) => {
    const [seprateUser, setSeprateUser] = useState("");
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        if (props.location.state?.isFromParent) {
            getSeprateUserData()
        } else {
            history.push(`/user`);
        }
    })

    async function getSeprateUserData() {
        const userInfo = await getOneUser({
            url: `api/getOne-user/${id}`,
        });
        setSeprateUser(userInfo.data.data);
    }

    return (
        <>
            <div className="main">
                <div className="containers">
                    <div className="avatar-flip">
                        {/* <img src={seprateUser.profile} height="150" width="150" alt="Profile"></img> */}
                    </div>
                    <h2 className="name">{seprateUser.firstName} {seprateUser.lastName}</h2>
                    <h4>{seprateUser.email}</h4>
                    <p>{seprateUser.description}</p>
                    <p>{seprateUser.hobby}</p>
                </div>
            </div>
        </>
    )
}

export default SeprateUser

