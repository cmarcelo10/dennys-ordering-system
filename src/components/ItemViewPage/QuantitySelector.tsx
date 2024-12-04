import { Box, Typography, IconButton } from "@mui/material";
import React from "react";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
interface QuantitySelectorProps
{
    initial?: number,
    position?: string
    min: number,
    max: number,
    onChange: (newQuantity: number)=>void
}

const QuantitySelector = React.memo(({initial, min, max, onChange}:QuantitySelectorProps)=>
{
    const [quantity, setQuantity] = React.useState(initial ? initial : 1);
    const [disabled, setDisabled] = React.useState(false);
    function handleIncrease()
    {
        onChange(quantity + 1);
        setQuantity((prev)=>prev+1);
    }
    function handleDecrease()
    {
        onChange(quantity - 1);
        setQuantity((prev)=>prev-1);
    }
    return(
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'right'}}>
            <Typography> Quantity: </Typography>
            <IconButton size='large' disabled={quantity <= min} onClick={handleDecrease}>
                <RemoveCircleOutlineOutlinedIcon fontSize='large'/>
            </IconButton>
            <Typography sx={{fontSize: 20, ml: 3, mr: 3, fontWeight: 500}}>{quantity}</Typography>
            <IconButton size='large' disabled={quantity >= max} onClick={handleIncrease}>
                    <AddCircleOutlineOutlinedIcon fontSize='large'/>
            </IconButton>
        </Box>
    )
});
export default QuantitySelector