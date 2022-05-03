import "./index.scss"
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faEllipsis, faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { getTextWidth } from "../../../until/getText";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
export const CardItem: React.FC<{ icon?: React.ReactNode, imgUrl?: string, textContent?: string }> = ({ icon, imgUrl, textContent }) => {
  const playMusic = (event: React.MouseEvent) => {
    const icon = event.target as HTMLElement;
    const containerList = document.querySelectorAll(".top-content");
    if (icon) {
      icon.classList.contains("ic-svg-play-circle") ? icon.classList.replace("ic-svg-play-circle", "ic-gif-playing-white") :
        icon.classList.replace("ic-gif-playing-white", "ic-svg-play-circle")
    }

    containerList?.forEach((item, index) => {
      if (item.contains(icon)) {
        item?.classList?.contains('active') ? item?.classList.remove("active") : item?.classList.add("active")
      }
      if (!item.contains(icon)) {
        const iconPlaying = item.querySelector(".ic-gif-playing-white");
        item?.classList?.contains('active') && item?.classList.remove("active");
        iconPlaying?.classList.replace("ic-gif-playing-white", "ic-svg-play-circle");
      }
    })

  }
  return (
    <div className="carousel-item is-fullhd-1.4 is-widescreen-1.4 is-desktop-2 is-touch-20 is-tablet-20">
      <div className="card livestream-item">
        <div className="card-content">
          <div className="top-content">
            <div className="card-image">
              <figure className="image cover is48x48">
                <img src={imgUrl} alt="" />
              </figure>
            </div>
            <div className="opacity"></div>
            <div className="radio-icon">
              {icon}
            </div>
            <div className="action action-play">
              <button className="btn action-play button" tabIndex={0} onClick={playMusic}>
                <i className="icon action-play ic-svg-play-circle"></i>
              </button>
            </div>
          </div>
          <div className="bot-content">
            <h3 className="title">{textContent}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
export const CardPlayList: React.FC<{ href?: string, title?: string, imgUrl?: string }> = ({ href, title, imgUrl }) => {
  const [isDone, setIsDone] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [textString, setTextString] = useState<Array<string>>([])
  useEffect(() => {
    const parent = document.querySelector(".playlist-wrapper");
    const cardContent = parent?.querySelector<HTMLElement>(".card-content");
    const styleWidth = cardContent && cardContent.offsetWidth?cardContent.offsetWidth: 0;
    const fontSize = cardContent && window.getComputedStyle(cardContent, null).getPropertyValue('font-size') ? 
    window.getComputedStyle(cardContent, null).getPropertyValue('font-size'): "0";

    const textList = title?.split(" ")?.filter(f => f !== " ");

    const whiteSpaceWidth = getTextWidth(" ", fontSize);
    let arrString: string[] = [];
    textList?.forEach((item: string, index: number) => {
      if(arrString.length===0){
        arrString.push(item)
      }
      else if (getTextWidth(arrString[arrString.length - 1] + item, fontSize) < styleWidth - whiteSpaceWidth - 10) {
        arrString[arrString.length - 1] += " " + item;
      }
      else {
        arrString.push(item)
      }
    })
    setTextString(arrString)

  }, [title])

  function handleAddToLikeList(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    const button = event.target as HTMLElement;
    if (button.classList.contains("done")) {
      button.classList.remove("done");
      button.classList.add('active')
    }
    else {
      button.classList.add('done');
      button.classList.remove("active");
    }
    setIsDone((isDone) => !isDone);
  }
  function handleMouseOver() {
    setIsHover(true)
  }
  function handleMouseLeave() {
    setIsHover(false)
  };

  const playMusic = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    const icon = event.target as HTMLElement;
    const cardImageList = document.querySelectorAll(".card-image");
    if (icon) {
      icon.classList.contains("ic-svg-play-circle") ? icon.classList.replace("ic-svg-play-circle", "ic-gif-playing-white") :
        icon.classList.replace("ic-gif-playing-white", "ic-svg-play-circle")
    }

    cardImageList?.forEach((item, index) => {
      if (item.contains(icon)) {
        item?.classList?.contains('active') ? item?.classList.remove("active") : item?.classList.add("active")
      }
      if (!item.contains(icon)) {
        const iconPlaying = item.querySelector(".ic-gif-playing-white");
        item?.classList?.contains('active') && item?.classList.remove("active");
        iconPlaying?.classList.replace("ic-gif-playing-white", "ic-svg-play-circle");
      }
    })

  }
  return (
    <div className="carousel-item is-fullhd-1.4 is-widescreen-1.4 is-desktop-2 is-touch-20 is-tablet-20">
      <div className="playlist-wrapper is-title">
        <div className="card">
          <div>
            <Link title={`${title}`} to={`${href}`} className="link-router">
              <div className="card-image" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>{/* active className */}
                <figure className="image is-48x48">
                  <img src={`${imgUrl}`} alt="" />
                </figure>
                {isHover && (
                  <>
                    <div className="opacity"></div>
                    <div className="actions-container">
                      <div className="box actions playlist-actions">
                        <button className="btn tooltip-btn animation-like active is-hover-circle button" tabIndex={0} onClick={handleAddToLikeList}>
                          {isDone ? <FontAwesomeIcon icon={faHeartSolid as IconProp} className="icon is-like-full" /> : <FontAwesomeIcon icon={faHeartRegular as IconProp} className="icon" />}
                          <FontAwesomeIcon icon={faHeartSolid as IconProp} className="icon is-like-full" />
                        </button>
                        <button className="btn action-play button" onClick={playMusic}>
                          <i className="icon action-play ic-svg-play-circle"></i>
                        </button>
                        <button className="btn tooltip-btn  active is-hover-circle button" tabIndex={0}>
                          <FontAwesomeIcon icon={faEllipsis as IconProp} className="icon-ellipsis" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Link>
          </div>
          <div className="card-content">
            <h4 className="title is-6">
              <Link title={`${title}`} to={`${href}`} className="link-router">
                <span>
                  <span>
                    {textString?.map((item: string, index: number) => (
                      <React.Fragment key={index}>
                        <span>{item}</span>
                        <br />
                      </React.Fragment>
                    ))}
                  </span>
                  <span style={{ position: "fixed", visibility: 'hidden', top: 0, left: 0 }}>...</span>
                </span>
              </Link>
            </h4>
          </div>
        </div>
      </div>
    </div>
  )
}