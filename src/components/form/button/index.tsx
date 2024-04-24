import "./style.css";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ className="", ...props }) => {
  return <button className={`btn ${className}`} {...props} />;
};

export default Button;
