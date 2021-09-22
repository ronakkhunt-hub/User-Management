import React from 'react'
import { useHistory } from 'react-router';
import HeaderLink from '../Header/Link';

import './Home.css'

const Home = () => {

    let history = useHistory();

    function isLogin() {
        if (localStorage.getItem('loggedIn')) {
            return true
        }
        return false
    }

    function HandleLogout() {
        localStorage.removeItem('loggedIn')
        history.push("/login")
    }

    return (
        <>
            <HeaderLink />
            <div className='home'>
                <h1>Home Page</h1>
                {isLogin() ?
                    <button className="logout_button" onClick={HandleLogout}>Logout</button>
                    : null
                }
            </div>
        </>

    )
}

export default Home;
