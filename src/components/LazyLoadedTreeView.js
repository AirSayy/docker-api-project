import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getItems , deleteItem  } from './api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'


const LazyLoadedTreeView = ({item}) => {
  const [treeData, setTreeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTreeData = async () => {
      try {
        const response = await getItems();
        setTreeData(response.data.results);
        setIsLoading(false);
        console.log(response.data.results)
      } catch (error) {
        console.log('Error fetching tree data:', error);
      }
    };

    fetchTreeData();
  }, []);

  const renderTreeItem = (item) => {
    return (
      <li key={item.id}>
        {item.name}
        {item.numberOfChildren > 0 && item.children &&  (
          <ul>
            {item.children.map((child) => renderTreeItem(child))}
          </ul>
        )}
        <Link to={`/updateItem/${item.id}`}><FontAwesomeIcon icon={faEdit} /></Link>
         <button  onClick={() => handleDelete(item.id)}><FontAwesomeIcon icon={faTrash} /> </button> 
        
         
      </li>
    );
  };

  const handleDelete = async (itemId) => {
    try {
      await deleteItem(itemId);
      // Remove the deleted item from the items array
      setTreeData((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <h2>Tree View</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {treeData.map((item) => renderTreeItem(item))}
          
        </ul>
      )}
    </div>
  );
};

export default LazyLoadedTreeView;
