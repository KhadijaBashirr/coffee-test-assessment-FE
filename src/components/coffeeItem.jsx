import React, { useContext, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CartContext } from '../context/cartContext';

const CoffeeItem = ({ item }) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const cartItem = cart.find(cartItem => cartItem.id === item.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = async () => {
    try {
      await addToCart(item, quantity);
      setQuantity(1); // Reset quantity after adding to cart
    } catch (error) {
      console.error('Error adding item to cart:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const handleIncrementCart = async () => {
    try {
      await addToCart(item, 1);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      await removeFromCart(item, 1);
    } catch (error) {
      console.error('Error removing item from cart:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={item.image || 'https://via.placeholder.com/140x140?text=No+Image'}
        alt={item.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
        <Typography variant="h6" color="text.primary" mt={2}>
          ${parseFloat(item.price).toFixed(2)}
        </Typography>
        {cartQuantity > 0 ? (
          <Box display="flex" alignItems="center" mt={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleRemoveFromCart}
              size="small"
            >
              <RemoveIcon />
            </Button>
            <Typography variant="body1" mx={2}>
              {cartQuantity}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleIncrementCart}
              size="small"
            >
              <AddIcon />
            </Button>
          </Box>
        ) : (
          <Box display="flex" alignItems="center" mt={2}>
            <TextField
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              inputProps={{ min: 1 }}
              size="small"
              sx={{ width: '60px', mr: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
            >
              Add to Bucket
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CoffeeItem;