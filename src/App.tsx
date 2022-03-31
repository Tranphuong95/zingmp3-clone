import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from "./styles/layout.module.scss";
import SideBar from './layout/side-bar';
import Header from './layout/header';
import MainContent from './layout/main-content';
import PlayBar from './layout/play-bar';
import decode from 'jwt-decode';
import { useDispatch, useSelector } from "react-redux";

import { logout } from './features/auth/auth';
import TokenService from './services/token.service';

const PublishPage = () => {
  return (
    <div className={`${styles.section} layout`}>
      <SideBar />
      <Header />
      <MainContent />
      <PlayBar />
    </div>
  )
}
const AdminPage=()=>{
  const token=TokenService.getLocalAccessToken();
  if(!token) return null;
  return (
    <div>
      <h1>This is admin page</h1>
    </div>
  )
}
function App() {
  const dispatch = useDispatch();
  const state=useSelector(state=>console.log(state));
  useEffect(() => {
    document.onmousemove = function () {
      const token = localStorage.getItem("profile") && JSON.parse(localStorage.getItem("profile") || "");
      if (token && token.accessToken) {
        const decodeToken: any = decode(token.accessToken);
        const exp = decodeToken.exp;
        if (exp * 1000 < new Date().getTime()) {
          // dispatch(logout());
        };
      }
    }
  });

  return (
    <>
      {/* <div className={`${styles.section} layout`}>
        <SideBar />
        <Header />
        <MainContent />
        <PlayBar />
      </div> */}
    <Routes>
      <Route path="/*" element={<PublishPage/>}/>
      <Route path="/admin" element={<AdminPage/>}/>
    </Routes>
    </>
  );
}

export default App;
