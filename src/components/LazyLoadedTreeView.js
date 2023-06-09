import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getItems } from './api';

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
        <Link to={`/updateItem/${item.id}`}>Update</Link>
      </li>
    );
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
