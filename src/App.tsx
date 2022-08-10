import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import StudentList from './components/StudentList';


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
