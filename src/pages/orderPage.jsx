import React, { useContext, useState } from 'react';
import { Container, Typography, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CartContext } from '../context/cartContext';
import PaymentPage from './paymentPage';

const OrderPage = ({ onClose }) => {
  const { cart } = useContext(CartContext);
  const [showPayment, setShowPayment] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    setShowPayment(true);
  };

  if (showPayment) {
    return <PaymentPage total={total} onBack={() => setShowPayment(false)} />;
  }

  return (
    <Container maxWidth="md">
      <IconButton onClick={onClose} sx={{ mt: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Order
      </Typography>
      <List>
        {cart.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.name}
              secondary={`Quantity: ${item.quantity}`}
            />
            <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" align="right">
        Total: ${total.toFixed(2)}
      </Typography>
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handlePlaceOrder}>
        Place Order
      </Button>
    </Container>
  );
};

export default OrderPage;