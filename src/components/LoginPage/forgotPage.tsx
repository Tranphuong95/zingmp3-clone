import "./index.scss";
import React from 'react'
import styles from "./login-page.module.scss";
import { forgotFormType, showFormType } from ".";
const ForgotPage:React.FC<{
    showForm: showFormType, 
    data: forgotFormType,
    setShowForm: React.Dispatch<React.SetStateAction<showFormType>>,
    setForgotFormData: React.Dispatch<React.SetStateAction<forgotFormType>>
}> = ({showForm, setShowForm}) => {
    const goLoginPage=(e:React.MouseEvent)=>{
        e.preventDefault();
        setShowForm({login: true, signup: false, forgot: false})
    };
    const goSignupPage=(e:React.MouseEvent)=>{
        e.preventDefault();
        setShowForm({login: false, signup: true, forgot: false})
    };
    return (
        <div className={`${styles["authfy-panel"]} ${styles["panel-forgot"]} ${showForm?.forgot?"active":""}`} id="panel-forgot">
            <div className={styles["authfy-heading"]} >
                <h3 className={styles["authfy-title"]}>Quên mật khẩu</h3>
                <p className={styles["authfy-p"]}>
                    Fill in your e-mail address below and we will send you an email with further instructions.
                </p>
            </div>
            <div className={styles["row"]}>
                <form>
                    <div className={styles["form-group"]}>
                        <input type="email" name="email" className={styles["form-control"]} placeholder='Địa chỉ email' />
                    </div>
                    <div className={styles["form-group"]}>
                        <button className={`${styles["btn-signin"]} btn`}>Lấy lại mật khẩu</button>
                    </div> 
                    <div className={styles["form-group"]}>
                        <button className={`${styles["btn-panel__login"]} btn`} onClick={goLoginPage}>Quay về trang đăng nhập</button>
                    </div>
                    <div className={styles["form-group"]}>
                        <button className={`${styles["btn-panel__sigup"]} btn`} onClick={goSignupPage}>Chưa có tài khoản?</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPage