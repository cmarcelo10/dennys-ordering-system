import { AppBar, backdropClasses, BottomNavigation, Box, Button, Container, createTheme, Fab, Icon, IconButton, InputBase, OutlinedInput, Paper, TextField, Toolbar, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import {ThemeProvider} from '@mui/material/styles'
import WindowDimensions from './WindowDimensions';
import DennysLogo from '../assets/DENN.svg'
import theme from '../styles/Theme';
import ItemSearch from './ItemSearch';
import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import { useNavigate } from 'react-router-dom';
import { Call } from '@mui/icons-material';

interface NavBarProps
{
    bottomLabel: string,
    bottomPaperText?: string,
    children?: React.ReactNode,
    disableButton?: boolean,
    hideCallServerButton?: boolean
    onClick?: ()=>void;
}

const Logo = React.memo(()=>
(
    <Box component='img' src={DennysLogo} sx={{postiion: 'absolute', left: '10px', right: 'auto', backgroundColor: theme.palette.dennysYellow.main, height: 40, width: 40, borderRadius: 2, padding: 0.5}}/>
)); // never reload the image.

const CallServerButton = ()=>
(<Fab sx={{position: 'fixed',height:'auto', borderRadius: 10, bottom: '5%', left: '3%', fontWeight: 1000, fontSize: 20, backgroundColor: theme.palette.dennysRed.main, color: theme.palette.dennysRed.contrastText}} variant='extended'>
     Call<br/>Server
</Fab>);
const NavBar = ({bottomLabel, onClick, disableButton, children, hideCallServerButton}: NavBarProps) => {
    const navigate = useNavigate();
    function handleClick(_event: React.MouseEvent)
    {
        if(onClick)
        {
            onClick();
        }
        else
        {
            navigate('/cart');
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <AppBar sx={{zIndex: 1000, backgroundColor: '#464340'}} elevation={1} position='fixed'>
                <Toolbar sx={{justifyContent: 'space-between'}}>
                    <Logo />
                    <Box display='flex' flexDirection={'row'} alignItems={'center'}>
                        <ItemSearch />
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar/> {/*These empty toolbars are used for spacing*/}
                {children}
            <Toolbar/>
            {!hideCallServerButton && (<CallServerButton/>)}
            <AppBar sx={{zIndex: 1000, backgroundColor: '#464340', alignContent: 'center', justifyContent:'center', position: 'fixed', bottom: 0, top: 'auto'}} elevation={0}>
                    <Toolbar sx={{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                      
                        
                        <Button variant='contained' disabled={disableButton} onClick={handleClick} 
                        sx={{backgroundColor: theme.palette.dennysRed.main, 
                            color: theme.palette.dennysRed.contrastText, 
                            minWidth: '50%', 
                            height: '40px', 
                            fontSize: 20, 
                            textTransform: 'none',
                            '&:disabled':
                            {
                                color: '#cccccc',
                            }
                            }}><Typography fontWeight={!disableButton ? 1000 : 500}>{bottomLabel}</Typography></Button>
                    </Toolbar>
            </AppBar>
        </ThemeProvider>
        );
}
export default NavBar

/*
  <IconButton
sx={{border: '1px solid white', color: 'white', borderRadius: 0, display: 'flex', flexDirection: 'column', justifySelf: 'left', marginRight: 10}}>
    <PersonIcon/>
        <Typography fontSize={10}>Call Server</Typography>
</IconButton>
*/
// <Paper elevation={2} sx={{backgroundColor: 'white', height: 120, width: 200, borderBox: 'content-box', borderTopRadius: 5, position: 'fixed', bottom: 2, left: '70%', transform: "translateX(-50%)"}}>
// <Typography>Hello World</Typography>
// </Paper>
//
// {!hideCallServerButton && (<CallServerButton/>)}