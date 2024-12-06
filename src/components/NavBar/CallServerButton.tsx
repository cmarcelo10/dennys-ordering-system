import { Fab } from "@mui/material";
import React from "react";
import theme from "../../styles/Theme";
import PersonIcon from '@mui/icons-material/Person'

const CallServerButton = React.memo(({onClick}:{onClick: ()=>void})=>
{   
    function handleClick(_e: React.MouseEvent)
    {   
        onClick();
    }
    return (<Fab sx={{position: 'fixed', height:'auto', borderRadius: 10, bottom: '1%', left: '2%', fontWeight: 1000, fontSize: 14, zIndex: 10000, backgroundColor: theme.palette.dennysYellow.main, color: theme.palette.dennysYellow.contrastText}} 
        variant='extended' onClick={handleClick}>
            Call<br/> Server
    </Fab>)}, (prev, next)=>prev.onClick === next.onClick);

export default CallServerButton
    