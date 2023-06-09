// api utility functions
import axios from 'axios';

// const API_BASE_URL = 'http://127.0.0.1:5000';


export const createItem =  (data) => {
    return axios.post('/items', data, {
      headers: {
        'Content-Type': 'application/json',
        
      },
      
    },console.log(data)) // Log the response data to the console)
      
};
  

export const getItems = (params) => {
   
  return axios.get('/items', { params } ,{
    headers: {
        'Content-Type': 'application/json',
      },
  });
};

export const updateItem = (itemId, data) => {
  return axios.put(`/items/${itemId}`, data,{
    headers: {
        'Content-Type': 'application/json',
      },
  });
};

export const deleteItem = (itemId) => {
  return axios.delete(`/items/${itemId}`);
};
