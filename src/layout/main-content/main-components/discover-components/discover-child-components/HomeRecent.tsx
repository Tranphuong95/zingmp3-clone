import "./index.scss";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { CardItem } from "../../../../../until-component/carousel/card-item/CardItem";
import { IconPlay } from "./../../../../../until-component/IconList";

const HomeRecent: React.FC<{ title?: string, listCard?: Array<{textContent?: string, imgUrl?: string}>}> = ({ title, listCard }) => {
  return (
    <div className='section playlist-section home-recent chanel-section mar-t-30'>
      <div className="container">
        <h3 className='section-title title is-2'>{title}
          <Link to="/mymusic/history" className='discovery-btn'>
            Tất cả
            <FontAwesomeIcon icon={faChevronRight} className="icon" />
          </Link>
        </h3>

      </div>
      <div className='carousel-wrapper'>
        <div className='carousel'>
          <div className='carousel__container' style={{ transform: "translate3d(0px, 0px, 0px)" }}>
            {listCard?.map((card, index)=>(
              <CardItem icon={<IconPlay/>} textContent={card.textContent} imgUrl={card.imgUrl}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeRecent