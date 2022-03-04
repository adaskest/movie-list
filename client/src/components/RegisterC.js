import * as React from 'react';
import {useRef, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import {Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Registration = () => {

    const username = useRef()
    const pass1 = useRef()
    const pass2 = useRef()
    const [error, setError] = useState('')
    const nav = useNavigate()

    function register() {
        const user = {
            user: username.current.value,
            passOne: pass1.current.value,
            passTwo: pass2.current.value,
        }
        const options = {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(user)
        }

        fetch('http://localhost:4000/register', options)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    nav('/login')
                } else {
                    setError(data.message)
                    setTimeout(() => {
                        setError('')
                    }, 2000)
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
                inputRef={username}
            />
            <TextField
                inputRef={pass1}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password One"
                type="password"
                id="passwordOne"
            />
            <TextField
                inputRef={pass2}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password Two"
                type="password"
                id="passwordTwo"
            />
            <Button
                onClick={register}
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
            >
                Register
            </Button>
            <Typography variant={'h6'}>
                {error}
            </Typography>
        </Container>
    );
};

export default Registration;