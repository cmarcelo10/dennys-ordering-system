import React from "react"
import {Snackbar,SnackbarContent, Typography } from "@mui/material"

interface TopSnackbarProps
{
    open: boolean,
    onClose: ()=>void,
    message: string,
    timeout: number,
}

const TopSnackbar: React.FC<TopSnackbarProps> = ({...props}:TopSnackbarProps)=>
(
    <Snackbar open={props.open} onClose={props.onClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}} autoHideDuration={props.timeout} message={
    <Typography fontSize={16}>
        {props.message}
    </Typography>}
    sx={{
        '&.MuiSnackbar-anchorOriginTopCenter':
        {
            transform: 'translateY(80%)'
        }
    }}/>
);
export default TopSnackbar