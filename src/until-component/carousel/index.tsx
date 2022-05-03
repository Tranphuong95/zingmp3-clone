import './index.scss'
import React, { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import CardCarousel from './CardCarousel';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type ListProps = {
    title: string,
    subtitle: string,
    href: string,
    imgUrl: string
}

const Carousel: React.FC<{ list: Array<ListProps>, timeDelay?: number }> = ({ list, timeDelay}) => {
    const timer:any=useRef(null);
    useEffect(() => {
        const galleryContainer = document.querySelector<HTMLElement>("#gallery-container")
        const galleryItemList = galleryContainer?.querySelectorAll<HTMLElement>(".gallery-item");
        const prevButton=galleryContainer?.querySelector<HTMLElement>("#carousel-control-prev");
        const nextButton=galleryContainer?.querySelector<HTMLElement>("#carousel-control-next");
        let currentSelectIndex = 1; //choose card select;
        let firstPrev:any=0;
        let firstNext:any=0;
        const changeImage = function (disableChange?:boolean) {
                if (galleryItemList) {
                if (currentSelectIndex > galleryItemList.length - 1) {
                    currentSelectIndex = 0;
                }
                if(currentSelectIndex<0){
                    currentSelectIndex=galleryItemList.length - 1;
                }
                for (let index = 0; index < galleryItemList.length; index++) {
                    if (index === currentSelectIndex) {
                        galleryItemList[index - 1 >= 0 ? index - 1 : galleryItemList.length - 1].className = "gallery-item gallery-item-previous";
                        galleryItemList[index].className = "gallery-item gallery-item-selected";
                        galleryItemList[index + 1 <= galleryItemList.length - 1 ? index + 1 : index + 1-galleryItemList.length].className = "gallery-item gallery-item-next";
                        galleryItemList[index + 2 <= galleryItemList.length - 1 ? index + 2 : index + 2-galleryItemList.length].className = "gallery-item gallery-item-last";
                        galleryItemList[index + 3 <= galleryItemList.length - 1 ? index + 3 : index + 3-galleryItemList.length].className = "gallery-item gallery-item-add";
                        galleryItemList[index + 4 <= galleryItemList.length - 1 ? index + 4 : index + 4-galleryItemList.length].className = "gallery-item gallery-item-first"
                    }


                }
                if(!disableChange){
                    firstPrev=0;
                    firstNext=0;
                    currentSelectIndex++;
                }
                else{
                    if(timer.current){
                        clearInterval(timer.current)
                    }
                }
            }
        }
        changeImage();
        timer.current=setInterval(() => changeImage(), timeDelay);
        const prevFunction=()=>{
            if(firstPrev===0){
                currentSelectIndex-=2;
                firstPrev=1;
            }else{
                currentSelectIndex--;
            }
            changeImage(true)
           timer.current=setInterval(() => changeImage(), timeDelay);
            document.removeEventListener("click", nextFunction);
            document.removeEventListener("click", prevFunction);
        }
        const nextFunction=()=>{
            if(firstNext===0){
                firstNext=1;
            }
            else{
                currentSelectIndex++;
            }
            
            changeImage(true)
            timer.current=setInterval(() => changeImage(), timeDelay);
            document.removeEventListener("click", nextFunction);
            document.removeEventListener("click", prevFunction);
        }
        if(prevButton){
            prevButton.addEventListener("click",prevFunction)
        }
        if(nextButton){  
            nextButton.addEventListener("click",nextFunction)
        }
        return ()=>{
            clearInterval(timer.current);
            document.removeEventListener("click", nextFunction)
            document.removeEventListener("click", prevFunction)
        }

    })
    return (
        <div className='container'>
            <div className='gallery'>
                <div className='gallery-container' id="gallery-container">
                    <div className='gallery-prev'>
                        <button className='btn carousel-control-prev' id="carousel-control-prev" tabIndex={0}>
                            <FontAwesomeIcon icon={faChevronLeft as IconProp} />
                        </button>
                    </div>

                    <div className="gallery-item ">
                        <CardCarousel title="" subtitle="" href="/album/US-UK-2022-Nghe-Gi-Doja-Cat-Camila-Cabello-The-Weeknd-OneRepublic/69FZE9OO.html" imgUrl="https://photo-zmp3.zadn.vn/banner/0/4/d/8/04d8607213533f9d60c7ac25bd2c3429.jpg" />
                    </div>
                    <div className="gallery-item ">
                        <CardCarousel title="" subtitle="" href='/bai-hat/May-Khi-Duoc-Yeu-Nguyen/ZZ7EO867.html' imgUrl='https://photo-zmp3.zadn.vn/banner/e/9/0/1/e901e71218d8c8fec30428055d74f2c6.jpg' />
                    </div>
                    <div className="gallery-item ">
                        <CardCarousel title="" subtitle="" href='/bai-hat/Cam-On-Em-Da-Den-Ben-Anh-Thai-Hoc/ZZ800AUE.html' imgUrl='https://photo-zmp3.zadn.vn/banner/b/2/9/5/b295fb9a66a11366450288e61771c1ae.jpg' />
                    </div>
                    <div className="gallery-item ">
                        <CardCarousel title="" subtitle="" href='/album/Top-Hits-V-Pop-ERIK-Duc-Phuc-Jack-Hien-Ho/ZE990807.html' imgUrl='https://photo-zmp3.zadn.vn/banner/b/5/1/8/b518911016fa5d9b3445220a1e5a5820.jpg' />
                    </div>
                    <div className="gallery-item ">
                        <CardCarousel title="" subtitle="" href='/bai-hat/Em-Dau-Biet-Duoc-Chi-Dan/ZZ6E0UZA.html' imgUrl='https://photo-zmp3.zadn.vn/banner/d/0/2/d/d02d5ecd8490aa9f32758f00cab7d34a.jpg' />
                    </div>
                    <div className="gallery-item ">
                        <CardCarousel title="" subtitle="" href='/bai-hat/Duyen-Duyen-So-So-DuUyen/ZZ8WW9OF.html' imgUrl='https://photo-zmp3.zadn.vn/banner/7/7/6/4/7764d14744d9a432f9d216d373e5f7de.jpg' />
                    </div>

                    <div className='gallery-next'>
                        <button className='btn carousel-control-next' id="carousel-control-next" tabIndex={0}>
                            <FontAwesomeIcon icon={faChevronRight as IconProp} />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
Carousel.defaultProps={
    timeDelay: 3000
}
export default Carousel