import BugReport from "@mui/icons-material/BugReport";
import React from "react";
import Fab from "@mui/material/Fab";
import Draggable from "react-draggable";

export default function DebugFab({show, onClick}:{onClick: ()=>void, show?: boolean})
{
    return (

        (show === true) && (
            <Fab size='large' sx={
                {
                    position: 'fixed', 
                    bottom: '5%', 
                    left: '60%', 
                    right: '50%'
                }
            } 
            onClick={onClick} variant='extended' title='Debug'>
            <BugReport/>
            </Fab>
        )

    )
}