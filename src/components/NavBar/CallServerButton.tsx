import { Fab } from "@mui/material";
import React from "react";
import theme from "../../styles/Theme";
import PersonIcon from '@mui/icons-material/Person'
import Draggable from "react-draggable";

const CallServerButton = React.memo(({onClick}:{onClick: ()=>void})=>
{   
    async function timeout(delay: number)
    {
        return new Promise(res => setTimeout(res, delay) );
    }
    const [dragging, isDragging] = React.useState(false);
    const [clickable, setClickable] = React.useState(false);

    function handleClick(_e: React.MouseEvent)
    {   
        
            onClick()
    }

    return (

            <Fab sx={{position: 'fixed', borderRadius: 10, height: 'auto', bottom: '1%', left: '0%', fontWeight: 1000, fontSize: 14, zIndex: 1001, 
                    backgroundColor: theme.palette.dennysYellow.main, 
                    color: theme.palette.dennysYellow.contrastText,
                    '&.MuiButtonBase-root':
                    {
                        backgroundColor: theme.palette.dennysYellow.main,
                        color: theme.palette.dennysYellow.contrastText,
                    },
                    '&:hover':
                    {
                        color: theme.palette.dennysRed.contrastText,
                        backgroundColor: theme.palette.dennysRed.main,
                    }
                    }} 
                variant='extended' onClick={handleClick}>
                    Call 
                    <br/> Server
            </Fab>
        )}, (prev, next)=>prev.onClick === next.onClick);

export default CallServerButton
    