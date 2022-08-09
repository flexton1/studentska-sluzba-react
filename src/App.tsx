import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import StudentList from './components/StudentList';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';


function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path={'/'} element={<StudentList />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/registracija'} element={<Registration />} />
      </Routes>

    </React.Fragment>
  );
}

export default App;
