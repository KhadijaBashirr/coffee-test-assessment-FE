import React from 'react';
import { Container, Typography, Button, Grid, Paper, IconButton, List, ListItem, ListItemText } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PaymentPage = ({ orderData, onBack }) => {
  if (!orderData || !orderData.order) {
    return <Typography color="error">No order data available</Typography>;
  }

  const order = orderData.order;

  const subtotal = order.order_items.reduce((sum, item) => 
    sum + parseFloat(item.item.price) * item.quantity, 0
  );
  const tax = parseFloat(order.total) - subtotal;

  return (
    <Container maxWidth="md">
      <IconButton onClick={onBack} sx={{ mt: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" component="h1" gutterBottom>
        Final Payment
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
        <Typography variant="subtitle1">Order ID: {order.id}</Typography>
        <Typography variant="subtitle1">Status: {order.status}</Typography>
        <Typography variant="subtitle1">Date: {new Date(order.created_at).toLocaleDateString()}</Typography>
        
        <List>
          {order.order_items.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={item.item.name}
                secondary={`Quantity: ${item.quantity}`}
              />
              <Typography>
                Price: ${parseFloat(item.item.price).toFixed(2)}
              </Typography>
              <Typography>
                Subtotal: ${(parseFloat(item.item.price) * item.quantity).toFixed(2)}
              </Typography>
              {item.discount && (
                <Typography>
                  Discount: ${parseFloat(item.discount).toFixed(2)}
                </Typography>
              )}
            </ListItem>
          ))}
        </List>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Typography variant="h6">Subtotal:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" align="right">${subtotal.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">Tax:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" align="right">${tax.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={12}>
            <hr />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5">Total:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5" align="right">${parseFloat(order.total).toFixed(2)}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
        Confirm Payment
      </Button>
    </Container>
  );
};

export default PaymentPage;