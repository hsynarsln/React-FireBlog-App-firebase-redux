import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Dashboard from '../Pages/Dashboard';
import Details from '../Pages/Details';
import Login from '../Pages/Login';
import NewBlog from '../Pages/NewBlog';
import Profile from '../Pages/Profile';
import Register from '../Pages/Register';
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
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile/:id' element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
