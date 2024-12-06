import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid2, Slide, Stack} from '@mui/material'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import styled from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from '@mui/icons-material/CloseRounded';
import { CartContext } from "../../contexts/CartContext";
import theme from "../../styles/Theme";
// source: https://mui.com/material-ui/react-dialog/ -> full screen dialogs
const SlideTransition  = React.forwardRef(function Transition(
    props: TransitionProps & 
    {
        children: React.ReactElement<unknown>
    }, 
    ref: React.Ref<unknown>){return(<Slide direction="up" ref={ref} {...props}/>)}
);

function DebugElement({log}:{log: any})
{
    console.log(log);
    return(<></>)
}

interface CheckoutDialogProps
{
    open: boolean,
    onClose: (...args: any)=>void,
    onConfirm: () => void,
}

const CheckoutDialog = ({open, onClose, onConfirm}:CheckoutDialogProps)=>
{
    const {cartItems, setCartContext} = React.useContext(CartContext);
    function handleConfirm()
    {
        setCartContext({}, 0); // clear the cart.
        onConfirm();
    }
    function handleClose ()
    {
        onClose();
    }
    React.useEffect(()=>
    {
        if(open)
        {

        }
    },[open])
    return(
        <Dialog open={open} TransitionComponent={SlideTransition} fullScreen>
        <DebugElement log={"dialog should be open"}/>
        <AppBar sx={{position: 'relative', backgroundColor: theme.palette.dennysBrown.main}}>
        <Toolbar sx={{justifyContent: 'space-between'}}>
            <IconButton onClick={handleClose} fontSize='large'>
                <CloseRoundedIcon fontSize='inherit'/>
            </IconButton>
            <Button sx={{color: theme.palette.dennysYellow.main}} variant='text' onClick={handleConfirm}>
                    Place order
            </Button>
        </Toolbar>
        </AppBar>
        <DialogTitle sx={{textAlign: 'center', fontSize: 30}}>
            Order Summary
        </DialogTitle>
        <Divider variant='middle'/>
        
        <DialogContent>
            {Object.entries(cartItems).map(([key, item])=>
            {
                const foodItem = item.item;
                return (
                    <React.Fragment key={key}>
                        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
                                fontSize: 20, borderBottomColor: 'rgba(71, 67, 85, 0.6)',
                                borderBottomWidth: 1, borderBottomStyle: 'solid'}}>
                        <Typography variant="h6" sx={{fontSize: 'inherit', fontWeight: 500}}>
                            {item.item.name} 
                        </Typography>
                        <Typography sx={{pr: 0.5, fontWeight: 500}}>
                            {item.quantity} × {item.price}
                        </Typography>
                        </Box>
                        <Box sx={{padding: 1, pr: 0, pb: 2}}>
                            {Object.entries(foodItem.customizations).map(([itemKey, category])=>
                            {
                                return (
                                    <Stack key={itemKey}>
                                        {Object.entries(category.options).filter(([optionName, value])=>{
                                            console.log(`${optionName} is selected: ${value.selected}`)
                                            return value.selected;
                                        }).map(([option, data])=>(
                                            <Box sx={{m: 0.5}}>
                                            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
                                            <Typography variant='body1'>
                                                    {option}
                                                </Typography>
                                                <Typography fontWeight={400}>
                                                    {data.price > 0 && (<>+ ${' '}{data.price}</>)}
                                                </Typography> 
                                            </Box>
                                            <Divider variant='inset'/>
                                            </Box>
                                        ))}
                                    </Stack>)
                            })}
                        </Box>
                    </React.Fragment>
                )
            })}
        </DialogContent>
        </Dialog>
    );
}
export default CheckoutDialog