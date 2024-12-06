import React from "react";
import {Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid2, Slide, SlideProps, Stack} from '@mui/material'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import styled from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import IconButton from '@mui/material/IconButton';
import {ArrowBackIosRounded} from '@mui/icons-material'
import { PercentSharp } from "@mui/icons-material";
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
    const cartLength = React.useRef(Object.keys(cartItems).length);
    const [enabled, setEnabled] = React.useState(false);
    function handleConfirm()
    {
        setCartContext({}, 0); // clear the cart.
        onConfirm();
    }
    function handleClose ()
    {
        onClose();
        setEnabled(false);
    }
    function changeCheckoutState()
    {
        console.log(Object.values(cartItems).length);
        console.log(enabled);
        if(!open) setEnabled(false);
        else setEnabled(true);
    }
    React.useEffect(()=>
    {
        if(open)
        {
            console.log(cartItems.length)
        }
    },[open])
    return(
        <Dialog onTransitionEnd={changeCheckoutState} transitionDuration={{enter: 750, exit: 500}}open={open} TransitionComponent={SlideTransition} fullScreen>
        <DebugElement log={"dialog should be open"}/>
        <AppBar sx={{position: 'relative', backgroundColor: theme.palette.dennysBrown.main}}>
        <Toolbar sx={{justifyContent: 'flex-begin'}}>
           <Button sx={{color: theme.palette.dennysYellow.main, borderColor: theme.palette.dennysYellow.main, fontSize: 16, fontWeight: 500}} onClick={handleClose}>
                Back
           </Button>
        </Toolbar>
        </AppBar>
        <DialogTitle sx={{textAlign: 'center', fontSize: 30}}>
            Order Summary
        </DialogTitle>
        <DialogContent sx={{
            '&.MuiDialogContent-root':
            {
                minHeight: 0,
                maxHeight: 530,
            },
        }} dividers>
            {
                Object.entries(cartItems).map(([key, item], index)=>
            {
                const foodItem = item.item;
                return (
                    <Box key={key} sx={{mb: 1}}>
                        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
                                fontSize: 18, borderBottomColor: 'rgba(71, 67, 85, 0.4)',
                                borderBottomWidth: 1, borderBottomStyle: undefined}}>
                        <Box sx={{textWrap: 'wrap'}}>
                            <Typography variant="h6" sx={{fontSize: 'inherit', fontWeight: 500}}>
                                {item.item.name}{' '}{item.quantity > 0 && (<>x {item.quantity}</>)}
                            </Typography>
                        </Box>
                        
                        <Typography sx={{pr: 0.5, fontWeight: 500, fontSize: 18}} variant="h6">
                            ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                        </Box>
                        <Divider variant='fullWidth'/>
                         <Box sx={{padding: 1, pr: 0, pb: 2, pt: 1}}>
                            <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', m: 0.5}}>
                                <Typography variant='body1'>
                                    {item.item.name}{}{/* This double listing is intentional */}
                                </Typography>
                                <Typography fontWeight={400}>
                                    ${' '}{item.item.price}
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
                                                        {data.price > 0 ? (<>+ ${' '}{data.price}</>):('(free)')}
                                                    </Typography> 
                                                </Box>
                                                <Divider variant='inset'/>
                                            </Box>

                                        ))}
                                    </Stack>)
                            })}
                        </Box>
                        {index < cartLength.current && <Divider variant="middle"/>}
                    </Box>
                )
            })}
            </DialogContent>
            <DialogContent sx={{
                borderTopWidth: '1px', 
                borderTopColor: theme.palette.dennysGrey.light, 
                borderTopStyle: 'solid',
                '&.MuiPaper-root':
                {
                    height: 'auto',
                },
                '&.MuiDialogContent-root':
                {
                    resize: 'both',
                    pb: 0,
                    minHeight: 0,
                }}}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}}>
                <Box sx={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', flexGrow: 1}}>
                    <Typography variant="h6">
                        GST {'(+5.00%)'}
                    </Typography>
                    <Typography variant='h6'>
                       + $ {(totalPrice*0.05).toFixed(2)}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', flexGrow: 1, mt: 1}}>
                    <Typography variant='h6'>
                       Total:
                    </Typography>
                    <Typography variant='h6'>
                        ${' '}{(totalPrice*1.05).toFixed(2)}
                    </Typography>
                </Box>         
            </Box>
            <Divider variant='fullWidth'/>
            <Button onClick={handleConfirm} variant="contained" sx={{mt: 3, fontWeight: 700, fontSize: 20, backgroundColor: theme.palette.dennysRed.main, color: theme.palette.dennysRed.contrastText}}fullWidth disabled={!enabled || (cartLength.current == 0)}>
                    {enabled ? 'Place Order' : <CircularProgress sx={{color: 'white'}}/>}
                </Button>
            </DialogContent>
        </Dialog>
    );
}
export default CheckoutDialog