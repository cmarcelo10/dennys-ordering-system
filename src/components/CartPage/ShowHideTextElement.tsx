import { Typography } from "@mui/material";
import React from "react";
import theme from "../../styles/Theme";

const ShowHideTextElement = React.memo(({isExpanded}:{isExpanded: boolean}) =>
    (
        <Typography variant="body1" sx={{width: '50px', textAlign: 'center', mr: 2, fontWeight: !isExpanded ? 600 : 400, color:theme.palette.primary.main}}> 
            {isExpanded ? (<>Hide</>) : (<>View...</>)}
        </Typography>
),(prev, next)=>(prev.isExpanded === next.isExpanded));
export default ShowHideTextElement