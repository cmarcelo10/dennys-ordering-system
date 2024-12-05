import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import theme from "../styles/Theme";
import NavBar from "./NavBar/Navbar";

const ErrorPage = ()=>
{
    const navigate = useNavigate();
    const goHome = () =>
    {
        navigate('/');
    }
    return(
    <NavBar bottomLabel={'Add to Cart'}>
        <Box>
            <Typography variant='h2' color={theme.palette.primary.main}>
                This page hasn't been implemented.
            </Typography>
            <Button onClick={goHome}>Go To Main Menu</Button>
        </Box>
    </NavBar>
    )
}
export default ErrorPage