import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, Typography, AppBar, Toolbar, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CoffeeItem from '../components/coffeeItem';
import { CartContext } from '../context/cartContext';
import OrderPage from './orderPage';
import { getItemsGroupedByCategory } from '../services/itemsService';

export const ItemsList = () => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const [showOrderPage, setShowOrderPage] = useState(false);
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      const response = await getItemsGroupedByCategory();
      setItems(response);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching items:', err);
      setError('Failed to load items. Please try again later.');
      setLoading(false);
    }
  };

  const handleCartClick = () => {
    setShowOrderPage(true);
  };

  const getCartQuantity = (itemId) => {
    const cartItem = cart.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  if (showOrderPage) {
    return <OrderPage onClose={() => setShowOrderPage(false)} />;
  }

  // ... (loading and error handling remain the same)

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Coffee Shop
          </Typography>
          <IconButton color="inherit" onClick={handleCartClick}>
            <Badge badgeContent={cartItemCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {Object.entries(items).map(([categoryName, categoryItems]) => (
            <React.Fragment key={categoryName}>
              <Grid item xs={12}>
                <Typography variant="h4" component="h2">
                  {categoryName}
                </Typography>
              </Grid>
              {categoryItems.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <CoffeeItem
                    item={item}
                    onAddToCart={addToCart}
                    onRemoveFromCart={removeFromCart}
                    cartQuantity={getCartQuantity(item.id)}
                  />
                </Grid>
              ))}
            </React.Fragment>
          ))}
        </Grid>
      </Container>
    </>
  );
};