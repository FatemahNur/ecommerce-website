import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Rating,
  Box,
} from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {product.description.substring(0, 100)}...
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating value={product.rating} precision={0.5} readOnly />
          <Typography variant="body2" sx={{ ml: 1 }}>
            ({product.numReviews} reviews)
          </Typography>
        </Box>
        <Typography variant="h6" color="primary" gutterBottom>
          ${product.price}
        </Typography>
        <Button
          component={RouterLink}
          to={`/product/${product._id}`}
          variant="contained"
          fullWidth
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
