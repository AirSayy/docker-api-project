import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LazyLoadedTreeView = () => {
  const [treeData, setTreeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTreeData = async () => {
      try {
        const response = await axios.get('/items');
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
        {item.numberOfChildren > 0 && (
          <ul>
            {item.children.map((child) => renderTreeItem(child))}
          </ul>
        )}
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
