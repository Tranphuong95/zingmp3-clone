import "./index.scss";
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import styles from "./login-page.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { showFormType, SignupFormDataType } from ".";
import { register } from "./../../features/auth/auth";
import { useNavigate } from "react-router-dom";
import TokenService from "./../../services/token.service";
const SignupPage: React.FC<{
    showForm: showFormType,
    data: SignupFormDataType,
    setShowForm: React.Dispatch<React.SetStateAction<showFormType>>,
    setSignupFormData: React.Dispatch<React.SetStateAction<SignupFormDataType>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ showForm, setShowForm, data, setSignupFormData, setLoading }) => {

    const [showPassword, setShowPassword] = useState<boolean>(() => false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
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
    const onSignup=async(e:React.FormEvent)=>{
        e.preventDefault();
        setLoading(true);
        try {
            const { userName, email, password, phoneNumber } = data;
            if (!userName || !email || !phoneNumber || typeof phoneNumber !== "number" || !password) return;
            const resultAction: any = await dispatch(register({ userName, email, phoneNumber, password }));
            console.log("resultAction", resultAction)
            // if (resultAction && resultAction?.payload?.accessToken) {
            //     navigate("/")
            // };
            if(resultAction && resultAction?.payload?.accessToken && resultAction?.payload?.accessToken=== TokenService.getLocalAccessToken()){
                navigate("/")
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    console.log("signupData", data)
    return (
        <div className={`${styles["authfy-panel"]} ${styles["panel-signup"]} text-center ${showForm?.signup ? "active" : ""}`} id="panel-signup">
            <div className={styles["authfy-heading"]} >
                <h3 className={styles["authfy-title"]}>Đăng ký tài khoản zing</h3>
            </div>
            <div className={styles["row"]}>
                <form onSubmit={onSignup}>
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
                        <button type="submit" className={`${styles["btn-signin"]} btn`}>Đăng ký</button>
                    </div>
                </form>
                <button className={`${styles["btn-panel__login"]} btn`} onClick={goLoginPage}>Bạn đã có tài khoản? Đăng nhập ngay</button>
            </div>
        </div>

    )
}

export default SignupPage