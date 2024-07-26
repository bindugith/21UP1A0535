import React, { useState, useEffect } from 'react';
import { getAccessToken, getProducts } from '../api';
import { Link } from 'react-router-dom';
import { Container, Grid, Typography, MenuItem, TextField, Select, InputLabel, FormControl, Button, Card, CardContent, CardMedia } from '@mui/material';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    company: 'AZ',
    category: 'Laptop',
    topN: 10,
    minPrice: 1,
    maxPrice: 10000,
  });

  const fetchProducts = async () => {
    const accessToken = await getAccessToken();
    if (accessToken) {
      const data = await getProducts(accessToken, filters.company, filters.category, filters.topN, filters.minPrice, filters.maxPrice);
      setProducts(data);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Top Products
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Company</InputLabel>
        <Select name="company" value={filters.company} onChange={handleFilterChange}>
          <MenuItem value="AMZ">AMZ</MenuItem>
          <MenuItem value="FLP">FLP</MenuItem>
          <MenuItem value="SNP">SNP</MenuItem>
          <MenuItem value="HYN">HYN</MenuItem>
          <MenuItem value="AZO">AZO</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select name="category" value={filters.category} onChange={handleFilterChange}>
          <MenuItem value="Laptop">Laptop</MenuItem>
          <MenuItem value="Phone">Phone</MenuItem>
          <MenuItem value="TV">TV</MenuItem>
          <MenuItem value="Earphone">Earphone</MenuItem>
          <MenuItem value="Tablet">Tablet</MenuItem>
          <MenuItem value="Charger">Charger</MenuItem>
          <MenuItem value="Mouse">Mouse</MenuItem>
          <MenuItem value="Keypad">Keypad</MenuItem>
          <MenuItem value="Bluetooth">Bluetooth</MenuItem>
          <MenuItem value="Pendrive">Pendrive</MenuItem>
          <MenuItem value="Remote">Remote</MenuItem>
          <MenuItem value="Speaker">Speaker</MenuItem>
          <MenuItem value="Headset">Headset</MenuItem>
          <MenuItem value="PC">PC</MenuItem>
        </Select>
      </FormControl>
      <TextField
        name="minPrice"
        label="Min Price"
        type="number"
        value={filters.minPrice}
        onChange={handleFilterChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="maxPrice"
        label="Max Price"
        type="number"
        value={filters.maxPrice}
        onChange={handleFilterChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={fetchProducts}>
        Apply Filters
      </Button>
      <Grid container spacing={4} style={{ marginTop: '20px' }}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt={product.name}
                height="140"
                image={`https://source.unsplash.com/random?product,${product.category}`}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Company: {product.company}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {product.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating: {product.rating}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Discount: {product.discount}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Availability: {product.availability ? 'In Stock' : 'Out of Stock'}
                </Typography>
                <Button component={Link} to={`/product/${product.id}`} variant="contained" color="primary" fullWidth style={{ marginTop: '10px' }}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
