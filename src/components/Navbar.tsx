import { AppBar, backdropClasses, BottomNavigation, Box, Button, Container, createTheme, Fab, Icon, InputBase, OutlinedInput, TextField, Toolbar, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import {ThemeProvider} from '@mui/material/styles'
import WindowDimensions from './WindowDimensions';
import DennysLogo from '../assets/DENN.svg'
import theme from '../styles/Theme';
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
            <AppBar sx={{zIndex: 1000, backgroundColor: '#464340'}} elevation={1}>
                <Toolbar sx={{justifyContent: 'space-between'}}>
                    <Box component='img' src={DennysLogo} sx={{postiion: 'absolute', left: '10px', right: 'auto', backgroundColor: theme.palette.dennysYellow.main, height: 40, width: 40, borderRadius: 2, padding: 0.5}} onClick={()=>{navigate("/")}}/>
                    <InputBase inputMode='search' placeholder='Search' size='small' sx={{
                        backgroundColor: 'white',
                        paddingLeft: '2px',
                        borderRadius: 4,
                        pl: 1,
                        '& .MuiInputBase-input': 
                        {
                            fontSize: 14.5,
                            paddingBottom: 0,
                            paddingTop: 0,
                            height: '35px',
                            width: '200px',
                            borderRadius: 4,
                            backgroundColor: 'white', 
                            paddingLeft: '2px',
                            paddingRight: '4px',
                            alignSelf: 'right',
                            zIndex: 100,
                        }}}/>
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