import "./index.scss";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './login-page.module.scss';
import image from './../../asset/images/ZingMP3logo.svg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import ReactLoading from 'react-loading';

import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import ForgotPage from "./ForgotPage";

export type showFormType = {
  login: boolean,
  signup: boolean,
  forgot: boolean
};
export type LoginFormDataType = {
  email: string,
  password: string,
  remember: boolean
};
export type SignupFormDataType = {
  userName: string,
  email: string,
  phoneNumber: number | string,
  password: string
}
export type forgotFormType = {
  email: string
}
const initialShowForm: showFormType = {
  login: true,
  signup: false,
  forgot: false
};
export const initialLoginFormData: LoginFormDataType = {
  email: "",
  password: "",
  remember: false
};
export const initialSignupFormData: SignupFormDataType = {
  userName: "",
  email: "",
  phoneNumber: "",
  password: ""
};
export const initialForgotFormData: forgotFormType = {
  email: ""
}
export interface SignUpErrorType{
  userName: boolean,
  email: boolean,
  phoneNumber: boolean,
  password: boolean,
}
export const initialSignUpError:SignUpErrorType={
  userName: true,
  email: true,
  phoneNumber: true,
  password: true,
};
export interface LoginErrorType{
  email: boolean,
  password: boolean
};
export const initialLoginError:LoginErrorType={
  email: true,
  password: true
};
export interface ForgotPasswordErrorType{
  email: boolean
};
export const initialForgotPasswordError: ForgotPasswordErrorType={
  email: true
};
export interface SignUpFocusType{
  userName: boolean,
  email: boolean,
  phoneNumber: boolean,
  password: boolean,
};
export interface ForgotPassFocusType{
  email: boolean
}
export interface LoginFocusType{
  email: boolean,
  password: boolean
};
export const initialSignUpFocus:SignUpFocusType={
  userName: false,
  email: false,
  phoneNumber: false,
  password: false,
};
export const initialLoginFocus:LoginFocusType={
  email: false,
  password: false
};
export const initialForgotPassFocus: ForgotPassFocusType={
  email: false
}
export 
const Auth = () => {
  const [showForm, setShowForm] = useState<showFormType>(()=>initialShowForm);
  const [loginFormData, setLoginFormData] = useState<LoginFormDataType>(()=>initialLoginFormData);
  const [signupFormData, setSignupFormData] = useState<SignupFormDataType>(()=>initialSignupFormData);
  const [forgotFormData, setForgotFormData] = useState<forgotFormType>(()=>initialForgotFormData);
  const [signUpError, setSignUpError]=useState<SignUpErrorType>(()=>initialSignUpError);
  const [loginError, setLoginError]=useState<LoginErrorType>(()=>initialLoginError)
  const [forgotPasswordError, setForgotPasswordError]=useState(()=>initialForgotPasswordError);   
  const [signUpFocus, setSignUpFocus]=useState<SignUpFocusType>(()=>initialSignUpFocus);
  const [loginFocus, setLoginFocus]=useState<LoginFocusType>(()=>initialLoginFocus);
  const [forgotPassFocus, setForgotPassFocus]=useState<ForgotPassFocusType>(()=>initialForgotPassFocus)
  const [loading, setLoading] = useState<boolean>(() => false);
  useEffect(() => {
    if (showForm.login) {
      setSignupFormData(initialSignupFormData);
      setForgotFormData(initialForgotFormData);
      setSignUpError(initialSignUpError);
      setForgotPasswordError(initialForgotPasswordError)
      setSignUpFocus(initialSignUpFocus);
      setForgotPassFocus(initialForgotPassFocus)
    }
    else if (showForm.signup) {
      setLoginFormData(initialLoginFormData);
      setForgotFormData(initialForgotFormData);
      setLoginError(initialLoginError);
      setForgotPasswordError(initialForgotPasswordError)
      setLoginFocus(initialLoginFocus);
      setForgotPassFocus(initialForgotPassFocus)
    }
    else {
      setLoginFormData(initialLoginFormData);
      setLoginError(initialLoginError);
      setLoginFocus(initialLoginFocus);
      setSignupFormData(initialSignupFormData);
      setSignUpError(initialSignUpError);
      setSignUpFocus(initialSignUpFocus);
    }
    return ()=>{
      setSignupFormData(initialSignupFormData);
      setSignUpError(initialSignUpError);
      setSignUpFocus(initialSignUpFocus);
      setLoginFormData(initialLoginFormData);
      setLoginError(initialLoginError);
      setLoginFocus(initialLoginFocus);
      setForgotFormData(initialForgotFormData);
      setForgotPasswordError(initialForgotPasswordError);
      setForgotPassFocus(initialForgotPassFocus)
    }
  }, [showForm])
  return (
    <div className={styles['container']}>
      <div className={styles["authfy-container"]}>
        <div className={styles['authfy-panel__left']}>
          <div className={styles["brand-col"]}>
            <div className={styles["headline"]}>
              <div className={styles["brand-logo"]}>
                <Link to="/">
                  <img src={image} alt="logo" width={200} />
                </Link>
              </div>
              <p>Đăng nhập bằng mạng xã hội</p>
              <div className={styles["social-buttons"]}>
                <button className={`${styles["btn-social"]} ${styles["face-btn"]} btn`}>
                  <FontAwesomeIcon icon={faFacebookF} className={styles["social-icon"]} />
                  <span className="hidden-xs hidden-sm">Đăng nhập bằng Facebook</span>
                </button>
                <button className={`${styles["btn-social"]} ${styles["twitter-btn"]} btn`}>
                  <FontAwesomeIcon icon={faTwitter} className={styles["social-icon"]} />
                  <span className="hidden-xs hidden-sm">Đăng nhập bằng Twitter</span>
                </button>
                <button className={`${styles["btn-social"]} ${styles["google-btn"]} btn`}>
                  <FontAwesomeIcon icon={faGooglePlusG} className={styles["social-icon"]} />
                  <span className="hidden-xs hidden-sm">Đăng nhập bằng Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles['authfy-panel__right']}>
          <div className={styles["authfy-login"]}>
            {/* panel login start */}
            <LoginPage showForm={showForm} setShowForm={setShowForm} data={loginFormData} 
            setLoginFormData={setLoginFormData} setLoading={setLoading} 
            errors={loginError} setLoginError={setLoginError}
            focus={loginFocus} setLoginFocus={setLoginFocus}
            />
            {/* panel signup start */}
            <SignupPage showForm={showForm} setShowForm={setShowForm} data={signupFormData} 
            setSignupFormData={setSignupFormData} setLoading={setLoading} 
            errors={signUpError} setSignUpError={setSignUpError}
            focus={signUpFocus} setSignUpFocus={setSignUpFocus}
            />
            {/* panel forgot start */}
            <ForgotPage showForm={showForm} setShowForm={setShowForm} data={forgotFormData} 
            setForgotFormData={setForgotFormData} setLoading={setLoading}
            errors={forgotPasswordError} setForgotPasswordError={setForgotPasswordError}
            focus={forgotPassFocus} setForgotPassFocus={setForgotPassFocus}
            />
          </div>
        </div>
      </div>
      {loading && <ReactLoading type={"spin"} color="green" className="loading" />}

    </div>
  )
}
export default Auth