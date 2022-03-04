import React, {useEffect, useRef, useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    ImageList,
    ImageListItem,
    Rating,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {createStyles, makeStyles} from '@mui/styles';
import {createTheme} from "@mui/material/styles";
import {useParams} from "react-router-dom";
import {showPage} from "../features/pages";
import {addMovies} from "../features/movies";

const useStyles = makeStyles((theme) =>
    createStyles({
        nextIcon: {
            cursor: 'pointer',
            color: 'red',
            fontSize: '40px',
            position: 'absolute',
            top: '50%',
            right: '10px',
            zIndex: 2,
        },
        previewsIcon: {
            cursor: 'pointer',
            color: 'red',
            fontSize: '40px',
            position: 'absolute',
            top: '50%',
            left: '10px',
            zIndex: 2
        },
        img: {
            position: "absolute",
            height: 500,
            width: 700,
        },
        card: {
            backgroundColor: '#fff3e0',
            width: 1100,
            height: 'fit-content',
            margin: theme.spacing(2)
        },
        ImageList: {
            width: 700,
            height: 500,
            overflowX: 'hidden',
            overflowY: 'hidden',
            margin: theme.spacing(2)
        },
        sliderContainer: {
            width: '90%',
            padding: theme.spacing(2),
        },
        box: {
            width: 250
        },
        text: {
            width: '50%',
            marginRight: theme.spacing(2)
        },
        sliderBox: {
            width: 200,
            marginRight: theme.spacing(3),
        },
        reviews: {
            width: '90%',
            padding: theme.spacing(1, 4),
            margin: '10px auto',
            backgroundColor: '#ff9100',
            borderRadius: 10,
            border: 2
        }
    }),
);

const theme = createTheme();

const Movie = () => {

    const classes = useStyles();
    const disp = useDispatch()
    const {movies} = useSelector(state => state.movies.value)
    const [ratings, setRatings] = useState(0)
    const commentRef = useRef()
    const {id} = useParams()
    const userId = localStorage.getItem('secretKey')

    useEffect(() => {
        disp(showPage(''))
    }, [])

    const movie = movies.find(x => x.id === id)

    function addComment() {

        const comment = {
            com: commentRef.current.value,
            rating: ratings,
        }
        const newCom = {
            id: movie.id,
            comment,
            creator: userId
        }
        const options = {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(newCom)
        }

        fetch('http://localhost:4000/comment', options)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    disp(addMovies(data.message))
                }
            })
        commentRef.current.value = ''
        setRatings(0)
    }

    return (
        <ThemeProvider theme={theme}>
            <Card className={classes.card}>
                <div className={'d-flex'}>
                    <div>
                        <ImageList className={classes.ImageList} cols={1} gap={8}>
                            <ImageListItem>
                                <img className={classes.img}
                                     src={movie.poster}
                                     alt=''
                                     loading="lazy"
                                />)
                            </ImageListItem>
                        </ImageList>
                        {userId && <Container className={classes.sliderContainer}>
                            <div className={'d-flex'}>
                                <TextField className={classes.text}
                                           inputRef={commentRef}
                                           id="outlined-textarea"
                                           label="Add Comment"
                                           placeholder="I like this movie."
                                           multiline
                                />
                                <Box className={classes.sliderBox}>
                                    <Typography component="legend">Add rating</Typography>
                                    <Rating
                                        name="simple-controlled"
                                        value={ratings}
                                        onChange={(event, newValue) => {
                                            setRatings(newValue);
                                        }}
                                    />
                                </Box>
                            </div>
                            <div className={'d-flex'}>
                                <Button onClick={addComment} sx={{marginRight: 2, marginTop: 5}} variant={"contained"}>Add
                                    Comment</Button>
                            </div>
                        </Container>}
                        <Container sx={{flexDirection: 'column'}}>
                            {movie.reviews.map((review, i) => <Box key={i} className={classes.reviews}>
                                <Box sx={{display: 'flex'}}>
                                    <Typography gutterBottom variant="body1" component="div">
                                        {review.user}
                                    </Typography>
                                    <Rating
                                        sx={{marginLeft: '20px'}}
                                        name="simple-controlled"
                                        value={review.rating}
                                    />
                                </Box>
                                <Typography gutterBottom variant="body1" component="div">
                                    Review: {review.com}
                                </Typography>
                            </Box>)}
                        </Container>
                    </div>
                    <Box className={classes.box}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>
                                {movie.title} ({movie.rating})
                            </Typography>
                            <Typography gutterBottom variant="subtitle2" component="div">
                                Year: {movie.year}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                {movie.genres}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                Writers: {movie.writers}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                Posted by: {movie.createdBy}
                            </Typography>
                        </CardContent>
                        <CardActions>

                        </CardActions>
                    </Box>
                </div>
            </Card>
        </ThemeProvider>
    );
};

export default Movie;