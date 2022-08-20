
import { Component } from 'react';
import { Navigate, Route } from 'react-router-dom';
import checkAuth from './CheckAuth';



const PrivateRoute = (component: any, ...rest: any ) => {
  
  return <Route {...rest} render={(props: any) => (
    checkAuth.isAuthenticated
      ? <Component {...props} />
      : <Navigate to={{
          pathname: '/login',
          
        }} />
  )} />

      }
export default PrivateRoute;