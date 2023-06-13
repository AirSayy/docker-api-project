
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { getItems, deleteItem } from './api';

const PaginatedTable = () => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadTableData = async () => {
      try {
        // GET /items
        const response = await getItems();
        setTableData(response.data.results);
        console.log(response.data.results)

        const state = location.state;
        if (state && state.createdItemId) {
          console.log('New item created:', state.createdItemId);
          navigate('/tableView', { replace: true });
        }
      } catch (error) {
        console.error('Error loading table data:', error);
      }
    };

    loadTableData();
  }, [location, navigate]);

  const handleDelete = async (itemId) => {
    try {
      await deleteItem(itemId);
      // Remove the deleted item from the items array
      setTableData((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="relative overflow-x-auto">
      {/* Render the table */}
      <table className="w-full text-sm text-left text-black dark:text-gray-900">
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
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <tr className="bg-white border-b dark:bg-gray-300 dark:border-gray-700" key={item.id}>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.description}</td>
                <td className="px-6 py-4">{item.parent}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Link to={`/updateItem/${item.id}`}>
                      <FontAwesomeIcon className="mr-4" icon={faEdit} />
                    </Link>
                    <button onClick={() => handleDelete(item.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
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

      {/* Pagination */}
      <div className="mt-4">
        <ul className="flex justify-center">
          {Array.from({ length: Math.ceil(tableData.length / itemsPerPage) }).map((_, index) => (
            <li key={index}>
              <button
                className={`px-2 py-1 mx-1 rounded-md focus:outline-none ${
                  currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Items per page dropdown */}
      <div className="mt-4">
        <label className="mr-2">Items per page:</label>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
          className="px-2 py-1 border rounded-md"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      <Link to="/">
        <button className="ml-10 mt-10 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-white dark:text-black dark:border-gray-600 dark:hover:bg-gray-300 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          Add item
        </button>
      </Link>
    </div>
  );
};

export default PaginatedTable;
