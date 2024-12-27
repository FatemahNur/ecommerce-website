import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  Box,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { addToCart, removeFromCart } from '../features/cart/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const handleQuantityChange = (item, qty) => {
    dispatch(addToCart({ ...item, qty: Number(qty) }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    if (!userInfo) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Box>
          <Typography>Your cart is empty</Typography>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Go Shopping
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
              <Card key={item._id} sx={{ mb: 2 }}>
                <Grid container>
                  <Grid item xs={4}>
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      sx={{ height: '150px', objectFit: 'contain' }}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <CardContent>
                      <Typography
                        component={RouterLink}
                        to={`/product/${item._id}`}
                        variant="h6"
                        sx={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        ${item.price}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mt: 2,
                        }}
                      >
                        <TextField
                          type="number"
                          label="Quantity"
                          value={item.qty}
                          onChange={(e) =>
                            handleQuantityChange(item, e.target.value)
                          }
                          InputProps={{
                            inputProps: { min: 1, max: item.countInStock },
                          }}
                          sx={{ width: '100px' }}
                        />
                        <IconButton
                          onClick={() => handleRemoveItem(item._id)}
                          color="error"
                          sx={{ ml: 2 }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography>
                    Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{' '}
                    items): ${subtotal.toFixed(2)}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Cart;
