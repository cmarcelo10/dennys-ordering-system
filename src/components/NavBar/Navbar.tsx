import { AppBar, backdropClasses, BottomNavigation, Box, Button, Collapse, Container, createTheme, Dialog, DialogActions, Fab, Fade, Icon, IconButton, InputBase, OutlinedInput, Paper, Slide, TextField, Toolbar, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import {ThemeProvider} from '@mui/material/styles'
import WindowDimensions from '../WindowDimensions';
import DennysLogo from '../../assets/DENN.svg'
import theme from '../../styles/Theme';
import ItemSearch from '../ItemSearch';
import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import { useNavigate } from 'react-router-dom';
import CallServerButton from './CallServerButton';
import CallServerDialog from './CallServerDialog';
import TopSnackbarEnhanced from '../TopSnackbarEnhanced';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import DebugFab from '../DebugFab';
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

const NavBar = ({bottomLabel, onClick, disableButton, children, hideCallServerButton}: NavBarProps) => {
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    function handleCallServer()
    {
        setDialogOpen(true);
    }
    function onCancel()
    {
        setDialogOpen(false);
    }
    function closeSnackbar()
    {
        setSnackbarOpen(false);
    }
    function onConfirm()
    {
        // snackbar
        setDialogOpen(false);
        setSnackbarOpen(true);
    }
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
            <TopSnackbarEnhanced open={snackbarOpen} onClose={closeSnackbar} timeout={2500} message={<Typography sx={{fontSize: 16, fontWeight: 450}}>A server will be with you shortly.</Typography>}
            color={theme.palette.info.contrastText}
            backgroundColor={theme.palette.info.main}
            action={<AccessTimeRoundedIcon fontSize='large'/>}/>
            <CallServerDialog open={dialogOpen} onCancel={onCancel} onConfirm={onConfirm}/>
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
            {!hideCallServerButton && (<CallServerButton onClick={handleCallServer}/>)}
            <AppBar sx={{zIndex: 1000, backgroundColor: '#464340', alignContent: 'center', justifyContent:'center', position: 'fixed', bottom: 0, top: 'auto'}} elevation={0}>
                    <Toolbar sx={{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center', pb: 0.5, pt: 0.5}}>
                        <Button variant='contained' disabled={disableButton} onClick={handleClick} 
                        sx={{backgroundColor: theme.palette.dennysRed.main, 
                            color: theme.palette.dennysRed.contrastText, 
                            minWidth: '40%', 
                            height: '45px', 
                            fontSize: 20, 
                            postion: 'fixed',
                            textTransform: 'none',
                            '&:disabled':
                            {
                                color: '#cccccc',
                            }
                            }}><Typography fontWeight={!disableButton ? 1000 : 500}>{bottomLabel}</Typography></Button>
                    </Toolbar>
            </AppBar>
            <DebugFab onClick={onConfirm} show={false} />
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