import { AppBar, BottomNavigation, Box, Button, createTheme, Toolbar } from '@mui/material'
import React, {useState, useEffect} from 'react'
import {ThemeProvider} from '@mui/material/styles'
import WindowDimensions from './WindowDimensions';
interface NavBarProps
{
    bottomLabel: string,
    children?: React.ReactNode
}
const theme = createTheme(
    {
        
    }
);
const NavBar = ({bottomLabel, children}: NavBarProps) => {
    const {height, width} = WindowDimensions();
    return (
        <ThemeProvider theme={theme}>
            <AppBar sx={{backgroundColor: '#464340', alignContent: 'center', justifyContent:'center'}} elevation={1}>
                <Toolbar sx={{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                </Toolbar>
            </AppBar>
            <Toolbar/>
            {children}
            <Toolbar/>
            <AppBar sx={{backgroundColor: '#464340', alignContent: 'center', justifyContent:'center', position: 'fixed', bottom: 0, top: 'auto'}} elevation={0}>
                    <Toolbar sx={{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                        <Button variant='contained' sx={{backgroundColor: theme.palette.secondary.main}}> {bottomLabel}</Button>
                    </Toolbar>
            </AppBar>
        </ThemeProvider>
            );
}
export default NavBar