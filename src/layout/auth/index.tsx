import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import "./index.scss";
const Auth = () => {
    const [isSignInForm, setSignInForm] = useState<boolean>(true);
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
        const formSignIn=document.querySelector<HTMLElement>(".sign-in");
        const formRegister=document.querySelector<HTMLElement>(".register");
        console.log(formSignIn);
        if(val && isSignInForm!==val){
            if(formSignIn){
                console.log('1111')
                formSignIn.style.transform="";
                formSignIn.style.transition="transform 0.4s"
                // formSignIn.style.transform="translate( calc(100% + 20px))";
            }
            if(formRegister){
                formRegister.style.transform="translateX( calc(100% + 20px))";
                formRegister.style.transition="transform 0.4s";

            }
        }
        if(!val && isSignInForm!==val){
            if(formSignIn){
                formSignIn.style.transform="translateX( calc(-100% - 20px))";
                formSignIn.style.transition="transform 0.4s";
            }
            if(formRegister){
                formRegister.style.transform="translateX( calc(-100% - 20px))";
                formRegister.style.transition="transform 0.4s";
            }
        }
        setSignInForm(val)
    }
    const handleCloseFormAuth=(e:React.MouseEvent)=>{
        //use redux toolkit
    }
    return (
        <div className="auth-container active">
            <button className='form-close btn' onClick={handleCloseFormAuth}>
                <FontAwesomeIcon icon={faXmark} className="icon-form__close"/>
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
                    <input type="email" placeholder='Nhập email' />
                </div>
                <div className='input-group'>
                    {/* <label>
                        Mật khẩu
                    </label> */}
                    <input type="password" placeholder='Nhập mật khẩu của bạn' />
                </div>
                <div>
                    <button className='btn'>Đăng nhập</button>
                </div>
            </form>
            <form className='register'>
                <div className='input-group'>
                    {/* <label>
                        Tên
                    </label> */}
                    <input type="text" placeholder='Nhập tên của bạn' />
                </div>
                <div className='input-group'>
                    {/* <label>
                        Email
                    </label> */}
                    <input type="email" placeholder='Nhập email của bạn' />
                </div>
                <div className='input-group'>
                    {/* <label>
                        Số điện thoại
                    </label> */}
                    <input type="text" placeholder='Nhập số điện thoại của bạn' />
                </div>
                <div className='input-group'>
                    {/* <label>
                        Mật khẩu
                    </label> */}
                    <input type="password" placeholder='Nhập mật khẩu' />
                </div>
                <div className='input-group'>
                    {/* <label>
                        Mật khẩu xác minh
                    </label> */}
                    <input type="password" placeholder='Nhập mật khẩu xác minh' />
                </div>
            </form>
            </div>
            
        </div>
    )
}

export default Auth