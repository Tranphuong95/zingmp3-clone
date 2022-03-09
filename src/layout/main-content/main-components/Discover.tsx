import Carousel from './../../../until-component/carousel';
import React from 'react';
import styles from './../../../styles/layout/mainpage/main-components/discover.module.scss';

const Discover = () => {
  return (
    <div className={`${styles['container']} container`}>
       <Carousel list={[]}/>
    </div>
  )
}

export default Discover