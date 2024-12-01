import { AppBar, backdropClasses, BottomNavigation, Box, Button, Container, createTheme, Fab, Icon, InputBase, OutlinedInput, TextField, Toolbar, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import {ThemeProvider} from '@mui/material/styles'
import WindowDimensions from './WindowDimensions';
import DennysLogo from '../assets/DENN.svg'
import theme from '../styles/Theme';
import ItemSearch from './ItemSearch';
import PersonIcon from '@mui/icons-material/Person'
import { useNavigate } from 'react-router-dom';
interface NavBarProps
{
    bottomLabel: string,
    children?: React.ReactNode
}

const NavBar = ({bottomLabel, children}: NavBarProps) => {
    const navigate = useNavigate();
    return (
        <ThemeProvider theme={theme}>
            <AppBar sx={{zIndex: 1000, backgroundColor: '#464340'}} elevation={1} position='fixed'>
                <Toolbar sx={{justifyContent: 'space-between'}}>
                    <Box component='img' src={DennysLogo} sx={{postiion: 'absolute', left: '10px', right: 'auto', backgroundColor: theme.palette.dennysYellow.main, height: 40, width: 40, borderRadius: 2, padding: 0.5}}/>
                    <ItemSearch />
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
                        <Button variant='contained' sx={{backgroundColor: theme.palette.dennysRed.main, color: theme.palette.dennysRed.contrastText, width: '50%', height: '40px', fontSize: 20, textTransform: 'none'}}><Typography fontWeight={1000}>{bottomLabel}</Typography></Button>
                    </Toolbar>
            </AppBar>
        </ThemeProvider>
        );
}
export default NavBar