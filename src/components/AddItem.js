import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItem, getItems } from './api';

const AddItem = () => {
  const navigate = useNavigate();
  const [itemData, setItemData] = useState({
    name: '',
    description: '',
    parentId: '',
  });
  const [validItems, setValidItems] = useState([]);

  useEffect(() => {
    fetchValidItems();
  }, []);

  const fetchValidItems = async () => {
    try {
      const response = await getItems();
      setValidItems(response.data.results);
    } catch (error) {
      console.error('Error fetching valid items:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddItem = async () => {
    try {
      await createItem(itemData);
      navigate('/tableView');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div>
      
      <form className='m-auto w-[50%]'>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black" htmlFor="name">Name:</label>
        <input className="shadow-sm bg-white border border-black text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-white dark:border-black dark:placeholder-gray-400 dark:text-black dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light" type="text" id="name" name="name" value={itemData.name} onChange={handleInputChange} />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black" htmlFor="description">Description:</label>
        <textarea className="shadow-sm bg-white border border-black text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-white dark:border-black dark:placeholder-gray-400 dark:text-black dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light" id="description" name="description" value={itemData.description} onChange={handleInputChange} />
        </div>

        <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black" htmlFor="parentId">Parent:</label>
        <select className="shadow-sm bg-white border border-black text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-white dark:border-black dark:placeholder-gray-400 dark:text-black dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light" id="parentId" name="parentId" value={itemData.parentId} onChange={handleInputChange}>
          {/* <option value="">None</option> */}
          {validItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        </div>

        <button className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-800" type="button" onClick={handleAddItem}>Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;
