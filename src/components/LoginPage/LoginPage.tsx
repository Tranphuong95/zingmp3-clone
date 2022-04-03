import "./index.scss";
import React, { useState } from 'react'
import styles from "./login-page.module.scss";
import { LoginFormDataType, showFormType } from ".";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginPage: React.FC<{
    showForm: showFormType,
    data: LoginFormDataType,
    setShowForm: React.Dispatch<React.SetStateAction<showFormType>>,
    setLoginFormData: React.Dispatch<React.SetStateAction<LoginFormDataType>>

}> = ({ showForm, setShowForm, data, setLoginFormData }) => {
    const [showPassword, setShowPassword] = useState<boolean>(() => false);
    const handleChangeShowPassword = (val: boolean) => {
        setShowPassword(val)
    };
    const goSignupPage = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowForm({ login: false, signup: true, forgot: false })
    };
    const goForgotPage = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowForm({ login: false, signup: false, forgot: true })
    };
    const onHandleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const typeInput = e.target.type;
        setLoginFormData((data)=>({ ...data, [e.target.name]: typeInput === "checkbox" ? e.target.checked : e.target.value }))
    }
    const onLogin = (e: React.FormEvent) => {

    };
    console.log(data)
    return (
        <div className={`${styles["authfy-panel"]} ${styles["panel-login"]} text-center ${showForm.login ? "active" : ""}`} id="panel-login">
            <div className={styles["authfy-heading"]} >
                <h3 className={styles["authfy-title"]}>Đăng nhập bằng tài khoản zing</h3>
                <p className={styles["authfy-p"]}>Bạn chưa có tài khoản? <button className={`${styles["btn-panel__sigup"]} btn`} onClick={goSignupPage}>Đăng ký ngay.</button></p>
            </div>
            <div className={styles["row"]}>
                <form onSubmit={onLogin}>
                    <div className={styles["form-group"]}>
                        <input type="email" name="email" className={styles["form-control"]} value={data.email} placeholder='Địa chỉ email' onChange={onHandleChangeInput} />
                    </div>
                    <div className={styles["form-group"]}>
                        <div className={styles["pwdMask"]}>
                            <input type={!showPassword ? "password" : "text"}
                                name="password"
                                value={data.password}
                                className={styles["form-control"]}
                                placeholder='Nhập mật khẩu'
                                onChange={onHandleChangeInput} />
                            {!showPassword ? <FontAwesomeIcon icon={faEyeSlash} className={styles["pwd-toggle"]} onClick={() => handleChangeShowPassword(true)} />
                                : <FontAwesomeIcon icon={faEye} className={styles["pwd-toggle"]} onClick={() => handleChangeShowPassword(false)} />}
                        </div>
                    </div>
                    <div className={styles["remember-password"]}>
                        <div>
                            <label>
                                <input type="checkbox" name="remember" checked={data.remember} onChange={onHandleChangeInput} />
                                <span className={styles["text-label"]}>Nhớ đăng nhập</span>
                            </label>
                        </div>
                        <div>
                            <button type="submit" className={`${styles["btn-forgot__password"]} btn`} onClick={goForgotPage}>Quên mật khẩu?</button>
                        </div>
                    </div>
                    <div className={styles["form-group"]}>
                        <button className={`${styles["btn-signin"]} btn`}>Đăng nhập</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage