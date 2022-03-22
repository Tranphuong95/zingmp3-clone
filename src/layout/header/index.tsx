import React, { useEffect, useState } from 'react';
import styles from '../../styles/layout/header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faArrowRightLong, faSearch, faShirt, faGem, faArrowUpFromBracket, faGear, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons'
import ToolTip from '../../until-component/tooltip';

const Header: React.FC = () => {
    const isLogin: boolean = false;

    const STYLE_RIGHT_HEADER_ICON = { fontSize: 16, color: "white" };
    const SUGGEST_LIST_ICON = { fontSize: 12, marginRight: 10, color: "var(--text-secondary)" };
    const [isFocus, setFocus] = useState(() => false);
    useEffect(() => {
        const formSearch = document.querySelector<HTMLElement>("#form-search");
        const documentClick = (e: MouseEvent) => {
            if (formSearch && !formSearch.contains(e.target as HTMLElement)) {
                setFocus(false)
            }
        }
        document.addEventListener("click", documentClick)
    })
    const handleFocus = () => {
        setFocus(true)
    }
    const handleLogin=()=>{
        window.open('https://id.zalo.me/account?continue=https%3A%2F%2Fzingmp3.vn%2F%3FisZaloPopupLogin%3D1','_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
    }
    return (
        <header className={styles.header}>
            <div className={styles.level}>
                <div className={styles["level-left"]}>
                    <button className={`${styles["btn-icon"]} btn`}>
                        <FontAwesomeIcon icon={faArrowLeftLong} color="white" style={{ marginRight: 20, fontSize: 24 }} tabIndex={0} />
                    </button>
                    <button className={`${styles["btn-icon"]} btn`}>
                        <FontAwesomeIcon icon={faArrowRightLong} color="white" style={{ marginRight: 20, fontSize: 24 }} tabIndex={0} />
                    </button>
                    <form className={styles.search} id="form-search">
                        <div className={isFocus ? `${styles["search-container"]} ${styles["is-collapse"]}` : styles["search-container"]}>
                            <button className={`${styles["btn-search"]} btn`} tabIndex={0}>
                                <FontAwesomeIcon icon={faSearch} color="white" style={{
                                    position: "absolute",
                                    fontSize: 20,
                                    cursor: "pointer",
                                    top: 10,
                                    left: 10,
                                    color: "var(--text-placeholder)"
                                }} />
                            </button>
                            <div className={styles[`input-wrapper`]}>
                                <input className={`${styles["form-control"]} ${styles["z-input-placeholder"]}`} placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV…" onFocus={handleFocus} />
                            </div>
                        </div>
                        {isFocus && (
                            <ul className={styles["suggest-list"]}>
                                <div className={styles['suggest-list__content']}>
                                    <div className={styles["suggest-title"]}>Đề xuất cho bạn</div>
                                    <li className={styles["suggest-item"]}>
                                        <FontAwesomeIcon icon={faArrowTrendUp} style={SUGGEST_LIST_ICON} />
                                        <div className={styles["is-oneline"]}>
                                            <span>chạy về khóc</span>
                                        </div>
                                    </li>
                                    <li className={styles["suggest-item"]}>
                                        <FontAwesomeIcon icon={faArrowTrendUp} style={SUGGEST_LIST_ICON} />
                                        <div className={styles["is-oneline"]}>
                                            <span>thay mọi cô gái</span>
                                        </div>
                                    </li>
                                    <li className={styles["suggest-item"]}>
                                        <FontAwesomeIcon icon={faArrowTrendUp} style={SUGGEST_LIST_ICON} />
                                        <div className={styles["is-oneline"]}>
                                            <span>đơn phương</span>
                                        </div>
                                    </li>
                                    <li className={styles["suggest-item"]}>
                                        <FontAwesomeIcon icon={faArrowTrendUp} style={SUGGEST_LIST_ICON} />
                                        <div className={styles["is-oneline"]}>
                                            <span>#zingchart</span>
                                        </div>
                                    </li>
                                    <li className={styles["suggest-item"]}>
                                        <FontAwesomeIcon icon={faArrowTrendUp} style={SUGGEST_LIST_ICON} />
                                        <div className={styles["is-oneline"]}>
                                            <span>zing choice</span>
                                        </div>
                                    </li>
                                </div>
                            </ul>
                        )}
                    </form>
                </div>
                <div className={styles["level-right"]}>
                    <div className={styles['setting-item']}>
                        <ToolTip toolTipText='Chủ đề'>
                            <button className={`${styles["tooltip-btn"]} btn`}>
                                <FontAwesomeIcon icon={faShirt} style={STYLE_RIGHT_HEADER_ICON} />
                            </button>
                        </ToolTip>
                    </div>
                    <a className={styles['setting-item']} href="https://zingmp3.vn/vip?utm_source=desktop&utm_campaign=VIP&utm_medium=icon-header" target={"_blank"} rel="noreferrer">
                        <ToolTip toolTipText='Nâng cấp VIP'>
                            <button className={`${styles["tooltip-btn"]} btn`}>
                                <FontAwesomeIcon icon={faGem} style={STYLE_RIGHT_HEADER_ICON} />
                            </button>
                        </ToolTip>
                    </a>
                    <input id="up-button" type="file" accept='audio/*' multiple style={{ display: "none" }} />
                    <label htmlFor='up-button'>
                        <div className={`${styles["setting-item"]} ${styles["btn-upload"]}`}>
                            <a tabIndex={0}>
                                <ToolTip toolTipText='Tải lên'>
                                    <div className={`${styles["tooltip-btn"]} btn`}>
                                        <FontAwesomeIcon icon={faArrowUpFromBracket} style={STYLE_RIGHT_HEADER_ICON} />
                                    </div>
                                </ToolTip>
                            </a>
                        </div>
                    </label>
                    <div className={styles["setting-item"]}>
                        <ToolTip toolTipText="Cài đặt">
                            <button className={`${styles["tooltip-btn"]} btn`} tabIndex={0}>
                                <FontAwesomeIcon icon={faGear} style={STYLE_RIGHT_HEADER_ICON} />
                            </button>
                        </ToolTip>
                    </div>
                    {isLogin ? (
                        <a href='/mymusic'>
                            <div className={styles["avatar-frame"]}>
                                <button className={`btn`} tabIndex={0}>
                                    <figure className={`${styles.image} is-38x38 is-rounded`}>
                                        <img src="https://s120-ava-talk.zadn.vn/9/0/2/8/0/120/841e540ce5fb31cbee4fcf9d4092bad5.jpg" alt="" />
                                    </figure>
                                </button>
                            </div>
                        </a>
                    ) : (
                        <div className={styles['login-container']}>
                            <button className={`btn`} tabIndex={0} onClick={handleLogin}>
                                <figure className={`${styles.image} is-38x38 is-rounded`}>
                                    <img src="https://s120-ava-talk.zadn.vn/9/0/2/8/0/120/841e540ce5fb31cbee4fcf9d4092bad5.jpg" alt="" />
                                </figure>
                            </button>
                        </div>
                    )
                    }

                </div>
            </div>
        </header>
    )
}

export default Header