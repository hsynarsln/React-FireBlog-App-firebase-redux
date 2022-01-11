import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Dashboard from '../Pages/Dashboard';
import Details from '../Pages/Details';
import Login from '../Pages/Login';
import NewBlog from '../Pages/NewBlog';
import NotFound from '../Pages/NotFound';
import Profile from '../Pages/Profile';
import Register from '../Pages/Register';
import UpdateBlog from '../Pages/UpdateBlog';

const AppRouter = () => {
  const user = useSelector(state => state.userReducer.user);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/detail/:id' element={<Details />} />
        <Route path='/new-blog' element={<NewBlog />} />
        <Route path='/update-blog/:id' element={<UpdateBlog />} />
        {!user && <Route path='/login' element={<Login />} />}
        {!user && <Route path='/register' element={<Register />} />}
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
