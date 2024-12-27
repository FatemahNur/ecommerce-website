import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  Button,
  Rating,
  Box,
  TextField,
  CircularProgress,
} from '@mui/material';
import { fetchProductById } from '../features/products/productSlice';
import { addToCart } from '../features/cart/cartSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty: Number(qty) }));
    navigate('/cart');
  };

  if (loading) {
    return (
      <Grid container justifyContent="center">
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  if (!product) {
    return (
      <Typography align="center">Product not found</Typography>
    );
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            sx={{ height: '400px', objectFit: 'contain' }}
          />
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h4" gutterBottom>
          {product.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating value={product.rating} precision={0.5} readOnly />
          <Typography variant="body2" sx={{ ml: 1 }}>
            ({product.numReviews} reviews)
          </Typography>
        </Box>
        <Typography variant="h5" color="primary" gutterBottom>
          ${product.price}
        </Typography>
        <Typography variant="body1" paragraph>
          {product.description}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
          </Typography>
          {product.countInStock > 0 && (
            <TextField
              type="number"
              label="Quantity"
              InputProps={{ inputProps: { min: 1, max: product.countInStock } }}
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              sx={{ width: '100px', mb: 2 }}
            />
          )}
        </Box>
        <Button
          variant="contained"
          size="large"
          onClick={handleAddToCart}
          disabled={product.countInStock === 0}
          fullWidth
        >
          Add to Cart
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
