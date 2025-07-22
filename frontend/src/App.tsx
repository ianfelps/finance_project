import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import './App.css';
import { CompanySearch } from './company';
import { searchCompanies } from './api';
import { Outlet } from 'react-router';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
