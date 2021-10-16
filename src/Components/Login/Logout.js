import React from 'react'
import { useHistory } from 'react-router';

const Logout = () => {
    let history = useHistory();

    function HandleLogout() {
        sessionStorage.removeItem('key')
        history.push("/login")
    }

    return (
        <>
           {HandleLogout()}
        </>

    )
}

export default Logout;
