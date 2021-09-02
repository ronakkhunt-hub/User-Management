import React from 'react'
import { useHistory } from 'react-router-dom';

import './Home.css'

const Home = () => {

    let history = useHistory();

    function isLogin() {
        if (localStorage.getItem('loggedIn', true)) {
            return true
        }
        return false
    }

    function HandleLogout() {
        localStorage.removeItem('loggedIn')
        history.push("/login")
    }

    return (
        <div className='home'>
            <h1>Home Page</h1>
            {isLogin() ?
                <button className="logout_button" onClick={HandleLogout}>Logout</button>
                : null
            }
        </div>
    )
}

export default Home;
