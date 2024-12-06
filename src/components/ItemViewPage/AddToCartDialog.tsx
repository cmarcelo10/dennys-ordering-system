import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid2, Slide, SlideProps, Stack} from '@mui/material'
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
    props: SlideProps & 
    {
        children: React.ReactElement<unknown>
    }, 
    ref: React.Ref<unknown>){
        console.log(`Timeout: ${props.timeout}`)
        return(<Slide direction="up" ref={ref} {...props}/>)}
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
    const {cartItems, totalPrice, setCartContext} = React.useContext(CartContext);
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
        <Dialog transitionDuration={{enter: 1000, exit: 500}}open={open} TransitionComponent={SlideTransition} fullScreen>
        <DebugElement log={"dialog should be open"}/>
        <AppBar sx={{position: 'relative', backgroundColor: theme.palette.dennysBrown.main}}>
        <Toolbar sx={{justifyContent: 'space-between'}}>
            <IconButton onClick={handleClose} fontSize='large'>
                <CloseRoundedIcon fontSize='inherit'/>
            </IconButton>
            <Button sx={{color: theme.palette.dennysYellow.main, fontWeight: 1000, borderColor: theme.palette.dennysYellow.main}} variant='text' onClick={handleConfirm}>
                    Place order
            </Button>
        </Toolbar>
        </AppBar>
        <DialogTitle sx={{textAlign: 'center', fontSize: 30}}>
            Order Summary
        </DialogTitle>
        <DialogContent sx={{
            '&.MuiDialogContent-root':
            {
                minHeight: 0
            }
        }}>
            {Object.entries(cartItems).map(([key, item])=>
            {
                const foodItem = item.item;
                return (
                    <React.Fragment key={key}>
                        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
                                fontSize: 20, borderBottomColor: 'rgba(71, 67, 85, 0.4)',
                                borderBottomWidth: 1, borderBottomStyle: undefined}}>
                        <Box sx={{textWrap: 'wrap'}}>
                            <Typography variant="h6" sx={{fontSize: 'inherit', fontWeight: 500}}>
                                {item.item.name} × {item.quantity}
                            </Typography>
                        </Box>
                        <Typography sx={{pr: 0.5, fontWeight: 500}} variant="h6">
                            ${item.price}
                        </Typography>
                        </Box>
                        <Divider variant='fullWidth'/>
                        <Box key={'secondItemName'} sx={{padding: 1, pr: 0, pb: 2, pt: 1}}>
                            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
                                <Typography variant='body1'>
                                    {foodItem.name}
                                </Typography>
                                <Divider variant="middle" sx={{display: 'none', flexGrow: 100}}/>
                                <Typography fontWeight={400}>
                                    $ {foodItem.price}
                                </Typography> 
                            </Box>
                            <Divider variant='inset'/>
                            {Object.entries(foodItem.customizations).map(([itemKey, category])=>
                            {
                                return (
                                    <Stack key={itemKey}>
                                        {Object.entries(category.options).filter(([_optionName, value])=>{return value.selected;}).map(([option, data])=>(
                                            <Box key={option+itemKey} sx={{m: 0.5}}>
                                                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}>
                                                    <Typography variant='body1'>
                                                            {option}
                                                    </Typography>
                                                    <Divider variant="middle" sx={{display: 'none', flexGrow: 100}}/>
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
                        <Stack>
                                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Typography variant='h6'>
                                        Total:
                                    </Typography>
                                    <Typography sx={{pr: 0.5, fontWeight: 500}} variant='h6'>
                                    $ {(item.quantity * item.item.price).toFixed(2)}
                                    </Typography>
                                </Box>
                            </Stack>
                    </React.Fragment>
                )
            })}
            </DialogContent>
            <DialogContent sx={{flexGrow: 1}}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', flexGrow: 1}}>
                <Box sx={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', flexGrow: 1}}>
                    <Typography>
                        GST (+5.00%)
                    </Typography>
                    <Typography>
                        {(totalPrice*0.05).toFixed(2)}
                    </Typography>
                </Box>
            </Box>
        </DialogContent>
        </Dialog>
    );
}
export default CheckoutDialog


