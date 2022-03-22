import React from 'react';
import styles from "./styles/layout.module.scss";
import SideBar from './layout/side-bar';
import Header from './layout/header';
import MainContent from './layout/main-content';
import PlayBar from './layout/play-bar';
import Auth from './layout/auth';


function App() {
  return (
    <>
    <div className={`${styles.section} layout`}>
      <SideBar/>
      <Header/>
      <MainContent/>
      <PlayBar/>
      <Auth/>
    </div>
    </>
  );
}

export default App;
