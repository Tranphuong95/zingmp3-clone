import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from "./styles/layout.module.scss";
import SideBar from './layout/side-bar';
import Header from './layout/header';
import MainContent from './layout/main-content';
import PlayBar from './layout/play-bar';
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
      <ToastContainer
        autoClose={2000}
      />
      <Routes>
        <Route path="/*" element={<PrivateRoute><PublishPage /></PrivateRoute>} />
        <Route path='/login' element={<PrivateLogin><LoginPage /></PrivateLogin>} />
        {profile.roles === "admin" && <Route path="/admin" element={<AdminPage profile={profile} />} />}
      </Routes>
    </>
  );
}

export default App;
