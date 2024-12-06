import React, { useState, useContext } from 'react';
import { Card, CardHeader, CardContent, Typography, Divider, Button, IconButton, Box, CardActions, Accordion, AccordionSummary, ButtonGroup, AccordionDetails, Fade, TextareaAutosize, TextField, Input} from '@mui/material';
import CartItem from '../../types/CartItem';
import RemoveIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { useNavigate } from 'react-router-dom';
import theme from '../../styles/Theme';
import ExpandIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import CustomizationsAccordion from './CustomizationsAccordion';
import { CartContext, CartProvider } from '../../contexts/CartContext';
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
    <Typography variant="body1" sx={{width: '50px', textAlign: 'center', mr: 2, fontWeight: !isExpanded ? 600 : 400, color:theme.palette.primary.main}}> 
        {isExpanded ? (<>Hide</>) : (<>Show</>)}
    </Typography>
),(prev, next)=>(prev.isExpanded === next.isExpanded));


const buttonBorderRadius = 8;

const CartItemCard = ({cartItem, handleRemoveItem, handleChangeQuantity}:CartItemCardProps) => {
    const {cartItems, saveToCart, saveComments} = React.useContext(CartContext);
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(true);
    const [commentsExpanded, setCommentsExpanded] =  useState(true);
    const [dialogOpen, setDialogOpen] = useState(false); 
    const isEditingRef = React.useRef(false);
    const [editing, setEditing] = React.useState(false);
    const formText = React.useRef(''); // useRef because we don't want this rerendering every time something changes
    const [savedText, setSavedText] = React.useState(cartItem.comments);

    function logInput(_e: React.ChangeEvent<HTMLTextAreaElement>)
    {
        formText.current = _e.target.value;
    }
    const onBlur = () =>
    {
        console.log(cartItem.comments);
        cartItem.comments = formText.current;
        saveComments(cartItem);
        setSavedText(cartItem.comments);
    }

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
                    <Divider variant='middle' sx={{flexGrow: 1000}}/>
                         <Typography variant="h6"
                    sx={{
                            fontSize: 24,
                            fontWeight: 600,
                    }}>${(cartItem.price*cartItem.quantity).toFixed(2)}</Typography>
                    </Box>
                }></CardHeader>
                <CardContent sx={{p: 1, pt: 0}}>
                <Box sx={{display: 'flex', flexDirection: 'column', alignContent:'center', justifyContent:'space-between'}}>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', justifySelf: 'right', alignItems: 'center', pt:1, pb: 1, flexGrow: 0}}>
                            <Typography variant='h6'>
                                Quantity:
                            </Typography>
                            <Box sx={{display: 'flex', flexDirection: 'row', justifyItems: 'space-around', alignItems: 'center', ml: 2, flexGrow: 0}}>
                                <IconButton onClick={handleDecrease} disabled={cartItem.quantity <=1} sx={{pr: 1}} size="medium">
                                    <RemoveIcon fontSize='inherit'/>
                                </IconButton>
                                <Typography variant='h6' sx={{minWidth: 30, textAlign: 'center', mr: 1, ml: 1}}>
                                    {cartItem.quantity}
                                </Typography>
                                <IconButton onClick={handleIncrease} disabled={cartItem.quantity >=99} sx={{pr: 0}} size='medium'>
                                    <AddIcon fontSize='inherit'/>
                                </IconButton>     
                            </Box>
                        </Box>
                </Box>
                <CustomizationsAccordion customizations={cartItem.item.customizations}/>
                <Accordion key={'comments'} expanded={expanded} elevation={0} defaultExpanded={true}>
                <AccordionSummary sx={{
                        backgroundColor: theme.palette.beige.main,
                        '&.MuiButtonBase-root':
                        {
                            minHeight:'50px',
                            height: '50px',
                            pl: 0,
                            pr: 0,
                            pt:1,
                        },

                    }}onClick={toggleExpanded} expandIcon={<ExpandIcon fontSize='medium'/>}>
                        <Box sx={{display: 'flex', flexDirection: 'row', flexGrow: 1, alignItems:'center', justifyContent: 'space-between', backgroundColor: 'inherit'}}>
                            <Typography variant="h6" sx={{backgroundColor: 'inherit', fontSize: 18}}> 
                                Special Comments:   
                            </Typography>
                            <ShowHideTextElement isExpanded={expanded}/>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{backgroundColor: '#F2EEEA', p: 1}}>
                <TextField defaultValue={savedText} sx={{
                    width: '100%', 
                    backgroundColor: 'white',
                    '& .MuiInputBase-root':
                    {
                        p: 0.75,
                        fontSize: 16,
                    }}} multiline minRows={5} maxRows={5} placeholder='Add special comments here' onChange={logInput} onBlur={onBlur}/>

                    </AccordionDetails>
                </Accordion>
                </CardContent>
                <CardActions sx={{display: 'flex', flexDirection: 'row', justifyContent: 'right'}}>
                    <ButtonGroup sx={{justifySelf: 'right', height: 36}}>
                        <Button variant="contained" size="medium" onClick={editItem} sx={{fontWeight: 900, backgroundColor: theme.palette.dennysGrey.main, color: theme.palette.dennysGrey.contrastText, borderBottomRightRadius: buttonBorderRadius, borderTopRightRadius: buttonBorderRadius, p:2}}>Edit</Button>
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