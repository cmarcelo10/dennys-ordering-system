import { AppBar, backdropClasses, BottomNavigation, Box, Button, Container, createTheme, Fab, Icon, IconButton, InputBase, OutlinedInput, TextField, Toolbar, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import {ThemeProvider} from '@mui/material/styles'
import WindowDimensions from './WindowDimensions';
import DennysLogo from '../assets/DENN.svg'
import theme from '../styles/Theme';
import ItemSearch from './ItemSearch';
import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import { useNavigate } from 'react-router-dom';

interface NavBarProps
{
    bottomLabel: string,
    children?: React.ReactNode,
    disableButton?: boolean,
    onClick?: ()=>void;
}

const NavBar = ({bottomLabel, onClick, disableButton, children}: NavBarProps) => {
    const navigate = useNavigate();
    function handleClick(_event: React.MouseEvent)
    {
        if(onClick)
        {
            onClick();
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <AppBar sx={{zIndex: 1000, backgroundColor: '#464340'}} elevation={1} position='fixed'>
                <Toolbar sx={{justifyContent: 'space-between'}}>
                    <Box component='img' src={DennysLogo} sx={{postiion: 'absolute', left: '10px', right: 'auto', backgroundColor: theme.palette.dennysYellow.main, height: 40, width: 40, borderRadius: 2, padding: 0.5}}/>
                    <Box display='flex' flexDirection={'row'} alignItems={'center'}>
                        <ItemSearch />
                        <IconButton>
                            <ShoppingCartTwoToneIcon htmlColor='white'/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar/>
                {children}
                <Fab sx={{position: 'fixed', bottom: '7%', left: '5%', backgroundColor: theme.palette.primary.main}} color='primary' variant='extended'>
                       <Typography p={1} fontWeight={500}> Call <br /> Server</Typography>
                </Fab>
            <Toolbar/>
            <AppBar sx={{zIndex: 1000, backgroundColor: '#464340', alignContent: 'center', justifyContent:'center', position: 'fixed', bottom: 0, top: 'auto'}} elevation={0}>
                    <Toolbar sx={{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                        <Button variant='contained' disabled={disableButton} onClick={onClick ? handleClick : undefined} sx={{backgroundColor: theme.palette.dennysRed.main, color: theme.palette.dennysRed.contrastText, width: '50%', height: '40px', fontSize: 20, textTransform: 'none'}}><Typography fontWeight={1000}>{bottomLabel}</Typography></Button>
                    </Toolbar>
            </AppBar>
        </ThemeProvider>
        );
}
export default NavBar