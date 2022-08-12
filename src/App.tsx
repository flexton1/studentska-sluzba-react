import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';


const Login = React.lazy(() => import('./components/Login/Login'));
const StudentList = React.lazy(() => import('./components/StudentList'));
const Registration = React.lazy(() => import('./components/Registration/Registration'));



function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Routes>
      
        <Route path={'/'} element={
       <React.Suspense fallback={<>...</>}>
       <StudentList />
       </React.Suspense>
        } />
        
        
        <Route path={'/login'} element={
        <React.Suspense fallback={<>...</>}>
        <Login />
        </React.Suspense>
        } />
       
        <Route path={'/registracija'} element={
         <React.Suspense fallback={<>...</>}>
        <Registration />
        </React.Suspense>
        } />
     
      </Routes>

    </React.Fragment>
  );
}

export default App;
