import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import StudentList from './components/StudentList';
import Login from './components/Login/Login';


function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path={'/'} element={<StudentList />} />
        <Route path={'/login'} element={<Login />} />
      </Routes>

    </React.Fragment>
  );
}

export default App;
