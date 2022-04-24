import React from 'react';
import styles from "./modal.module.scss";

const Modal = ({ title, content, open, onClose, onOK, icon, isOkBtn, isCancelBtn, navigate }: {
  title: string, content: string, open: boolean, icon: any,
  onClose: React.Dispatch<React.SetStateAction<boolean>>, onOK?: () => void, isOkBtn: boolean, isCancelBtn: boolean,
  navigate: any
}) => {
  const handleClose = () => {
    onClose(false);
    // navigate("/login");
  }
  if (!open) return null;
  return (
    <div className={styles['md-container']}>
      <div className={styles['modal']}>
        {icon &&
          <div className={styles["md-icon"]}>
            {icon}
          </div>
        }
        <div className={styles['md-title']}>
          <h2>{title}</h2>
        </div>
        <div className={styles["md-content"]}>
          {content}
        </div>
        <div className={styles["md-btn"]}>
          {isOkBtn && <button className={`${styles["md-ok"]} btn`}>OK</button>}
          {isCancelBtn && <button className={`${styles["md-cancel"]} btn`} onClick={handleClose}>Cancel</button>}
        </div>
      </div>
    </div>
  )
}
Modal.defaultProps = {
  open: false,
  isOkBtn: true,
  isCancelBtn: true
}
export default Modal