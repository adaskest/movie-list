import React, {useEffect} from 'react';
import LoginC from "../components/LoginC";
import {useDispatch} from "react-redux";
import {showPage} from "../features/pages";
import {userIn} from "../features/user";

const LoginPage = () => {
    const disp = useDispatch()
    useEffect(() => {
        disp(showPage('login'))
    }, [])
    return (
        <div>
            <LoginC/>
        </div>
    );
};

export default LoginPage;