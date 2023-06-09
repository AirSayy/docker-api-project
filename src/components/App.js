
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes , Link} from 'react-router-dom';
import PaginatedTable from './PaginatedTable';
import LazyLoadedTreeView from './LazyLoadedTreeView';
import AddItem from './AddItem'


function App() {

  const [isTreeView, setIsTreeView] = useState(false);

  const toggleView = () => {
    setIsTreeView(!isTreeView);
  };
  return (
    <>
    <Router>
    
      <button className=" mt-5 ml-5 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={toggleView}>
        {isTreeView ? <Link to='/tableView'>Click for TableView </Link> : <Link to='/treeView'>Click for Tree view</Link>}
      </button>
           
      <Routes>
        
        <Route path="/addItem" element={<AddItem />} />
        <Route path="/tableView" element={<PaginatedTable />} />
        <Route path="/treeView" element={<LazyLoadedTreeView />} />

      </Routes>
        
    </Router>
    </>
  );
}

export default App;
