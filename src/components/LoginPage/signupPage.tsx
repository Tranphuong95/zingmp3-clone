import "./index.scss";
import React, { useState } from 'react'
import styles from "./login-page.module.scss";
import { showFormType, SignupFormDataType } from ".";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const SignupPage: React.FC<{
    showForm: showFormType,
    data: SignupFormDataType,
    setShowForm: React.Dispatch<React.SetStateAction<showFormType>>,
    setSignupFormData: React.Dispatch<React.SetStateAction<SignupFormDataType>>
}> = ({ showForm, setShowForm, data, setSignupFormData }) => {
    const [showPassword, setShowPassword] = useState<boolean>(() => false);
    const handleChangeShowPassword = (val: boolean) => {
        setShowPassword(val)
    };
    const goLoginPage = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowForm({ login: true, signup: false, forgot: false })
    };
    const onHandleChangeInput=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setSignupFormData((data)=>({...data, [e.target.name]: e.target.name==="phoneNumber"? e.target.value? Number(e.target.value): e.target.value: e.target.value}))
    };
    console.log("signupData", data)
    return (
        <div className={`${styles["authfy-panel"]} ${styles["panel-signup"]} text-center ${showForm?.signup ? "active" : ""}`} id="panel-signup">
            <div className={styles["authfy-heading"]} >
                <h3 className={styles["authfy-title"]}>Đăng ký tài khoản zing</h3>
            </div>
            <div className={styles["row"]}>
                <form>
                    <div className={styles["form-group"]}>
                        <input type="text" name="userName" 
                        value={data.userName}
                         className={styles["form-control"]} 
                         placeholder='Tên người dùng'
                         onChange={onHandleChangeInput}
                         />
                    </div>
                    <div className={styles["form-group"]}>
                        <input type="email" 
                        name="email"
                        value={data.email} 
                        className={styles["form-control"]} 
                        placeholder='Địa chỉ email' 
                        onChange={onHandleChangeInput}
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <input type="number" 
                        value={data.phoneNumber}
                        name="phoneNumber" 
                        className={styles["form-control"]} 
                        placeholder='Số điện thoại' 
                        onChange={onHandleChangeInput}
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <div className={styles["pwdMask"]}>
                            <input type={!showPassword ? "password" : "text"} 
                            value={data.password}
                            name="password" 
                            className={styles["form-control"]}
                             placeholder='Nhập mật khẩu' 
                         onChange={onHandleChangeInput}
                             />
                            {!showPassword ? <FontAwesomeIcon icon={faEyeSlash} className={styles["pwd-toggle"]} onClick={() => handleChangeShowPassword(true)} />
                                : <FontAwesomeIcon icon={faEye} className={styles["pwd-toggle"]} onClick={() => handleChangeShowPassword(false)} />}
                        </div>
                    </div>
                    <div className={styles["form-group"]}>
                        <button className={`${styles["btn-signin"]} btn`}>Đăng ký</button>
                    </div>
                </form>
                <button className={`${styles["btn-panel__login"]} btn`} onClick={goLoginPage}>Bạn đã có tài khoản? Đăng nhập ngay</button>
            </div>
        </div>

    )
}

export default SignupPage