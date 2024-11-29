import React from 'react';
import { Card, CardContent, Typography, Divider, Button, Grid } from '@mui/material';

const CartItemCard = ({ item, quantity }) => {
  return (
    <Card elevation={3} sx={{ display: 'flex', flexDirection: 'column', padding: 2, marginBottom: 2 }}>
      <Grid container justifyContent="space-between">
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="h6">{quantity} x ${item.price.toFixed(2)}</Typography>
      </Grid>
      <Divider variant="middle" sx={{ marginY: 1 }} />
      <Typography variant="body1">Customizations:</Typography>
      {item.customizations && item.customizations.map((category, index) => (
        <div key={index}>
          <Typography variant="body2">{category.label}:</Typography>
          {category.customizations.map((option, idx) => (
            <Typography key={idx} variant="body2" sx={{ marginLeft: 2 }}>
              - {option.name} (+${option.price.toFixed(2)})
            </Typography>
          ))}
        </div>
      ))}
      <Divider variant="middle" sx={{ marginY: 1 }} />
      <Typography variant="body1">Special Comments:</Typography>
      <Divider variant="middle" sx={{ marginY: 1 }} />
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="body1">Quantity: - {quantity} +</Typography>
        <div>
          <Button variant="outlined" size="small" sx={{ marginRight: 1 }}>Remove</Button>
          <Button variant="outlined" size="small" sx={{ marginRight: 1 }}>Edit</Button>
          <Button variant="outlined" size="small">Show Less/More</Button>
        </div>
      </Grid>
    </Card>
  );
};

export default CartItemCard;