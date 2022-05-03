import "./index.scss";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { CardItem, CardPlayList } from "../../../../../until-component/carousel/card-item/CardItem";
import { IconPlay } from "./../../../../../until-component/IconList";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
type listCardProps={
  textContent?: string, 
  imgUrl?: string,
  href?:string,
  isPlaylist?: boolean
}

const HomeRecent: React.FC<{ title?: string, listCard?: Array<listCardProps>}> = ({ title, listCard }) => {
  return (
    <div className='section playlist-section home-recent chanel-section mar-t-30'>
      <div className="container">
        <h3 className='section-title title is-2'>{title}
          <Link to="/mymusic/history" className='discovery-btn'>
            Tất cả
            <FontAwesomeIcon icon={faChevronRight as IconProp} className="icon" />
          </Link>
        </h3>

      </div>
      <div className='carousel-wrapper'>
        <div className='carousel'>
          <div className='carousel__container' style={{ transform: "translate3d(0px, 0px, 0px)" }}>
            {listCard?.map((card, index)=>(
              <React.Fragment key={index}>
                {!card.isPlaylist?<CardItem icon={<IconPlay/>} textContent={card.textContent} imgUrl={card.imgUrl}/>:
                <CardPlayList href={card.href} title={card.textContent} imgUrl={card.imgUrl}/>
                }
              </React.Fragment>
            ))}
          </div>
        </div>
        <button className="btn carousel-control-prev disabled is-hidden button" tabIndex={0}>
          <FontAwesomeIcon icon={faChevronLeft as IconProp} className="icon"/>
        </button>
        <button className="btn carousel-control-next disabled is-hidden button" tabIndex={0}>
          <FontAwesomeIcon icon={faChevronRight as IconProp} className="icon"/>
        </button>
      </div>
    </div>
  )
}

export default HomeRecent