

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { getItems, deleteItem } from './api';

const TreeNode = ({ item, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  if (!item) {
    return null; // Return early if item is undefined or null
  }

  return (
    <React.Fragment>
      <tr className="bg-white border-b dark:bg-gray-300 dark:border-gray-700">
        <td className="px-6 py-4">
          <button className="mr-2" onClick={handleToggle}>
            <FontAwesomeIcon icon={isExpanded ? faChevronDown : faChevronRight} />
          </button>
          {item.name}
        </td>
        <td className="px-6 py-4">{item.description}</td>
        <td className="px-6 py-4">{item.parent}</td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <Link to={`/updateItem/${item.id}`}>
              <FontAwesomeIcon className="mr-4" icon={faEdit} />
            </Link>
            <button onClick={() => onDelete(item.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </td>
      </tr>
      {isExpanded &&
        item.children.map((child) => (
          <tr key={child.id} className="bg-white border-b dark:bg-gray-300 dark:border-gray-700">
            <td className="pl-12 py-4">{child.name}</td>
            <td className="px-6 py-4">{child.description}</td>
            <td className="px-6 py-4">{child.parent}</td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                <Link to={`/updateItem/${child.id}`}>
                  <FontAwesomeIcon className="mr-4" icon={faEdit} />
                </Link>
                <button onClick={() => onDelete(child.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </td>
          </tr>
        ))}
    </React.Fragment>
  );
};

const TreeView = () => {
  const [treeData, setTreeData] = useState([]);
  const [filteredTreeData, setFilteredTreeData] = useState([]);
  const [searchName, setSearchName] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadTreeData = async () => {
      try {
        const response = await getItems();
        setTreeData(response.data.results);
        const state = location.state;
        if (state && state.createdItemId) {
          console.log('New item created:', state.createdItemId);
          navigate('/treeView', { replace: true });
        }
      } catch (error) {
        console.error('Error loading tree data:', error);
      }
    };

    loadTreeData();
  }, [location, navigate]);

  useEffect(() => {
    filterTreeData();
  }, [treeData, searchName]);

  const handleDelete = async (itemId) => {
    try {
      await deleteItem(itemId);
      // Remove the deleted item from the tree data
      setTreeData((prevTreeData) => removeItemFromTree(prevTreeData, itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const removeItemFromTree = (tree, itemId) => {
    return tree.filter((item) => {
      if (item.id === itemId) {
        return false;
      }
      if (item.children) {
        item.children = removeItemFromTree(item.children, itemId);
        return true;
      }
      return true;
    });
  };

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  };

  const filterTreeData = () => {
    const filteredData = treeData.filter((item) => {
      return item.name.toLowerCase().includes(searchName.toLowerCase());
    });
    setFilteredTreeData(filteredData);
  };
  return (
    <div className="relative overflow-x-auto">
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Search by Name:</label>
        <input
          type="text"
          className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchName}
          onChange={handleSearchChange}
        />
      </div>
  
      <table className="w-full text-sm text-left text-black dark:text-gray-900">
        {/* Table header */}
        <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-white dark:text-black">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Parent
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {filteredTreeData.length > 0 ? (
            filteredTreeData.map((item) => (
              <TreeNode key={item.id} item={item} onDelete={handleDelete} />
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-6 py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
  
      <Link to="/">
        <button className="ml-10 mt-10 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-white dark:text-black dark:border-gray-600 dark:hover:bg-gray-300 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          Add item
        </button>
      </Link>
    </div>
  );
  
}

export default TreeView;
