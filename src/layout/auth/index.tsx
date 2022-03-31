import "./index.scss";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactLoading from 'react-loading';
import { login, register } from "./../../features/auth/auth";

interface formLogin {
    email: string,
    password: string
};
interface formRegister {
    userName: string,
    email: string,
    phoneNumber: number | null,
    password: string,
};

const Auth: React.FC<{ open: boolean, onClose: any }> = ({ open, onClose }) => {
    const initialStateLogin = {
        email: "",
        password: ""
    };
    const initialStateRegister = {
        userName: "",
        email: "",
        phoneNumber: null,
        password: ""
    };
    const [loading, setLoading] = useState<boolean>(() => false)
    const [isSignInForm, setSignInForm] = useState<boolean>(() => true);
    const [loginValues, setLoginValues] = useState<formLogin>(() => initialStateLogin);
    const [registerValues, setRegisterValues] = useState<formRegister>(() => initialStateRegister);

    const dispatch = useDispatch();

    useEffect(() => {
        if(!open){
            setSignInForm(true);
        }
    }, [open])
    const handleChangeForm = (e: React.MouseEvent, val: boolean) => {
        // const chooseAuth=document.querySelector<HTMLElement>(".choose-auth");
        // const buttonList=chooseAuth?.querySelectorAll<HTMLElement>("button");
        // console.log(chooseAuth, buttonList)
        // buttonList && buttonList.forEach((button)=>{
        //     button.classList.remove("active")
        //     // if(button.contains(e.target as HTMLElement)){
        //     //     button.classList.add("active")
        //     // }
        //     const target=e.target as HTMLElement;
        //     target.classList.add("active")
        // })
        const formSignIn = document.querySelector<HTMLElement>(".sign-in");
        const formRegister = document.querySelector<HTMLElement>(".register");
        if (val && isSignInForm !== val) {
            if (formSignIn) {
                formSignIn.style.transform = "";
                formSignIn.style.transition = "transform 0.4s"
                // formSignIn.style.transform="translate( calc(100% + 20px))";
            }
            if (formRegister) {
                formRegister.style.transform = "translateX( calc(100% + 20px))";
                formRegister.style.transition = "transform 0.4s";

            }
        }
        if (!val && isSignInForm !== val) {
            if (formSignIn) {
                formSignIn.style.transform = "translateX( calc(-100% - 20px))";
                formSignIn.style.transition = "transform 0.4s";
            }
            if (formRegister) {
                formRegister.style.transform = "translateX( calc(-100% - 20px))";
                formRegister.style.transition = "transform 0.4s";
            }
        }
        setSignInForm(val);
        setLoginValues(initialStateLogin);
        setRegisterValues(initialStateRegister);
    }
    const handleCloseFormAuth = (e: React.MouseEvent) => {
        if (typeof onClose === "function") {
            onClose(false)
        }
    }
    const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        const elm = e.target;
        const name = elm.name;
        const value = elm.value;
        setLoginValues(loginValue => ({ ...loginValue, [name]: value }))
    };
    const handleChangeRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
        const elm = e.target;
        const name = elm.name;
        const value = elm.value;
        setRegisterValues(registerValue => ({ ...registerValue, [name]: value }))
    }
    const handleLogin = async (e: React.MouseEvent) => {
        e.preventDefault();
        const { email, password } = loginValues;
        if (!email || !password) return;
        setLoading(true);
        try {
            const resultAction: any = await dispatch(login({ email, password }));
            if (resultAction && resultAction?.payload?.user?.accessToken) {
                onClose(false);
            };
            setLoginValues(initialStateLogin);
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }

    };
    const handleRegister = async (e:React.FormEvent) => {
        e.preventDefault();
        const { userName, email, password } = registerValues;
        const strPhoneNumber = registerValues.phoneNumber;
        const phoneNumber = Number(strPhoneNumber);
        if (!userName || !email || !phoneNumber || typeof phoneNumber !== "number" || !password) return;
        setLoading(true);
        try {
            const resultAction: any = await dispatch(register({ userName, email, phoneNumber, password }));
            console.log(resultAction)
            if (resultAction && resultAction?.payload?.accessToken) {
                onClose(false);
            };
            setRegisterValues(initialStateRegister)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    };
    if (!open) {
        return null
    }
    return (
        <div className="auth-container active">
            <button className='form-close btn' onClick={handleCloseFormAuth}>
                <FontAwesomeIcon icon={faXmark} className="icon-form__close" />
            </button>
            <h3>{isSignInForm ? "Đăng nhập" : "Đăng ký tài khoản"}</h3>
            <div className='choose-auth'>
                <button className={isSignInForm ? "btn active" : "btn"} onClick={(e) => handleChangeForm(e, true)}>Đăng nhập</button>
                <button className={!isSignInForm ? "btn active" : "btn"} onClick={(e) => handleChangeForm(e, false)}>Đăng ký</button>
            </div>
            <div className='form-auth-container'>
                <form className='sign-in'>
                    <div className='input-group'>
                        {/* <label>
                        Email
                    </label> */}
                        <input type="email" name="email" placeholder='Nhập email' onChange={handleChangeLogin} value={loginValues.email} />
                    </div>
                    <div className='input-group'>
                        {/* <label>
                        Mật khẩu
                    </label> */}
                        <input type="password" name="password" placeholder='Nhập mật khẩu của bạn' onChange={handleChangeLogin} value={loginValues.password} />
                    </div>
                    <div className='button-auth'>
                        <button className='btn btn-auth' onClick={handleLogin}>Đăng nhập</button>
                    </div>
                </form>
                <form className='register' onSubmit={handleRegister}>
                    <div className='input-group'>
                        {/* <label>
                        Tên
                    </label> */}
                        <input type="text" placeholder='Nhập tên của bạn' name="userName" onChange={handleChangeRegister} />
                    </div>
                    <div className='input-group'>
                        {/* <label>
                        Email
                    </label> */}
                        <input type="email" placeholder='Nhập email của bạn' name="email" onChange={handleChangeRegister} />
                    </div>
                    <div className='input-group'>
                        {/* <label>
                        Số điện thoại
                    </label> */}
                        <input type="number" placeholder='Nhập số điện thoại của bạn' name="phoneNumber" onChange={handleChangeRegister} />
                    </div>
                    <div className='input-group'>
                        {/* <label>
                        Mật khẩu
                    </label> */}
                        <input type="password" placeholder='Nhập mật khẩu' name="password" onChange={handleChangeRegister} />
                    </div>
                    <div className='input-group'>
                        {/* <label>
                        Mật khẩu xác minh
                    </label> */}
                        <input type="password" placeholder='Nhập mật khẩu xác minh' name="validatePassword" onChange={handleChangeRegister} />
                    </div>
                    <div className='button-auth'>
                        <button className='btn btn-auth'>Đăng ký</button>
                    </div>
                </form>
            </div>

            {/* loading */}
            {loading && <ReactLoading type={"spin"} color="#fff" className="loading" />}
        </div>
    )
}

export default Auth;