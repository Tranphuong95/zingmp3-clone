import "./index.scss"
import React from "react";
export const CardItem: React.FC<{ icon?: React.ReactNode, imgUrl?: string, textContent?:string }> = ({ icon, imgUrl, textContent }) => {
  const playMusic = (event: React.MouseEvent) => {
    const icon = event.target as HTMLElement;
    const containerList = document.querySelectorAll(".top-content");
    if (icon) {
      icon.classList.contains("ic-svg-play-circle") ? icon.classList.replace("ic-svg-play-circle", "ic-gif-playing-white") :
        icon.classList.replace("ic-gif-playing-white", "ic-svg-play-circle")
    }

    containerList?.forEach((item, index) => {
      if (item.contains(icon)) {
        item?.classList?.contains('active')?item?.classList.remove("active"):item?.classList.add("active")
      }
      if(!item.contains(icon)){
        const iconPlaying=item.querySelector(".ic-gif-playing-white");
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