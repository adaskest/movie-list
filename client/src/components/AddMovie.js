import React, {useRef, useState} from 'react';import Container from "@mui/material/Container";import TextField from "@mui/material/TextField";import Button from "@mui/material/Button";import {useNavigate} from "react-router-dom";import {addMovies} from "../features/movies";import {useDispatch} from "react-redux";import {CircularProgress, Typography} from "@mui/material";import http from "../plugins/http";const AddMovie = () => {        const disp = useDispatch()        const movieID = useRef()        const nav = useNavigate()        const [error, setError] = useState('')        const [loading, setLoading] = useState(false)        function validate() {            if (movieID.current.value.length === 0) return setError("Add movie ID")            create()        }        function create() {            setLoading(!loading)            const id = localStorage.getItem('secretKey')            const movie = {                title: movieID.current.value,                creator: id            }            http.post(movie, 'create').then(data => {                setLoading(!loading)                if (data.success) {                    disp(addMovies(data.message))                }                nav('/')            })        }        return (            <Container component="main" maxWidth="xs" sx={{display: 'flex', justifyContent: 'center', marginTop: 10}}>                {!loading ? <Container component="main" maxWidth="xs">                        <TextField                            margin="normal"                            fullWidth                            label="OneMovie ID"                            autoFocus                            inputRef={movieID}                        />                        <Button                            onClick={validate}                            type="submit"                            fullWidth                            variant="contained"                            sx={{mt: 3, mb: 2}}                        >                            Add movie                        </Button>                        <Typography variant={'h6'}>                            {error}                        </Typography>                    </Container> :                    <CircularProgress/>}            </Container>        );    };export default AddMovie;