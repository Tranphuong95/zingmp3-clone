export const SignUpErrorRoles={
    userName: /^[A-Z][a-z0-9_-]{2,200}$/g,
    phoneNumber: /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/,
    password: /^.*(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!#$%&?@_-]).*$/
}
export const LoginErrorRoles={
    password: /^.*(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!#$%&?@_-]).*$/
}