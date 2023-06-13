// api utility functions
import axios from 'axios';




export const createItem =  (data) => {
    return axios.post('/items', data, {
      headers: {
        'Content-Type': 'application/json',
        
      },
      
    },console.log(data)) // Log the response data to the console)
      
};
  

export const getItems = (params) => {
    console.log( {params} )
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
