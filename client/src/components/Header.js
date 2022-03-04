import React from 'react';
import {AppBar, ButtonGroup, IconButton, Toolbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import {userIn} from "../features/user";

const Header = () => {

    const nav = useNavigate()
    const {pages} = useSelector(state => state.pages.value)
    const {user} = useSelector(state => state.user.value)
    const id = localStorage.getItem('secretKey')
    const disp = useDispatch()

    function check() {
        return id && pages !== 'create'
    }

    function exit() {
        disp(userIn(''))
        localStorage.clear()
        nav('/')
    }

    return (
        <AppBar position={"static"}>
            <Toolbar sx={{backgroundColor: 'lightblue', display: 'flex', justifyContent: 'space-around'}}>
                <ButtonGroup variant="text" aria-label="text button group">
                    {pages !== 'main' && < Button onClick={() => nav('/')}>Main</Button>}
                    {!id && <Button onClick={() => nav('/register')}>Register</Button>}
                    {!id && <Button onClick={() => nav('/login')}>Login</Button>}
                    {check() && <Button onClick={() => nav('/create')}>Create Product</Button>}
                </ButtonGroup>
                {user.length > 0 && <Typography variant={'h5'}>
                    User: {user}
                    <IconButton onClick={exit} aria-label="delete" size="small" sx={{marginLeft: 1}}>
                        <LogoutIcon fontSize="inherit"/>
                    </IconButton>
                </Typography>
                }
            </Toolbar>
        </AppBar>
    );
};

export default Header;