import React, {useEffect} from 'react';
import RegisterC from "../components/RegisterC";
import {useDispatch} from "react-redux";
import {showPage} from "../features/pages";
import {userIn} from "../features/user";

const RegisterPage = () => {

    const disp = useDispatch()
    useEffect(() => {
        disp(showPage('register'))
        disp(userIn(''))
        localStorage.clear()
    }, [])

    return (<div>
            <RegisterC/>
        </div>);
};

export default RegisterPage;