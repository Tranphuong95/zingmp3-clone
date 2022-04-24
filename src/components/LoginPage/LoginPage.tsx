import "./index.scss";
import React, { useState } from 'react'
import styles from "./login-page.module.scss";
import { LoginErrorType, LoginFocusType, LoginFormDataType, showFormType, initialLoginFocus } from ".";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import * as EmailValidate from "email-validator"
import { login } from "@/features/auth/auth";
import { useNavigate } from "react-router-dom";
import TokenService from "@/services/token.service";

import { LoginErrorRoles as roles} from "@/helper/roleError";

const LoginPage: React.FC<{
    showForm: showFormType,
    data: LoginFormDataType,
    errors: LoginErrorType,
    focus: LoginFocusType,
    setShowForm: React.Dispatch<React.SetStateAction<showFormType>>,
    setLoginFormData: React.Dispatch<React.SetStateAction<LoginFormDataType>>
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setLoginError: React.Dispatch<React.SetStateAction<LoginErrorType>>
    setLoginFocus: React.Dispatch<React.SetStateAction<LoginFocusType>>
}> = ({ showForm, setShowForm, data, setLoginFormData, setLoading, errors, setLoginError, focus, setLoginFocus }) => {
    const [showPassword, setShowPassword] = useState<boolean>(() => false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    
    const handleChangeShowPassword = (val: boolean) => {
        setShowPassword(val)
    };
    const handleError=(key: string, value:any, roles:any)=>{
        let result=true;
        if(key==="remember") return;
        else if(key==="email"){
            result=!EmailValidate.validate(value);
        }
        else{
            result=!roles[key].test(value);
        }
        setLoginError(state=>({...state, [key]: result}))
    }
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
        handleError(e.target.name, e.target.value, roles)
        setLoginFormData((data)=>({ ...data, [e.target.name]: typeInput === "checkbox" ? e.target.checked : e.target.value }))
    };
    const handleFocus=(key: keyof LoginFocusType)=>{
        if(!focus[key]){
            setLoginFocus((state)=>({...state, [key]: true}))
        }
    }
    const onLogin = async(e: React.FormEvent) => {
        e.preventDefault();
        setLoginFocus({email: true, password:true  });
        const {email, password}=data; 
        if(Object.values(errors).some(f=>f===true)) return ;
        setLoading(true);
        try {
            if(email && password ){
                const resultAction:any= await dispatch(login(data));
                if(resultAction && resultAction?.payload?.user?.accessToken === TokenService.getLocalAccessToken()){
                    navigate("/")
                };
            }
            setLoading(false)
            setLoginFocus(initialLoginFocus);
        } catch (error) {
            setLoading(false)
        }
    };
    return (
        <div className={`${styles["authfy-panel"]} ${styles["panel-login"]} text-center ${showForm.login ? "active" : ""}`} id="panel-login">
            <div className={styles["authfy-heading"]} >
                <h3 className={styles["authfy-title"]}>Đăng nhập bằng tài khoản zing</h3>
                <p className={styles["authfy-p"]}>Bạn chưa có tài khoản? <button className={`${styles["btn-panel__sigup"]} btn`} onClick={goSignupPage}>Đăng ký ngay.</button></p>
            </div>
            <div className={styles["row"]}>
                <form onSubmit={onLogin}>
                    <div className={styles["form-group"]}>
                        <input type="email" name="email" className={styles["form-control"]} value={data.email} placeholder='Địa chỉ email' 
                        onChange={onHandleChangeInput} onFocus={()=>handleFocus("email")}/>
                        {errors.email && focus.email && <div className="error-input">
                            <span>Email không đúng định dạng</span>
                        </div>}
                    </div>
                    <div className={styles["form-group"]}>
                        <div className={styles["pwdMask"]}>
                            <input type={!showPassword ? "password" : "text"}
                                name="password"
                                value={data.password}
                                className={styles["form-control"]}
                                placeholder='Nhập mật khẩu'
                                onChange={onHandleChangeInput}
                                onFocus={()=>handleFocus("password")}
                                />
                            {!showPassword ? <FontAwesomeIcon icon={faEyeSlash} className={styles["pwd-toggle"]} onClick={() => handleChangeShowPassword(true)} />
                                : <FontAwesomeIcon icon={faEye} className={styles["pwd-toggle"]} onClick={() => handleChangeShowPassword(false)} />}
                        </div>
                        {errors.password && focus.password && <div className="error-input">
                            <span>Mật khẩu không đúng định dạng</span>
                        </div>}
                    </div>
                    <div className={styles["remember-password"]}>
                        <div>
                            <label>
                                <input type="checkbox" name="remember" checked={data.remember} onChange={onHandleChangeInput} />
                                <span className={styles["text-label"]}>Nhớ đăng nhập</span>
                            </label>
                        </div>
                        <div>
                            <button className={`${styles["btn-forgot__password"]} btn`} onClick={goForgotPage}>Quên mật khẩu?</button>
                        </div>
                    </div>
                    <div className={styles["form-group"]}>
                        <button type="submit" className={`${styles["btn-signin"]} btn`}>Đăng nhập</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage