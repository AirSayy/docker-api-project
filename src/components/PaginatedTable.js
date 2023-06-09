// src/TableView.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate , Link} from 'react-router-dom';
import { getItems} from './api';

const PaginatedTable = () => {
  
  const [tableData, setTableData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadTableData = async () => {
      try {
        const response = await getItems();
        setTableData(response.data.results);
        console.log(response.data)
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


  

  return (
    <div className="relative overflow-x-auto">
     
      
      {/* Render the table */}

     
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Description</th>
            <th scope="col" className="px-6 py-3">Parent</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((item) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item.id}>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.description}</td>
                <td className="px-6 py-4">{item.parent}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="px-6 py-4">No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      <Link to='/addItem'>
      <button className=" ml-10 mt-10 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Add item</button>
      </Link>
    </div>
  );
};

export default PaginatedTable;
