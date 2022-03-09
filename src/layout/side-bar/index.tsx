import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { faAdd, faAddressCard, faChartLine, faClockRotateLeft, faFileAudio, faIcons, faList, faMusic, faNoteSticky, faPen, faPodcast, faRecordVinyl, faStar, faTicket} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../styles/layout/sidebar.module.scss';
import ToolTip from '../../until-component/tooltip';

const SideBar: React.FC = () => {
  const SIDEBAR_MENU_ITEM = {
    fontSize: 24,
    marginRight: 10,
  }
  const navigate=useNavigate();
  const location=useLocation();
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver | null>(null);

  const [scrollStartPosition, setScrollStartPosition] = useState<number | null>(null);
  const [initialScrollTop, setInitialScrollTop] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  const [thumbHeight, setThumbHeight] = useState(30);

  const [isMark, setIsMark] = useState(false);

  

  const handleThumbPosition = useCallback(() => {
    if (
      !contentRef.current ||
      !scrollTrackRef.current ||
      !scrollThumbRef.current
    ) {
      return;
    }
    const { scrollTop: contentTop, scrollHeight: contentHeight } =
      contentRef.current;
    const { clientHeight: trackHeight } = scrollTrackRef.current;
    let newTop = (+contentTop / +contentHeight) * trackHeight;
    newTop = Math.min(newTop, trackHeight - thumbHeight);
    const thumb = scrollThumbRef.current;
    thumb.style.top = `${newTop}px`;
    if (Number(contentRef.current.scrollTop) === 0) {
      setIsMark(false)
    }
    else {
      setIsMark(true)
    }
    // },[])
  }, [thumbHeight]);

  const handleTrackClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      const { current: trackCurrent } = scrollTrackRef;
      const { current: contentCurrent } = contentRef;
      if (trackCurrent && contentCurrent) {
        // First, figure out where we clicked
        const { clientY } = e;
        // Next, figure out the distance between the top of the track and the top of the viewport
        const target = e.target as HTMLDivElement;
        const rect = target.getBoundingClientRect();
        const trackTop = rect.top;
        // We want the middle of the thumb to jump to where we clicked, so we subtract half the thumb's height to offset the position
        const thumbOffset = -(thumbHeight / 2);
        // Find the ratio of the new position to the total content length using the thumb and track values...
        const clickRatio =
          (clientY - trackTop + thumbOffset) / trackCurrent.clientHeight;
        // ...so that you can compute where the content should scroll to.
        const scrollAmount = Math.floor(
          clickRatio * contentCurrent.scrollHeight
        );
        // And finally, scroll to the new position!
        contentCurrent.scrollTo({
          top: scrollAmount,
          behavior: 'smooth',
        });
      }
    },
    [thumbHeight]
  );

  function handleResize(ref: HTMLDivElement, trackSize: number) {
    console.log("resize")
    const { clientHeight, scrollHeight } = ref;
    setThumbHeight(Math.max((clientHeight / scrollHeight) * trackSize, 20));
  }

  useEffect(() => {
    if (contentRef.current && scrollTrackRef.current) {
      const ref = contentRef.current;
      const { clientHeight: trackSize } = scrollTrackRef.current;
      observer.current = new ResizeObserver(() => {
        handleResize(ref, trackSize);
      });
      observer.current.observe(ref);
      ref.addEventListener('scroll', handleThumbPosition);
      return () => {
        observer.current?.unobserve(ref);
        ref.removeEventListener('scroll', handleThumbPosition);
      };
    }
    // }, [])
  }, [thumbHeight]);

  const handleMouseOver = (event: React.UIEvent<HTMLDivElement>): void => {
    const trackHorizontal = document.querySelector<HTMLElement>("#track-horizontal-id");
    const trackVertical = document.querySelector<HTMLElement>("#track-vertical-id");
    if (trackHorizontal) {
      trackHorizontal.style.opacity = "1";
    }
    if (trackVertical) {
      trackVertical.style.opacity = "1";
    }
  }
  // const handleMouseLeave = (event: React.UIEvent<HTMLDivElement>): void => {
  //   const trackHorizontal = document.querySelector<HTMLElement>("#track-horizontal-id");
  //   const trackVertical = document.querySelector<HTMLElement>("#track-vertical-id");
  //     if (trackHorizontal) {
  //       trackHorizontal.style.opacity = "0";
  //     }
  //     if (trackVertical) {
  //       trackVertical.style.opacity = "0";
  //     }
  // }
  useEffect(() => {
    const sideBarScroll = document.querySelector("#sidebar-crollbar");
    const trackHorizontal = document.querySelector<HTMLElement>("#track-horizontal-id");
    const trackVertical = document.querySelector<HTMLElement>("#track-vertical-id");
    const onMouseMove = (event: MouseEvent) => {
      if (trackHorizontal && trackVertical && !sideBarScroll?.contains(event.target as HTMLElement) && !trackVertical?.contains(event.target as HTMLElement)) {
        trackHorizontal.style.opacity = "0";
        trackVertical.style.opacity = "0";

      }
    }
    document.addEventListener('mousemove', onMouseMove)
    return () => {
      document.removeEventListener("mousemove", onMouseMove)
    }
  })
  const handleScroll = (event: React.UIEvent<HTMLDivElement>): void => {
  }


  const handleThumbMousedown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setScrollStartPosition(e.clientY);
    if (contentRef.current) setInitialScrollTop(contentRef.current.scrollTop);
    setIsDragging(true);
  }, []);

  const handleThumbMouseup = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isDragging) {
        setIsDragging(false);
      }
    },
    [isDragging]
  );
  const handleThumbMousemove = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isDragging && contentRef.current && scrollStartPosition) {
        const {
          scrollHeight: contentScrollHeight,
          offsetHeight: contentOffsetHeight,
        } = contentRef.current;

        // Subtract the current mouse y position from where you started to get the pixel difference in mouse position. Multiply by ratio of visible content height to thumb height to scale up the difference for content scrolling.
        const deltaY =
          (e.clientY - scrollStartPosition) *
          (contentOffsetHeight / thumbHeight);
        const newScrollTop = Math.min(
          initialScrollTop + deltaY,
          contentScrollHeight - contentOffsetHeight
        );
        contentRef.current.scrollTop = newScrollTop;
      }
    },
    [isDragging, scrollStartPosition, thumbHeight]
  );

  // Listen for mouse events to handle scrolling by dragging the thumb
  useEffect(() => {
    document.addEventListener('mousemove', handleThumbMousemove);
    document.addEventListener('mouseup', handleThumbMouseup);
    document.addEventListener('mouseleave', handleThumbMouseup);
    return () => {
      document.removeEventListener('mousemove', handleThumbMousemove);
      document.removeEventListener('mouseup', handleThumbMouseup);
      document.removeEventListener('mouseleave', handleThumbMouseup);
    };
  }, [handleThumbMousemove, handleThumbMouseup]);
  return (
    <aside className={styles["sidebar"]}>
      <div className={styles["sidebar-wrapper"]}>
        <nav className={styles["navbar"]}>
          <div className={styles["navbar-brand"]}>
            <div className={styles["navbar-item"]}>
              <button className="btn" tabIndex={0}>
                <div className={styles.logo}></div>
              </button>
            </div>
          </div>
        </nav>
        <nav className={styles["navbar-main"]}>
          <ul className={styles["navbar-menu"]}>
            <li className={`${styles["navbar-item"]} sidebar-lib ${location.pathname==="/mymusic"?"is-active":""}`} onClick={()=>navigate("/mymusic")}>
              <a title='Cá nhân' >
                <FontAwesomeIcon icon={faAddressCard} style={SIDEBAR_MENU_ITEM} />
                <span>Cá nhân</span>
              </a>
            </li>
            <li className={`${styles["navbar-item"]} ${location.pathname==="/"?"is-active":""}`} onClick={()=>navigate("/")}>
              <a title="Khám phá">
                <FontAwesomeIcon icon={faRecordVinyl} style={SIDEBAR_MENU_ITEM} />
                <span>Khám phá</span>
              </a>
            </li>
            <li className={`${styles["navbar-item"]} ${location.pathname==="/zing-chart"?"is-active":""}`} onClick={()=>navigate("/zing-chart")}>
              <a title="#zingchart">
                <FontAwesomeIcon icon={faChartLine} style={SIDEBAR_MENU_ITEM} />
                <span>#zingchart</span>
              </a></li>
            <li className={`${styles["navbar-item"]} ${location.pathname==="/radio"?"is-active":""}`} onClick={()=>navigate("/radio")}>
              <a title="Radio">
                <FontAwesomeIcon icon={faPodcast} style={SIDEBAR_MENU_ITEM} />
                <span>Radio</span>
                <figure className={`${styles.tag} ${styles["is-48x48"]}`}>
                  <img src="https://zjs.zadn.vn/zmp3-desktop/dev/147506/static/media/live-tag.e25dd240.svg" alt="" />
                </figure>
              </a></li>
            <li className={`${styles["navbar-item"]} ${location.pathname?.split("/")[1]==="the-loai-nghe-si"?"is-active":""}`} onClick={()=>navigate("/the-loai-nghe-si/Viet-Nam/IWZ9Z08I.html")}>
              <a title="Theo dõi">
                <FontAwesomeIcon icon={faNoteSticky} style={SIDEBAR_MENU_ITEM} />
                <span>Theo dõi</span>
              </a></li>
          </ul>
        </nav>
        <div className={styles['sidebar-divide']}></div>
        <div className={styles['sub-navbar']} id="sidebar-sub-navbar" >
          <div className={`${styles["sidebar-scrollbar"]} ${isMark ? styles["is-mark"] : ""}`} id="sidebar-crollbar" onScroll={handleScroll}
            onMouseOver={handleMouseOver} ref={contentRef}>
            <nav className={`${styles["navbar"]} ${styles["navbar-main"]}`}>
              <ul className={styles["navbar-menu"]}>
                <li className={`${styles["navbar-item"]} ${location.pathname==="/moi-phat-hanh"?"is-active":""}`} onClick={()=>navigate("/moi-phat-hanh")}>
                  <a title="Nhạc mới">
                    <FontAwesomeIcon icon={faMusic} style={SIDEBAR_MENU_ITEM} />
                    <span>Nhạc mới</span>
                  </a>
                </li>
                <li className={`${styles["navbar-item"]} ${location.pathname==="/hub"?"is-active":""}`} onClick={()=>navigate("/hub")}>
                  <a title="Thể loại">
                    <FontAwesomeIcon icon={faIcons} style={SIDEBAR_MENU_ITEM} />
                    <span>Thể loại</span>
                  </a>
                </li>
                <li className={`${styles["navbar-item"]} ${location.pathname==="/top100"?"is-active":""}`} onClick={()=>navigate("/top100")}>
                  <a title="Top 100">
                    <FontAwesomeIcon icon={faStar} style={SIDEBAR_MENU_ITEM} />
                    <span>Top 100</span>
                  </a>
                </li>
                <li className={`${styles["navbar-item"]} ${location.pathname?.split("/")[1]==="the-loai-video"?"is-active":""}`} onClick={()=>navigate("/the-loai-video/Viet-Nam/IWZ9Z08I.html")}>
                  <a title="MV">
                    <FontAwesomeIcon icon={faTicket} style={SIDEBAR_MENU_ITEM} />
                    <span>MV</span>
                  </a></li>
              </ul>
            </nav>
            <div className={styles["vip-banner-sidebar"]}>
              <div className={styles.text}>Nghe nhạc không quảng cáo cùng kho nhạc VIP</div>
              <a className={`${styles.btn} is-medium is-ouline is-upper btn`} tabIndex={0} href="https://zingmp3.vn/vip?utm_source=desktop&amp;utm_campaign=VIP&amp;utm_medium=sidebar" target="_blank" rel="noreferrer">Nâng cấp VIP</a>
            </div>
            <nav className={`${styles["navbar"]} ${styles["navbar-my-music"]} ${styles["navbar-main"]} pt-15`}>
              <div className={`${styles["main-title"]} ${styles.title}`}>THƯ VIỆN
                {/* <ToolTip toolTipText='Chỉnh sủa'> */}
                <button className={`${styles["edit-btn"]} btn is-hover-circle`} tabIndex={0}>
                  <FontAwesomeIcon icon={faPen} style={{ fontSize: 16, color: "white" }} />
                </button>
                {/* </ToolTip> */}
              </div>
              <ul className={`${styles["navbar-menu"]} ${styles["library-personal"]}`}>
                <li className={styles["navbar-item"]}>
                  <a href='mymusic/library/song'>
                    <FontAwesomeIcon icon={faFileAudio} style={SIDEBAR_MENU_ITEM} />
                    <span>Bài hát</span>
                  </a>
                </li>
                <li className={styles["navbar-item"]}>
                  <a href='mymusic/library/playlist'>
                    <FontAwesomeIcon icon={faList} style={SIDEBAR_MENU_ITEM} />
                    <span>Playlist</span>
                  </a>
                </li>
                <li className={styles["navbar-item"]}>
                  <a href='mymusic/history'>
                    <FontAwesomeIcon icon={faClockRotateLeft} style={SIDEBAR_MENU_ITEM} />
                    <span>Gần đây</span>
                  </a>
                </li>
              </ul>
            </nav>
            <nav className={`${styles['navbar']} ${styles["navbar-my-playlist"]}`}>
              <ul className={`${styles["navbar-menu"]} ${styles["playlist-personal"]}`}></ul>
            </nav>
          </div>
          <div className={styles['track-horizontal']} style={{
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
          </div>
        </div>
        <div className={styles['add-playlist-sidebar']}>
          <button className={`${styles["btn-add-playlist"]} btn`} style={{ backgroundColor: "transparent" }} tabIndex={0}>
            <FontAwesomeIcon icon={faAdd} style={{ fontSize: 18, marginRight: 10, color: "var(--text-primary)", lineHeight: "66%", display: "inline-block" }} />
            <span>Tạo playlist mới</span>
          </button>
        </div>
        <button className={` ${styles["btn-expanded"]} btn`}tabIndex={0}>
          {/* 2 icon < & > */}
          </button>
      </div>
    </aside >
  )
}

export default SideBar