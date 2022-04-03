import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  let location = useLocation();
  const localStorageStr=localStorage.getItem('profile');
   if(localStorageStr && JSON.parse(localStorageStr)?.accessToken) {
    return children
   }
   else{
     return <Navigate to="/login" state={{ from: location }}/>
   }
};
export const PrivateLogin:React.FC<{children:any}> = ({ children }) => {
  let location = useLocation();
  const localStorageStr=localStorage.getItem('profile');
   if(localStorageStr && JSON.parse(localStorageStr)?.accessToken) {
    return  <Navigate to="/" state={{ from: location }} />
   }
  else{
    return children
  }
}