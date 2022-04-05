import TokenService from '@/services/token.service';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  let location = useLocation();
  const accessToken=TokenService.getLocalAccessToken();
   if(accessToken) {
    return children
   }
   else{
     return <Navigate to="/login" state={{ from: location }}/>
   }
};
export const PrivateLogin:React.FC<{children:any}> = ({ children }) => {
  let location = useLocation();
  const accessToken=TokenService.getLocalAccessToken();
   if(accessToken) {
    return  <Navigate to="/" state={{ from: location }} />
   }
  else{
    return children
  }
}