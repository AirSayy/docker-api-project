import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateItem, getItems } from './api';

const ItemUpdateForm = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [itemData, setItemData] = useState({
    name: '',
    description: '',
    parentId: '',
  });

  useEffect(() => {
    fetchItemData();
  }, []);

  const fetchItemData = async () => {
    try {
      const response = await getItems(); // Pass the id as a query parameter
      const item = response.data.results; // Assuming the response contains the item data
  
      // Update the state with the fetched item data
      setItemData({
        name: item.name,
        description: item.description,
        parentId: item.parentId,
      });
    } catch (error) {
      console.error('Error fetching item data:', error);
    }
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateItem(itemId, itemData);
      navigate('/tableView');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div>
      <h2>Update Item</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={itemData.name} onChange={handleInputChange} />

        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={itemData.description} onChange={handleInputChange} />

        <label htmlFor="parentId">Parent ID:</label>
        <input type="text" id="parentId" name="parentId" value={itemData.parentId} onChange={handleInputChange} />

        <button type="button" onClick={handleUpdate}>Update</button>
      </form>
    </div>
  );
};

export default ItemUpdateForm;
