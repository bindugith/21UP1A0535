import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAccessToken, getProducts } from '../api';
import { Container, Typography, Card, CardContent, CardMedia } from '@mui/material';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        // As there is no specific endpoint for a single product, we fetch all and filter
        const data = await getProducts(accessToken, 'AZ', 'Laptop', 10, 1, 10000); // Adjust parameters as necessary
        const foundProduct = data.find((item) => item.id === productId);
        setProduct(foundProduct);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Card>
        <CardMedia
          component="img"
          alt={product.name}
          height="300"
          image={`https://source.unsplash.com/random?product,${product.category}`}
        />
        <CardContent>
          <Typography variant="h4" component="h1">
            {product.name}
          </Typography>
          <Typography variant="h6" component="h2">
            Company: {product.company}
          </Typography>
          <Typography variant="body1">
            Category: {product.category}
          </Typography>
          <Typography variant="body1">
            Price: ${product.price}
          </Typography>
          <Typography variant="body1">
            Rating: {product.rating}
          </Typography>
          <Typography variant="body1">
            Discount: {product.discount}%
          </Typography>
          <Typography variant="body1">
            Availability: {product.availability ? 'In Stock' : 'Out of Stock'}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetail;
