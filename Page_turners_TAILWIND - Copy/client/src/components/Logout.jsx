import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { AuthContext } from '../contects/AuthProvider'

const Logout = () => {
    const { logOut } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from.pathname || "/";
    const handleLogOut = () => {
        logOut().then(() => {
            alert("Sign-Out successfully!!");
            navigate(from, { replace: true })
        }).catch((error) => {

        });
    }
    return (
        <div className='h-screen bg-teal-100 flex items-center justify-center'>
            <button className='bg-red-700 px-9 py-2 text-white rounded' onClick={handleLogOut}>
                Logout
            </button>
        </div>
    )
}

export default Logout