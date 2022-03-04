import * as React from 'react';
import {useRef, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import {Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {userIn} from "../features/user";


export default function SignIn() {

    const disp = useDispatch()
    const user = useRef()
    const pass1 = useRef()
    const [error, setError] = useState('')
    const nav = useNavigate()

    function login() {

        const loggin = {
            user: user.current.value,
            pass: pass1.current.value,
        }
        const options = {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(loggin)
        }

        fetch('http://localhost:4000/login', options)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    disp(userIn(data.message.user))
                    localStorage.setItem('secretKey', data.message.id)
                    nav('/')
                } else {
                    setError(data.message)
                    setTimeout(() => {
                        setError('')
                    }, 1000)
                }
            })
    }

    return (
        <Container component="main" maxWidth="xs">
            <TextField
                margin="normal"
                required
                fullWidth
                autoFocus
                label="Username"
                inputRef={user}
            />
            <TextField
                inputRef={pass1}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
            />
            <Button
                onClick={login}
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
            >
                Sign In
            </Button>
            <Typography variant={'h6'}>
                {error}
            </Typography>
        </Container>
    );
}