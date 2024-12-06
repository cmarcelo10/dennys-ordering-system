import { Snackbar, SnackbarContent, SnackbarProps } from "@mui/material";
import React from "react";
import theme from "../styles/Theme";

interface TopSnackbarEnhancedProps
{
    open: boolean,
    timeout: number,
    message?: React.ReactNode,
    action?: React.ReactNode,
    backgroundColor?: string,
    color?: string,
    onClose: ()=>void,
}
const TopSnackbarEnhanced = React.memo(function({...props}:TopSnackbarEnhancedProps & SnackbarProps)
{
    return(
        <Snackbar autoHideDuration={props.timeout} open={props.open} anchorOrigin={{vertical: 'top', horizontal: 'center'}}  sx={{
                '& .MuiPaper-root':
                {
                    backgroundColor: props.backgroundColor,
                    color: props.color,
                },
                transform: "translateY(100%)"}} onClose={(props.onClose)}>
                    <SnackbarContent message={props.message} action={props.action}/>
                    </Snackbar>
    )
},(prev, next)=>(prev.open == next.open && prev.timeout == next.timeout));

export default TopSnackbarEnhanced