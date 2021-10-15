import React from 'react'
import { useHistory } from 'react-router';

const Logout = () => {
    let history = useHistory();

    function HandleLogout() {
        localStorage.removeItem('loggedIn')
        history.push("/login")
    }

    return (
        <>
           {HandleLogout()}
        </>

    )
}

export default Logout;
