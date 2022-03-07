import React, {useState} from 'react';
import {
    AppBar,
    ButtonGroup,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    IconButton,
    Toolbar,
    Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import {addNotif, userIn} from "../features/user";
import {addMovies} from "../features/movies";

const Header = () => {

    const nav = useNavigate()
    const {pages} = useSelector(state => state.pages.value)
    const {user} = useSelector(state => state.user.value)
    const {notifications} = useSelector(state => state.user.value)
    const id = localStorage.getItem('secretKey')
    const disp = useDispatch()
    const [showNotif, setShowNotif] = useState(false)

    function userCreate() {
        return id && pages !== 'create'
    }

    function userLogin() {
        return !id && pages !== 'login'
    }

    function userRegister() {
        return !id && pages !== 'register'
    }

    function exit() {
        disp(userIn(''))
        disp(addMovies([]))
        localStorage.clear()
        setShowNotif(false)
        fetch('http://localhost:4000/logout/' + id)
            .then(res => res.json())
            .then(data => {
                    if (data.success) disp(addNotif([]))
                }
            )
        nav('/')
    }

    function goTo(movieId, index) {
        const removeNotif = {
            userID: id,
            index
        }
        const options = {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(removeNotif)
        }
        fetch('http://localhost:4000/remove-notification', options)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    console.log(data)
                    disp(addNotif(data.message))
                }
            })
        setShowNotif(!showNotif)
        nav('/movie/' + movieId)
    }

    return (
        <AppBar position={"static"}>
            <Toolbar sx={{backgroundColor: 'lightblue', display: 'flex', justifyContent: 'space-around'}}>
                <ButtonGroup variant="text" aria-label="text button group">
                    {pages !== 'main' && < Button onClick={() => nav('/')}>Main</Button>}
                    {userRegister() && <Button onClick={() => nav('/register')}>Register</Button>}
                    {userLogin() && <Button onClick={() => nav('/login')}>Login</Button>}
                    {userCreate() && <Button onClick={() => nav('/create')}>Add Movie</Button>}
                </ButtonGroup>
                {user.length > 0 &&
                    <div className='user'>
                        <Typography variant={'h5'}>
                            {user}
                            {notifications.length > 0 &&
                                <IconButton onClick={() => setShowNotif(!showNotif)} size="small"
                                            sx={{ml: 1, color: '#B30000',}}>
                                    <NotificationsActiveIcon fontSize="inherit"/>
                                    ({notifications.length})
                                </IconButton>}
                            <IconButton onClick={exit} aria-label="exit" size="small" sx={{ml: 1,}}>
                                <LogoutIcon fontSize="inherit"/>
                            </IconButton>
                        </Typography>
                        {showNotif &&
                            <Card sx={{position: 'absolute', top: 50, left: 150, backgroundColor: 'transparent'}}>
                                {notifications.map((x, i) =>
                                    <Card key={i} onClick={() => goTo(x.movieId, x.notifIndex)}
                                          sx={{width: 350, display: 'flex', alignItems: 'center', mt: 1}}>
                                        <CardActionArea sx={{display: 'flex'}}>
                                        <CardMedia
                                            component="img"
                                            style={{height: 100, width: 120}}
                                            image={x.photo}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="button" component="div">
                                                You have a comment on movie: <b>{x.movieTitle}</b>
                                            </Typography>
                                        </CardContent>
                                        </CardActionArea>
                                    </Card>)}
                            </Card>}
                    </div>
                }
            </Toolbar>
        </AppBar>
    );
};

export default Header;