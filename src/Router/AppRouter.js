import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Dashboard from '../Pages/Dashboard';
import Details from '../Pages/Details';

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/detail/:id' element={<Details />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
