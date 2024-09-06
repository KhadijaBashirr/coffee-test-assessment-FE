import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PaymentPage from "./paymentPage";
import {
  getCustomerByEmail,
  getOrderById,
  placeOrder,
} from "../services/itemsService";

const OrderPage = ({ onClose }) => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [customerData, setCustomerData] = useState(null);
  const [customerNotFound, setCustomerNotFound] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderId = localStorage.getItem("order_id");
        if (!orderId) {
          throw new Error("No order in the bucket yet");
        }
        const data = await getOrderById(orderId);
        setOrderData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleEmailSubmit = async () => {
    try {
      const data = await getCustomerByEmail(email);
      if (data) {
        setCustomerData(data);
        setCustomerNotFound(false);
      } else {
        setCustomerData(null);
        setCustomerNotFound(true);
      }
    } catch (err) {
      console.error("Error fetching customer data:", err);
      setCustomerData(null);
      setCustomerNotFound(true);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      let payload;
      if (customerData) {
        payload = {
          id: orderData.id,
          customer_id: customerData.id,
        };
      } else {
        payload = {
          id: orderData.id,
          customer: {
            email: email,
            phone_number: phone,
            name: name,
          },
        };
      }

      const response = await placeOrder(payload);
      if (response) {
        setOrderData(response); // Update orderData with the response
        console.log(response);
        alert(response.message);
      } else {
        setError("Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error("Error placing order:", err);
      setError("An error occurred while placing the order. Please try again.");
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!orderData || !orderData.order_items) {
    return <Typography color="error">No order data available</Typography>;
  }

  const calculateItemTotal = (item) => {
    const price = parseFloat(item.item.price);
    const quantity = item.quantity;
    const taxPercentage = item.item.tax_bucket.percentage;
    const subtotal = price * quantity;
    const tax = subtotal * (taxPercentage / 100);
    return (subtotal + tax).toFixed(2);
  };

  return (
    <Container maxWidth="md">
      <IconButton onClick={onClose} sx={{ mt: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Order
      </Typography>
      <Typography variant="subtitle1">Order ID: {orderData.id}</Typography>
      <Typography variant="subtitle1">Status: {orderData.status}</Typography>
      <Typography variant="subtitle1">
        Date: {new Date(orderData.created_at).toLocaleDateString()}
      </Typography>
      <List>
        {orderData.order_items.map((orderItem) => (
          <ListItem
            key={orderItem.id}
            sx={{
              flexDirection: "column",
              alignItems: "flex-start",
              borderBottom: "1px solid #e0e0e0",
              py: 2,
            }}
          >
            <ListItemText
              primary={orderItem.item.name}
              secondary={`Quantity: ${orderItem.quantity}`}
            />
            <Typography variant="body2" sx={{ mt: 1 }}>
              Price: ${parseFloat(orderItem.item.price).toFixed(2)}
            </Typography>
            <Typography variant="body2">
              Tax: {orderItem.item.tax_bucket.tax_type} (
              {orderItem.item.tax_bucket.percentage}%)
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              Item Total: ${orderItem.price}
            </Typography>
            {orderItem.discount && (
              <Typography variant="body2" color="error">
                Discount: ${parseFloat(orderItem.discount).toFixed(2)}
              </Typography>
            )}
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" align="right">
        Total: ${parseFloat(orderData.total).toFixed(2)}
      </Typography>

      <TextField
        fullWidth
        label="Enter your email"
        variant="outlined"
        value={email}
        onChange={handleEmailChange}
        margin="normal"
      />
      {!customerData && !customerNotFound && (
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleEmailSubmit}
          disabled={!email}
        >
          Check Email
        </Button>
      )}

      {customerNotFound && (
        <>
          <Typography color="info" sx={{ mt: 2 }}>
            We couldn't find your email. Please provide additional information:
          </Typography>
          <TextField
            fullWidth
            label="Enter your name"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Enter your phone"
            variant="outlined"
            value={phone}
            onChange={handlePhoneChange}
            margin="normal"
          />
        </>
      )}

      {customerData && (
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Welcome back, {customerData.name}!
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handlePlaceOrder}
        disabled={!customerData && (!customerNotFound || !name || !phone)}
      >
        Place Order
      </Button>
    </Container>
  );
};

export default OrderPage;
