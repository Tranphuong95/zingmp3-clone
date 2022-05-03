import "./index.scss";
import styles from "./login-page.module.scss";
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import * as EmailValidate from "email-validator";
import { toast } from "react-toastify";
import { initialSignUpFocus, showFormType, SignUpErrorType, SignUpFocusType, SignupFormDataType } from ".";
import { register } from "../../features/auth/auth";
import { useNavigate } from "react-router-dom";
import TokenService from "../../services/token.service";
import { SignUpErrorRoles } from "@/helper/roleError";
import Modal from "@/helper/modal/Modal";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const SignupPage: React.FC<{
    showForm: showFormType,
    data: SignupFormDataType,
    errors: SignUpErrorType,
    focus: SignUpFocusType,
    setShowForm: React.Dispatch<React.SetStateAction<showFormType>>,
    setSignupFormData: React.Dispatch<React.SetStateAction<SignupFormDataType>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setSignUpError: React.Dispatch<React.SetStateAction<SignUpErrorType>>
    setSignUpFocus: React.Dispatch<React.SetStateAction<SignUpFocusType>>
}> = ({ showForm, setShowForm, data, setSignupFormData, setLoading, errors, setSignUpError, focus, setSignUpFocus }) => {

    const [showPassword, setShowPassword] = useState<boolean>(() => false);
    const [open, setOpen]=useState<boolean>(()=>false)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleChangeShowPassword = (val: boolean) => {
        setShowPassword(val)
    };
    const handleError=(key: string, value:any, roles:any)=>{
        let result=true;
        if(key==="email"){
            result=!EmailValidate.validate(value);
        }
        else{
            result=!roles[key].test(value);
        }
        setSignUpError(state=>({...state, [key]: result}))
    }
    const goLoginPage = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowForm({ login: true, signup: false, forgot: false })
    };
    const onHandleChangeInput=(e:React.ChangeEvent<HTMLInputElement>)=>{
        handleError(e.target.name, e.target.value?.trim(), SignUpErrorRoles);
        setSignupFormData((data)=>({...data, [e.target.name]: e.target.name==="phoneNumber"? e.target.value? Number(e.target.value): e.target.value: e.target.value}))
    };
    const handleFocus=(key: keyof SignUpFocusType)=>{
        if(!focus[key]){
            setSignUpFocus((state)=>({...state, [key]: true}))
        }
    }
    const onSignup=async(e:React.FormEvent)=>{
        e.preventDefault();
        setSignUpFocus({email: true, password: true, phoneNumber: true, userName: true})
        const { userName, email, password, phoneNumber } = data;
        if(Object.values(errors).some(f=>f===true)) return ;
        setLoading(true);
        try {
            const isValidateEmail=EmailValidate.validate(email);
            if(!isValidateEmail) {
                setLoading(false);
                return toast.error("email cua ban khong dung dinh dang")
            }
            if (!userName || !email || !phoneNumber || typeof phoneNumber !== "number" || !password) return;
            const resultAction: any = await dispatch(register({ userName, email, phoneNumber, password }));
            console.log("resultAction::", resultAction)
            // if(resultAction && resultAction?.payload?.accessToken && resultAction?.payload?.accessToken=== TokenService.getLocalAccessToken()){
            //     navigate("/")
            // }
            if(resultAction.payload.status===200){
                setOpen(true);
            }
            setLoading(false);
            setSignUpFocus(initialSignUpFocus)
        } catch (error) {
            setLoading(false)
        }
    }
    return (
        <>
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
                         onFocus={()=>handleFocus("userName")}
                         />
                         {errors.userName && focus.userName && <div className="error-input">
                            <span>Tên người dùng không đúng định dạng</span>
                        </div>}
                    </div>
                    <div className={styles["form-group"]}>
                        <input type="email" 
                        name="email"
                        value={data.email} 
                        className={styles["form-control"]} 
                        placeholder='Địa chỉ email' 
                        onChange={onHandleChangeInput}
                        onFocus={()=>handleFocus("email")}
                        />
                        {errors.email && focus.email && <div className="error-input">
                            <span>Email không đúng định dạng</span>
                        </div>}
                    </div>
                    <div className={styles["form-group"]}>
                        <input type="number" 
                        value={data.phoneNumber}
                        name="phoneNumber" 
                        className={styles["form-control"]} 
                        placeholder='Số điện thoại' 
                        onChange={onHandleChangeInput}
                        onFocus={()=>handleFocus("phoneNumber")}
                        />
                        {errors.phoneNumber && focus.phoneNumber && <div className="error-input">
                            <span>Số điện thoại không đúng định dạng</span>
                        </div>}
                    </div>
                    <div className={styles["form-group"]}>
                        <div className={styles["pwdMask"]}>
                            <input type={!showPassword ? "password" : "text"} 
                            value={data.password}
                            name="password" 
                            className={styles["form-control"]}
                            placeholder='Nhập mật khẩu' 
                            onChange={onHandleChangeInput}
                            onFocus={()=>handleFocus("password")}
                             />
                            {!showPassword ? <FontAwesomeIcon icon={faEyeSlash as IconProp} className={styles["pwd-toggle"]} onClick={() => handleChangeShowPassword(true)} />
                                : <FontAwesomeIcon icon={faEye as IconProp} className={styles["pwd-toggle"]} onClick={() => handleChangeShowPassword(false)} />}
                        </div>
                        {errors.password && focus.password && <div className="error-input">
                            <span>Mật khẩu không đúng định dạng</span>
                        </div>}
                    </div>
                    <div className={styles["form-group"]}>
                        <button type="submit" className={`${styles["btn-signin"]} btn`}>Đăng ký</button>
                    </div>
                </form>
                <button className={`${styles["btn-panel__login"]} btn`} onClick={goLoginPage}>Bạn đã có tài khoản? Đăng nhập ngay</button>
            </div>
        </div>
            <Modal open={open} title={"Đăng ký thành công"} 
            content="Bạn đã đăng ký thành công. Vui lòng xác thực mail mà chúng tôi gửi đến hộp thư để hoàn thành đăng ký"
            onClose={setOpen} icon={<FontAwesomeIcon icon={faCircleCheck as IconProp} style={{color: "green", fontSize: "3rem"}}/>}
            navigate={navigate}
            isOkBtn={false}
            />
            </>

    )
}

export default SignupPage