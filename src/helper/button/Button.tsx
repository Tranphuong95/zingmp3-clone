import React from 'react';
const defaultArrayClass=["btn"]
export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, React.AriaAttributes  {}
const Button:React.FC<ButtonProps> = (props) => {
    const {children, className, ...rest}=props;
    const combineClassName=Array.from(new Set(className?.split(" ").concat(defaultArrayClass))).join(" ");
  return (
    <button className={combineClassName} {...rest}>
        {children}
    </button>
  )
}
Button.defaultProps={
    className: defaultArrayClass.join(" "),
    type: "button",
    tabIndex: 0

}
export default Button