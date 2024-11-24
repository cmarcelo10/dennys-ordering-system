import { AppBar, backdropClasses, BottomNavigation, Box, Button, createTheme, Icon, Toolbar, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import {ThemeProvider} from '@mui/material/styles'
import WindowDimensions from './WindowDimensions';
import DennysLogo from '../assets/DENN.svg'
import theme from '../styles/Theme';
interface NavBarProps
{
    bottomLabel: string,
    children?: React.ReactNode
}

const NavBar = ({bottomLabel, children}: NavBarProps) => {
    return (
        <ThemeProvider theme={theme}>
            <AppBar sx={{backgroundColor: '#464340', alignContent: 'center', justifyContent:'center'}} elevation={1}>
                <Toolbar sx={{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'left'}}>
                <Icon component='img' src={DennysLogo} sx={{backgroundColor: theme.palette.dennysYellow.main, height: 40, width: 40, borderRadius: 2, padding: 0.5, alignSelf: 'left'}}/>
                </Toolbar>
            </AppBar>
            <Toolbar/>
            {children}
            <Toolbar/>
            <AppBar sx={{backgroundColor: '#464340', alignContent: 'center', justifyContent:'center', position: 'fixed', bottom: 0, top: 'auto'}} elevation={0}>
                    <Toolbar sx={{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                        <Button variant='contained' sx={{backgroundColor: theme.palette.dennysRed.main, color: theme.palette.dennysRed.contrastText, width: '50%', height: '40px', fontSize: 20}}><Typography fontWeight={1000}>{bottomLabel}</Typography></Button>
                    </Toolbar>
            </AppBar>
        </ThemeProvider>
        );
}
export default NavBar