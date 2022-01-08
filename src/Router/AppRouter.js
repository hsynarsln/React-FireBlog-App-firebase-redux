import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Dashboard from '../Pages/Dashboard';
import Details from '../Pages/Details';
import NewBlog from '../Pages/NewBlog';
import UpdateBlog from '../Pages/UpdateBlog';

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/detail/:id' element={<Details />} />
        <Route path='/new-blog' element={<NewBlog />} />
        <Route path='/update-blog/:id' element={<UpdateBlog />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
