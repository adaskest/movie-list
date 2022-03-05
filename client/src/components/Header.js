import React from 'react';
import {AppBar, ButtonGroup, IconButton, Toolbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {userIn} from "../features/user";
import {addMovies} from "../features/movies";

const Header = () => {

    const nav = useNavigate()
    const {pages} = useSelector(state => state.pages.value)
    const {user} = useSelector(state => state.user.value)
    const {notifications} = useSelector(state => state.movies.value)
    const id = localStorage.getItem('secretKey')
    const disp = useDispatch()

    function check() {
        return id && pages !== 'create'
    }

    function exit() {
        disp(userIn(''))
        disp(addMovies([]))
        localStorage.clear()
        fetch('http://localhost:4000/logout')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                }
            )
        nav('/')
    }

    return (
        <AppBar position={"static"}>
            <Toolbar sx={{backgroundColor: 'lightblue', display: 'flex', justifyContent: 'space-around'}}>
                <ButtonGroup variant="text" aria-label="text button group">
                    {pages !== 'main' && < Button onClick={() => nav('/')}>Main</Button>}
                    {!id && <Button onClick={() => nav('/register')}>Register</Button>}
                    {!id && <Button onClick={() => nav('/login')}>Login</Button>}
                    {check() && <Button onClick={() => nav('/create')}>Add Movie</Button>}
                </ButtonGroup>
                {user.length > 0 && <Typography variant={'h5'}>
                    User: {user}
                    {notifications.length > 0 && <IconButton aria-label="delete" size="small" sx={{marginLeft: 1}}>
                        <NotificationsActiveIcon fontSize="inherit"/>
                    </IconButton>}
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