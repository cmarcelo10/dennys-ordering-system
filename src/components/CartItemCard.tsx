import React, { useState, useContext } from 'react';
import { Card, CardHeader, CardContent, Typography, Divider, Button, IconButton, Box, CardActions, Accordion, AccordionSummary, ButtonGroup, AccordionDetails, Fade} from '@mui/material';
import CartItem from '../types/CartItem';
import RemoveIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { useNavigate } from 'react-router-dom';
import theme from '../styles/Theme';
import ExpandIcon from '@mui/icons-material/ExpandCircleDownTwoTone';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
interface CartItemCardProps
{
    cartItem: CartItem,
    handleRemoveItem: (itemID: string) => void,
    handleChangeQuantity: (itemID: string, updatedQuantity: number) => void
}

const DebugElement = ({debugItem}:{debugItem: any})=>
{
    console.log(debugItem);
    return (<></>)
};

const ShowHideTextElement = React.memo(({isExpanded}:{isExpanded: boolean}) =>
(
    <Typography variant="body1" sx={{width: '50px', textAlign: 'center', mr: 2, fontWeight: !isExpanded ? 600 : 400}}> 
        {isExpanded ? (<>Hide</>) : (<>Show</>)}
    </Typography>
),(prev, next)=>(prev.isExpanded === next.isExpanded));

const buttonBorderRadius = 8;

const CartItemCard = ({cartItem, handleRemoveItem, handleChangeQuantity}:CartItemCardProps) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false); 
    const toggleExpanded = (_e: React.MouseEvent) => {
        setExpanded((prev)=>(!prev));
    };
    const removeItemFromCart = () => {
        
        setDialogOpen(true);
    };
    const actuallyRemoveFromCart = ()=>
    {
        handleRemoveItem(cartItem.id);
    }

    const handleIncrease = ()=>
    {
        handleChangeQuantity(cartItem.id, cartItem.quantity + 1);
    }
    const openCloseDialog=()=>
    {
        setDialogOpen((prev)=>!prev);
    }
    const handleDecrease = () =>
    {
        if(cartItem.quantity <= 1)
        {
            openCloseDialog();
        }
        else
        {
            handleChangeQuantity(cartItem.id, cartItem.quantity - 1);
        }
    }
  
    const editItem = () => [
        navigate(`/cart/edit?id=${encodeURIComponent(cartItem.id)}`)
    ];

    return (
        <React.Fragment>
            <DeleteConfirmationDialog cartItemID={cartItem.id} cartItemName={cartItem.item.name} onCancel={openCloseDialog} open={dialogOpen} onConfirm={actuallyRemoveFromCart}/>
            {/*The dialog element above really belongs higher up in the tree*/}
            <Card elevation={3} sx={{ display: 'flex', borderRadius: 2, flexDirection: 'column', padding: 0, marginBottom: 2, backgroundColor: '#F2EEEA' }}>
                <CardHeader sx={{
                    height: 'auto', 
                    backgroundColor: theme.palette.dennysYellow.main,
                    fontSize: 24,
                    '&.MuiCardHeader-root':
                    {
                        pl: 1,
                        p: 1,
                    }

                }} title={
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Typography variant="h6"
                    sx={{
                            fontSize: 24,
                            fontWeight: 600,
                    }}>{cartItem.item.name}</Typography>
                    </Box>
                }></CardHeader>
                <CardContent sx={{p: 1, pt: 1.5}}>
                <Accordion expanded={expanded} elevation={0} defaultExpanded={true} sx={{
                    boxShadow: 0,
                    backgroundColor: '#F2EEEA',
                    '&. MuiButtonBase-root':
                    {
                        minHeight: 0,
                        height: 'auto',
                        pl: 0,
                        pr: 0,
                    },
                    }}>
                <AccordionSummary sx={{
                        backgroundColor: '#F2EEEA',
                        '&.MuiButtonBase-root':
                        {
                            minHeight: 25,
                            height: 30,
                            pl: 0,
                            pr: 0,
                        },

                    }}onClick={toggleExpanded} expandIcon={<ExpandIcon fontSize='large'/>}>
                        <Box sx={{display: 'flex', flexDirection: 'row', flexGrow: 1, alignItems:'center', justifyContent: 'space-between', backgroundColor: 'inherit'}}>
                            <Typography variant="h6" sx={{backgroundColor: 'inherit'}}> 
                                Customizations:
                            </Typography>
                            <ShowHideTextElement isExpanded={expanded}/>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{backgroundColor: '#F2EEEA', p: 1}}>
                    {cartItem.item.customizations && Object.entries(cartItem.item.customizations).map(([key, category], index) => (
                        category.amountSelected > 0 ? (<React.Fragment key={index}>
                            <Typography variant="body2">{key}</Typography>
                            <DebugElement key={key + category} debugItem={key} />
                            {Object.entries(category.options).map(([key, option], index) => {
                                if(option.selected === true)
                                {
                                    return (<Typography key={key + index} sx={{ marginLeft: 2 }}>
                                            {key} (+$ {option.price.toFixed(2)})
                                        </Typography>)
                                }
                                return (<React.Fragment key={key + index}></React.Fragment>)
                            })}
                        </React.Fragment>) : (<></>)
                    ))}
                    </AccordionDetails>
                    <Typography variant="body1">Special Comments:</Typography>
                </Accordion>
                <Box sx={{display: 'flex', flexDirection: 'column', alignContent:'center', justifyContent:'space-between'}}>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', justifySelf: 'right', alignItems: 'center', pt:1}}>
                            <Typography variant='h6'>
                                Quantity:
                            </Typography>
                            <Box sx={{display: 'flex', flexDirection: 'row', justifyItems: 'space-around', alignItems: 'center', ml: 2}}>
                                <IconButton onClick={handleIncrease} disabled={cartItem.quantity >=99} size='medium'>
                                    <AddIcon fontSize='medium'/>
                                </IconButton>
                                <Typography variant='h6' sx={{minWidth: 20, textAlign: 'center', mr: 1, ml: 1}}>
                                    {cartItem.quantity}
                                </Typography>
                                <IconButton onClick={handleDecrease} disabled={cartItem.quantity <=0} sx={{pr: 0}} size="medium">
                                    <RemoveIcon fontSize='medium'/>
                                </IconButton>
                            </Box>
                        </Box>
                    <Divider variant='fullWidth'/>
                    <Box className="totalPriceDisplay" sx={{display: 'flex', flexDirection: 'row', alignContent:'center', justifyContent:'space-between', pt: 1,}}>
                        <Typography variant='h5'>
                            Total:
                        </Typography>
                        <Typography variant="h6" textAlign={'right'}>${(cartItem.quantity * cartItem.price).toFixed(2)}</Typography>
                    </Box>
                </Box>
                </CardContent>
                <CardActions sx={{display: 'flex', flexDirection: 'row', justifyContent: 'right'}}>
                    <ButtonGroup sx={{justifySelf: 'right', height: 36}}>
                        <Button variant="contained" size="medium" onClick={editItem} sx={{fontWeight: 900, backgroundColor: theme.palette.dennysYellow.main, color: theme.palette.dennysYellow.contrastText, borderBottomRightRadius: buttonBorderRadius, borderTopRightRadius: buttonBorderRadius, p:2}}>Edit</Button>
                        <Button variant="contained" size="medium" onClick={removeItemFromCart} sx={{fontWeight: 900, backgroundColor: theme.palette.dennysRed.main, borderBottomLeftRadius: buttonBorderRadius, borderTopLeftRadius: buttonBorderRadius, p:2}}>Remove</Button>
                    </ButtonGroup>
                </CardActions>
            </Card>
        </React.Fragment>
    );
};

export default CartItemCard;

// <Button variant="outlined" size="small" onClick={toggleExpanded}>{expanded ? 'Show Less' : 'Show More'}</Button>
/*
 <>
    <Fade in={isExpanded} timeout={100}>
        <Typography variant="body1" sx={{width: '50px', textAlign: 'center', mr: 2,display: !isExpanded ? 'none' : undefined}}> 
            Hide
        </Typography>
    </Fade>
    <Fade in={!isExpanded} timeout={100}>
        <Typography variant="body1" sx={{width: '50px', textAlign: 'center', mr: 2, display: isExpanded ? 'none' : undefined}}>
            Show
        </Typography>
    </Fade>
    </>
*/