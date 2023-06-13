// Parent component

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getItem } from './api';
import AddItem from './AddItem';

const ParentComponent = () => {
  const location = useLocation();
  const [selectedItemId, setSelectedItemId] = useState('');

  useEffect(() => {
    // Get the selected item ID from the URL parameters
    const params = new URLSearchParams(location.search);
    const itemId = params.get('selectedItemId');
    setSelectedItemId(itemId);
  }, [location]);

  return (
    <div>
      {/* Render the AddItem component and pass the selectedItemId as a prop */}
      <AddItem selectedItemId={selectedItemId} />
    </div>
  );
};

export default ParentComponent;
