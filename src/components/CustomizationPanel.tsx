import { Box, ThemeProvider, Typography } from "@mui/material";
import theme from "../styles/Theme";
import CustomizationOption from "../types/CustomizationOption";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import React from "react";

interface CustomizationPanelProps
{
    name: string,
    price: number,
    selected: boolean,
    disabled: boolean,
    onClick: (name: string)=> void, // for bubbling up the selection
}

const CustomizationPanel = React.memo(({name, price, selected, disabled, onClick}:CustomizationPanelProps)=>
{
    const handleClick = React.useCallback(function handleClick(_event: React.MouseEvent)
    {
        onClick(name);
    },[]);
    
    return (
    <ThemeProvider theme={theme}>
        <Box display='flex' alignContent='center' flexDirection='row' justifyContent = 'space-between' bgcolor={selected? theme.palette.dennysYellow.main : undefined}
            sx={{
                bgColor: selected? theme.palette.dennysYellow.main : 'inherit',
                borderBox: 'content-box', 
                fontSize: 16
            }}
            onClick={!disabled ? handleClick : undefined} width={'100%'}>
            <Box display='flex' flexDirection='row' alignItems='center' m={1}>
                {selected ? (
                    <TaskAltRoundedIcon sx={{
                        p: 1, 
                        fontSize: 30, 
                        fontWeight: 1000, 
                        color: 'black',
                        }} />
                ):(
                    <RadioButtonUncheckedIcon sx={{p: 1, fontSize: 30, fontWeight: 1000, color: disabled ? theme.palette.text.disabled : undefined}} />
                ) }
                <Typography color={disabled ? theme.palette.text.disabled : undefined} fontSize={16} alignSelf='center' pl={0.25} fontWeight={selected ? 500 : undefined}
                    
                    sx={{
                        fontWeight: selected? 500 : 'inital',
                    }}>{name}</Typography>
            </Box>
            <Typography color={disabled ? theme.palette.text.disabled : undefined} fontSize='inherit' alignSelf='center' pr={2} fontWeight={selected? 500 : undefined}>
                {price > 0 ? (<>+ ${price}</>):(<>{/* render nothing */}</>)}
            </Typography>
        </Box>
    </ThemeProvider>);
}, (prev, next)=>(next.disabled === prev.disabled && next.selected === prev.selected));
export default CustomizationPanel