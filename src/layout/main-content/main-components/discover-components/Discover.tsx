import Carousel from '../../../../until-component/carousel';
import React from 'react';
import styles from './../../../../styles/layout/mainpage/main-components/discover.module.scss';
import HomeRecent from './discover-child-components/HomeRecent';
type ListRecentProps = {
  textContent?: string,
  imgUrl?: string,
  href?: string,
  isPlaylist?: boolean
}
const Discover = () => {
  const ListRecent: Array<ListRecentProps> = [{
    textContent: "V-POP",
    imgUrl: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/0/8/e/4/08e4104877db6c9a77d6fc42f0a17a8b.jpg"
  },
  {
    textContent: "On Air",
    imgUrl: "https://photo-resize-zmp3.zadn.vn/w240_r1x1_webp/cover/6/9/b/4/69b45afc9247c747299998860918edf0.jpg"
  },
  {
    textContent: "Rap Việt Cực Chất",
    href: "/album/Rap-Viet-Cuc-Chat-16-Typh-Tage-Seachains-Lil-Wuyn/ZU6Z07DU.html",
    imgUrl: "https://photo-resize-zmp3.zadn.vn/w320_r1x1_webp/cover/4/1/7/3/417311b789dbe8a5d8aa82eabf059625.jpg",
    isPlaylist: true
  },
  {
    textContent: "Playlist Này Child Phết",
    href: "/album/Playlist-Nay-Chill-Phet-Kha-Bich-Phuong-14-Casper-Vicky-Nhung/ZUDW9B78.html",
    imgUrl: "https://photo-resize-zmp3.zadn.vn/w320_r1x1_webp/cover/d/a/c/6/dac69cd1300a635c193c0f03e8d6d617.jpg",
    isPlaylist: true
  }
  ]
  return (
    <div className={`${styles['container']} container`}>
      <Carousel list={[]} />
      <div id="mp3-Top"></div>
      {ListRecent.length > 0 && (<HomeRecent title="Gần đây" listCard={ListRecent} />)}
    </div>
  )
}

export default Discover