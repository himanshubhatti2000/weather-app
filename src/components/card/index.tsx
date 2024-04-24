import "./style.css";
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
const Card: React.FC<CardProps> = ({ className = "", ...props }) => {
  return <div className={`card ${className}`} {...props} />;
};

export default Card;
