// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://20.244.56.144/test';

export const getAccessToken = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth`, {
  companyName: "AFFORDMED",
  clientID: "e65d3255-9b3b-4cc9-99ca-493e7c022802",
  clientSecret: "OrmwfhFmiFZRRZdl",
  ownerName: "K.Bindusree",
  ownerEmail: "kolturbindusree@gmail.com",
  rollNo: "21UP1A0535"
});

console.log(response)
    return response.data.access_token;
  } catch (error) {
    console.error('Error obtaining access token:', error);
    return null;
  }
};

export const getProducts = async (accessToken, company, category, topN, minPrice, maxPrice) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/companies/${company}/categories/${category}/products`, {
      params: {
        'top': topN,
        'minPrice': minPrice,
        'maxPrice': maxPrice,
      },
      headers: {
        Authorization:`Bearer ${getAccessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
