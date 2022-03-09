import React from 'react';
import { Routes, Route } from "react-router-dom"
import styles from "../../styles/layout/mainpage/mainpage.module.scss";

//import component
import Discover from './main-components/Discover';
const MainContent = () => {
  return (
    <div className={styles['mainpage']}>
      <div style={{ position: "relative", overflow: "hidden", width: "100%", height: "100%"}}>

        <main className={styles.section} id="body-scroll" style={{ position: "absolute", inset: 0, overflow: "hidden scroll", marginRight: -6, marginBottom: 0 }}>
          <Routes>
            <Route path="/" element={<Discover />} />
          </Routes>
        </main>

        {/* <div className={styles['track-horizontal']} style={{
        position: "absolute",
        height: 6,
        transition: "opacity 200ms",
        opacity: 0
      }} id="track-horizontal-id">
      <div style={{ position: "relative", display: "block", height: "100%", cursor: "pointer", borderRadius: "inherit", backgroundColor: "rgba(0, 0, 0, 0.2)", width: 0 }}></div>
      </div>
      <div className={styles['track-vertical']} style={{
        position: "absolute",
        width: 6,
        transition: "opacity 200ms",
        opacity: 0,
        top: 2,
        right: 2,
        bottom: 2,
        zIndex: 100,
        cursor: isDragging ? 'grabbing' : 'pointer'
      }} id="track-vertical-id" ref={scrollTrackRef} onClick={handleTrackClick}>
      <div className={styles["thumb-vertical"]} id="thumb-vertical-id" ref={scrollThumbRef} style={{
        position: "relative", display: "block", width: "100%", height: `${thumbHeight}px`, cursor: isDragging ? 'grabbing' : 'grab'
        //  transform: "translateY(50px)"
      }} onMouseDown={handleThumbMousedown}></div>
    </div> */}
      </div>
    </div>
  )
}

export default MainContent