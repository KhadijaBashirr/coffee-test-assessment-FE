import React from 'react';
import { Container, Typography, Button, Grid, Paper, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PaymentPage = ({ total, onBack }) => {
  const tax = total * 0.08; // Assuming 8% tax rate
  const finalTotal = total + tax;

  return (
    <Container maxWidth="md">
      <IconButton onClick={onBack} sx={{ mt: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" component="h1" gutterBottom>
        Final Payment
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6">Subtotal:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" align="right">${total.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">Tax (8%):</Typography>
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
            <Typography variant="h5" align="right">${finalTotal.toFixed(2)}</Typography>
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