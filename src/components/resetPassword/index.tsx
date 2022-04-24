import React, { useState } from 'react';
import Button from '@/helper/button/Button';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "./index.module.scss";
import { LoginErrorRoles as roles } from "@/helper/roleError";
import { useParams } from 'react-router-dom';
import axios from 'axios';
export interface ResetPasswordInterface {
    password: string,
    verifyPassword: string
}
export const initialResetPassword = {
    password: "",
    verifyPassword: ""
};
export interface showPasswordInterface {
    password: boolean,
    verifyPassword: boolean
}
export const initialShowPassword: showPasswordInterface = {
    password: false,
    verifyPassword: false
}
export interface ResetPasswordFocusInterface {
    password: boolean,
    verifyPassword: boolean
};
export const initialResetPasswordFocus: ResetPasswordFocusInterface = {
    password: false,
    verifyPassword: false
};
export interface errorsResetPasswordType {
    password: boolean,
    verifyPassword: boolean
}
export const initialErrorsResetPassword: errorsResetPasswordType = {
    password: true,
    verifyPassword: true
}
const ResetPassword: React.FC = () => {
    const [data, setData] = useState<ResetPasswordInterface>(() => initialResetPassword);
    const [showPassword, setShowPassword] = useState<showPasswordInterface>(() => initialShowPassword);
    const [focus, setFocus] = useState<ResetPasswordFocusInterface>(() => initialResetPasswordFocus);
    const [errors, setErrors] = useState<errorsResetPasswordType>(() => initialErrorsResetPassword);

    const { userId, resetString } = useParams();

    const handleChangeShowPassword = (key: string, val: boolean) => {
        setShowPassword((showPassword) => ({ ...showPassword, [key]: val }))
    };
    const handleError = (key: string, val: any, role: any) => {
        const result = !role.test(val);
        setErrors((errors) => ({ ...errors, [key]: result }))
    }
    const onHandleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleError(e.target.name, e.target.value, roles.password)
        setData((state) => ({ ...state, [e.target.name]: e.target.value }))
    };
    const handleFocus = (key: keyof ResetPasswordFocusInterface) => {
        if (!focus[key]) {
            setFocus((state) => ({ ...state, [key]: true }))
        }
    };
    const onResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const rs = await axios.post("http://localhost:8080/api/auth/resetpassword", { newPassword: data.password, resetString, userId });
            console.log("resss", rs)
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className={styles['rs-password']}>
            <div className={styles["container"]}>
                <h3 className={styles['title']}>Làm mới mật khẩu</h3>
                <form onSubmit={onResetPassword}>
                    <div className={styles["form-group"]}>
                        <div className={styles["pwdMask"]}>
                            <input type={!showPassword.password ? "password" : "text"}
                                name="password"
                                value={data.password}
                                className={styles["form-control"]}
                                placeholder='Nhập mật khẩu'
                                onChange={onHandleChangeInput}
                                onFocus={() => handleFocus("password")}
                            />
                            {!showPassword.password ? <FontAwesomeIcon icon={faEyeSlash} className={styles["pwd-toggle"]} onClick={() => handleChangeShowPassword("password", true)} />
                                : <FontAwesomeIcon icon={faEye} className={styles["pwd-toggle"]} onClick={() => handleChangeShowPassword("password", false)} />}
                        </div>
                        {errors.password && focus.password && <div className="error-input">
                            <span>Mật khẩu không đúng định dạng</span>
                        </div>}
                    </div>
                    <div className={styles["form-group"]}>
                        <div className={styles["pwdMask"]}>
                            <input type={!showPassword.verifyPassword ? "password" : "text"}
                                name="verifyPassword"
                                value={data.verifyPassword}
                                className={styles["form-control"]}
                                placeholder='Nhập mật khẩu'
                                onChange={onHandleChangeInput}
                                onFocus={() => handleFocus("verifyPassword")}
                            />
                            {!showPassword.verifyPassword ? <FontAwesomeIcon icon={faEyeSlash} className={styles["pwd-toggle"]} onClick={() => handleChangeShowPassword("verifyPassword", true)} />
                                : <FontAwesomeIcon icon={faEye} className={styles["pwd-toggle"]} onClick={() => handleChangeShowPassword("verifyPassword", false)} />}
                        </div>
                        {errors.verifyPassword && focus.verifyPassword && <div className="error-input">
                            <span>Mật khẩu không đúng định dạng</span>
                        </div>}
                    </div>
                    <Button type="submit" className={styles['btn-reset-password']} >Lam moi mat khau</Button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword