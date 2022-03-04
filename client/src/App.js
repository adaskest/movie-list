import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import ProductsPage from "./pages/ProductsPage";
import CreatePage from "./pages/CreatePage";
import MoviePage from "./pages/MoviePage";
import {ThemeProvider} from "@mui/styles";
import {createTheme} from "@mui/material/styles";

const theme = createTheme();

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Header/>
                <Routes>
                    <Route path={'/'} element={<ProductsPage/>}/>
                    <Route path={'/register'} element={<RegisterPage/>}/>
                    <Route path={'/login'} element={<LoginPage/>}/>
                    <Route path={'/create'} element={<CreatePage/>}/>
                    <Route path={'/movie/:id'} element={<MoviePage/>}/>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
