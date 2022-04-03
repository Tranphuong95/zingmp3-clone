import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from "./styles/layout.module.scss";
import SideBar from './layout/side-bar';
import Header from './layout/header';
import MainContent from './layout/main-content';
import PlayBar from './layout/play-bar';
import decode from 'jwt-decode';
import AdminPage from './components/admin-page/AdminPage';
import api from "./services/api";
import { AUTH_URL } from './config/urlConfig';
import TokenService from './services/token.service';
import { PrivateLogin, PrivateRoute } from './until-component/PrivateRoute';
import LoginPage from './components/LoginPage';

type profileType = {
  id: string,
  userName: string,
  email: string,
  phoneNumber: number | null,
  roles: [] | string
}
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

function App() {
  const initialStateProfile = {
    id: "",
    userName: "",
    email: "",
    phoneNumber: null,
    roles: ""
  }
  const [profile, setProfile] = useState<profileType>(() => initialStateProfile);
  const accessToken = TokenService.getLocalAccessToken();
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

  useEffect(() => {
    if (accessToken) {
      getProfile();
    }
  }, [accessToken])
  async function getProfile() {
    const result = await api.get(AUTH_URL + "profile");
    if (result?.data?.profile?.id) {
      setProfile(result?.data?.profile)
    }
    // setProfile(resultProfile);
  };
  return (
    <>
      {/* <div className={`${styles.section} layout`}>
        <SideBar />
        <Header />
        <MainContent />
        <PlayBar />
      </div> */}
      <Routes>
          <Route path="/*" element={<PrivateRoute><PublishPage /></PrivateRoute>} />
          <Route path='/login' element={<PrivateLogin><LoginPage/></PrivateLogin>}/>
        {profile.roles === "admin" && <Route path="/admin" element={<AdminPage profile={profile} />} />}
      </Routes>
    </>
  );
}

export default App;
