// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { createItem } from './api';


// function AddItem() {
//     const [newItemData, setNewItemData] = useState({
//         name: '',
//         description: '',
//         parentId: '',
//     });
//     const navigate = useNavigate();

//     const handleCreateItem = async (e) => {
//         e.preventDefault();
    
//         try {
//           const response = await createItem(newItemData);

//           setNewItemData({ name: '', description: '', parentId: '' });

//           navigate('/tableView', { state: { createdItemId: response.data.id } });
         
//         //   loadTableData();
//           console.log(newItemData)
//         } catch (error) {
//           console.error('Error creating item:', error);
//         }
//     };
   
            
        

   

//   return (
//     <>
   
//     <form className='m-auto w-[50%]' onSubmit={handleCreateItem} >
//         <div className="mb-6">
//             <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Name :</label>
//             <input
//                 className="shadow-sm bg-white border border-black text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-white dark:border-black dark:placeholder-gray-400 dark:text-black dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light"
//                 type="text"
//                 placeholder="Name"
//                 value={newItemData.name}
//                 onChange={(e) =>
//                     setNewItemData({ ...newItemData, name: e.target.value })
//                 }
//             />
//         </div>
//         <div className="mb-6">
//             <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Description :</label>
//             <textarea
//                 className="shadow-sm bg-white border border-black text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-white dark:border-black dark:placeholder-gray-400 dark:text-black dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light"
//                 placeholder="Description"
//                 value={newItemData.description}
//                 onChange={(e) =>
//                     setNewItemData({ ...newItemData, description: e.target.value })
//                 }
//             />
//         </div>
//         <div className="mb-6">
//             <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Parent Id :</label>
//             <input
//                 className="shadow-sm bg-white border border-black text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-white dark:border-black dark:placeholder-gray-400 dark:text-black dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light"
//                 type="text"
//                 placeholder="Parent"
//                 value={newItemData.parentId}
//                 onChange={(e) =>
//                     setNewItemData({ ...newItemData, parentId: e.target.value })
//                 }
//             />
//         </div>
         
//         <button className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" type='submit'>Create Item</button>
        
        
//       </form>
//       </>
//   )
// }

// export default AddItem

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
      <h2>Add Item</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={itemData.name} onChange={handleInputChange} />

        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={itemData.description} onChange={handleInputChange} />

        <label htmlFor="parentId">Parent:</label>
        <select id="parentId" name="parentId" value={itemData.parentId} onChange={handleInputChange}>
          <option value="">None</option>
          {validItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <button type="button" onClick={handleAddItem}>Add</button>
      </form>
    </div>
  );
};

export default AddItem;
