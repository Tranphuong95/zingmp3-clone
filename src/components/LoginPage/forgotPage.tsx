import "./index.scss";
import React from 'react'
import styles from "./login-page.module.scss";
import { forgotFormType, ForgotPassFocusType, ForgotPasswordErrorType, initialForgotPassFocus, showFormType } from ".";
import axios from "axios";
import * as EmailValidate from "email-validator";

const ForgotPage:React.FC<{
    showForm: showFormType, 
    data: forgotFormType,
    errors: ForgotPasswordErrorType,
    focus: ForgotPassFocusType,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setShowForm: React.Dispatch<React.SetStateAction<showFormType>>,
    setForgotFormData: React.Dispatch<React.SetStateAction<forgotFormType>>,
    setForgotPasswordError: React.Dispatch<React.SetStateAction<ForgotPasswordErrorType>>,
    setForgotPassFocus: React.Dispatch<React.SetStateAction<ForgotPassFocusType>>
}> = ({showForm, setShowForm, data, setForgotFormData, setLoading, errors, focus, setForgotPasswordError, setForgotPassFocus}) => {
    const redirectUrl="http://localhost:3000"
    const goLoginPage=(e:React.MouseEvent)=>{
        e.preventDefault();
        setShowForm({login: true, signup: false, forgot: false})
    };
    const goSignupPage=(e:React.MouseEvent)=>{
        e.preventDefault();
        setShowForm({login: false, signup: true, forgot: false})
    };
    const handleError=(key: string, value: any)=>{
        const result=!EmailValidate.validate(value);
        setForgotPasswordError((errors)=>({...errors, [key]: result}))
    };
    const handleChangeInput=(e: React.ChangeEvent<HTMLInputElement>)=>{
        handleError(e.target.name, e.target.value)
        setForgotFormData((state)=>({...state, [e.target.name]: e.target.value}))
    };
    const handleFocus=(key: keyof ForgotPassFocusType)=>{
        if(!focus[key]){
            setForgotPassFocus((state)=>({...state, [key]: true}))
        }
    }
    const onForgotRequest=async(e: React.FormEvent)=>{
        e.preventDefault();
        setForgotPassFocus({email: true});
        try {
            setLoading(true);
            const rs=await axios.post("http://localhost:8080/api/auth/request-password-reset", {email: data.email, redirectUrl});
            setLoading(false);
            setForgotPassFocus(initialForgotPassFocus)
            console.log("data", data, rs)
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
       
    }
    return (
        <div className={`${styles["authfy-panel"]} ${styles["panel-forgot"]} ${showForm?.forgot?"active":""}`} id="panel-forgot">
            <div className={styles["authfy-heading"]} >
                <h3 className={styles["authfy-title"]}>Quên mật khẩu</h3>
                <p className={styles["authfy-p"]}>
                    Fill in your e-mail address below and we will send you an email with further instructions.
                </p>
            </div>
            <div className={styles["row"]}>
                <form onSubmit={onForgotRequest}>
                    <div className={styles["form-group"]}>
                        <input type="email" name="email" className={styles["form-control"]} placeholder='Địa chỉ email' 
                        onChange={handleChangeInput} onFocus={()=>handleFocus("email")}/>
                        {errors.email && focus.email && <div className="error-input">
                            <span>Email không đúng định dạng</span>
                        </div>}
                    </div>
                    <div className={styles["form-group"]}>
                        <button type="submit" className={`${styles["btn-signin"]} btn`}>Lấy lại mật khẩu</button>
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