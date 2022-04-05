import "./index.scss";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './login-page.module.scss';
import image from './../../asset/images/ZingMP3logo.svg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import ReactLoading from 'react-loading';

import LoginPage from "./LoginPage";
import SignupPage from "./signupPage";
import ForgotPage from "./forgotPage";

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
const Auth = () => {
  const [showForm, setShowForm] = useState<showFormType>(() => initialShowForm);
  const [loginFormData, setLoginFormData] = useState<LoginFormDataType>(() => initialLoginFormData);
  const [signupFormData, setSignupFormData] = useState<SignupFormDataType>(() => initialSignupFormData);
  const [forgotFormData, setForgotFormData] = useState<forgotFormType>(() => initialForgotFormData);
  const [loading, setLoading] = useState<boolean>(() => false);
  useEffect(() => {
    if (showForm.login) {
      setSignupFormData(initialSignupFormData);
      setForgotFormData(initialForgotFormData)
    }
    else if (showForm.signup) {
      setLoginFormData(initialLoginFormData);
      setForgotFormData(initialForgotFormData)
    }
    else {
      setLoginFormData(initialLoginFormData);
      setSignupFormData(initialSignupFormData)
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
            <LoginPage showForm={showForm} setShowForm={setShowForm} data={loginFormData} setLoginFormData={setLoginFormData} setLoading={setLoading}/>
            {/* panel signup start */}
            <SignupPage showForm={showForm} setShowForm={setShowForm} data={signupFormData} setSignupFormData={setSignupFormData} setLoading={setLoading} />
            {/* panel forgot start */}
            <ForgotPage showForm={showForm} setShowForm={setShowForm} data={forgotFormData} setForgotFormData={setForgotFormData} />
          </div>
        </div>
      </div>
      {loading && <ReactLoading type={"spin"} color="green" className="loading" />}

    </div>
  )
}
export default Auth