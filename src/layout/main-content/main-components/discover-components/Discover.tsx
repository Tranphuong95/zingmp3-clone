import Carousel from '../../../../until-component/carousel';
import React from 'react';
import styles from './../../../../styles/layout/mainpage/main-components/discover.module.scss';
import HomeRecent from './discover-child-components/HomeRecent';
type ListRecentProps={
  textContent?: string,
  imgUrl?: string
}
const Discover = () => {
  const ListRecent: Array<ListRecentProps> =[{
    textContent: "V-POP",
    imgUrl: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/0/8/e/4/08e4104877db6c9a77d6fc42f0a17a8b.jpg"
  }, 
  {
    textContent: "On Air",
    imgUrl: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/6/9/b/4/69b45afc9247c747299998860918edf0.jpg"
  }
]
  return (
    <div className={`${styles['container']} container`}>
       <Carousel list={[]}/>
       <div id="mp3-Top"></div>
       {ListRecent.length>0 && (<HomeRecent title="Gần đây" listCard={ListRecent}/>)}
    </div>
  )
}

export default Discover