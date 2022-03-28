import React, { useEffect } from 'react';
import styles from "./styles/layout.module.scss";
import SideBar from './layout/side-bar';
import Header from './layout/header';
import MainContent from './layout/main-content';
import PlayBar from './layout/play-bar';
import decode from 'jwt-decode';

import { logout } from './features/auth/auth';
import {useDispatch} from "react-redux";

function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    document.onmousemove=function(){
      const token=localStorage.getItem("profile") && JSON.parse(localStorage.getItem("profile")||"");
      if(token && token.accessToken){
        const decodeToken:any=decode(token.accessToken);
        const exp=decodeToken.exp;
        if (exp * 1000 < new Date().getTime()) {
          dispatch(logout());
        };
      }
    }
  });
  
  return (
    <>
    <div className={`${styles.section} layout`}>
      <SideBar/>
      <Header/>
      <MainContent/>
      <PlayBar/>
    </div>
    </>
  );
}

export default App;
