import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {  updateItem, getItems } from './api';

const ItemUpdateForm = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [itemData, setItemData] = useState({
    name: '',
    description: '',
    parentId: '',
  });
  const [validParents, setValidParents] = useState([]);

  useEffect(() => {
    fetchItemData();
    fetchValidParents();
  });

  const fetchItemData = async () => {
    try {
      const response = await getItems(itemId);
      const item = response.data; 

      // Update the state with the fetched item data.
      setItemData({
        name: item.name,
        description: item.description,
        parentId: item.parentId,
      });
    } catch (error) {
      console.error('Error fetching item data:', error);
    }
  };

  const fetchValidParents = async () => {
    try {
      const response = await getItems();
      const items = response.data.results; 

      // Exclude the current item and its descendants from the valid parents list
      const filteredItems = items.filter(
        (item) => item.id !== itemId && !item.ancestors.includes(itemId)
      );

      // Update the state with the filtered valid parents list
      setValidParents(filteredItems);
    } catch (error) {
      console.error('Error fetching valid parents:', error);
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
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Update Item</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={itemData.name}
            onChange={handleInputChange}
            className="mt-1 p-2.5 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={itemData.description}
            onChange={handleInputChange}
            className="mt-1 p-2.5 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="parentId" className="block text-sm font-medium text-gray-700">
            Parent:
          </label>
          <select
            id="parentId"
            name="parentId"
            value={itemData.parentId}
            onChange={handleInputChange}
            className="mt-1 p-2.5 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">None</option>
            {validParents.map((parent) => (
              <option key={parent.id} value={parent.id}>
                {parent.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={handleUpdate}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default ItemUpdateForm;
