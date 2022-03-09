import React from 'react';
import './index.scss';

const CardCarousel:React.FC<{title?:string , subtitle?: string, imgUrl?: string, href?: string}> = ({imgUrl, title, subtitle, href}) => {
  return (
    <div className='card'>
        <a title={title} href={href}>
            <div className='card-image'>
                <figure className='image is-48x48'>
                    <img src={imgUrl} alt=""/>
                </figure>
            </div>
            <div className='card-content'>
                <div className='title'></div>
                <h3 className='subtitle'></h3>
            </div>
            </a>
        </div>
  )
}

export default CardCarousel