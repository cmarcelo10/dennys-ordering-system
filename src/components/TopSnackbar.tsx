import React from "react"
import {Button, Snackbar,SnackbarContent, ThemeProvider, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom";
import theme from "../styles/Theme";
interface TopSnackbarProps
{
    open: boolean,
    onClose: ()=>void,
    message: string,
    timeout: number,
}

const TopSnackbar: React.FC<TopSnackbarProps> = ({...props}:TopSnackbarProps)=>{
    const navigate = useNavigate();
    function goToCart()
    {
        navigate('/cart');
    }
    return(
        <Snackbar open={props.open} onClose={props.onClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}} autoHideDuration={props.timeout} message={
        <Typography fontSize={16}>
            {props.message}
        </Typography>}
        sx={{
            '&.MuiSnackbar-anchorOriginTopCenter':
            {
                transform: 'translateY(80%)'
            }
        }} action={<Button sx={{color: theme.palette.dennysYellow.light}} onClick={goToCart}>View</Button>}>
        </Snackbar>
    )};
export default TopSnackbar