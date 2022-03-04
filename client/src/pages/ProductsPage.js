import React, {useEffect, useState} from 'react';import Product from "../components/Product";import {useDispatch, useSelector} from "react-redux";import {showPage} from "../features/pages";const ProductsPage = () => {    const {movies} = useSelector(state => state.movies.value)    const [index, setIndex] = useState(null)    const disp = useDispatch()    useEffect(() => {        setIndex(localStorage.getItem('secretKey'))        disp(showPage('main'))    }, [])    return (<div className={'d-flex wrap'}>        {movies.map((movie, i) => <Product key={i} movie={movie} index={index}/>)}    </div>);};export default ProductsPage;