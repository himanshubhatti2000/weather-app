import React from "react";

interface ErrorProps {
  text?: string;
}
const Error: React.FC<ErrorProps> = ({ text = "Something went wrong!" }) => {
  return <div>{text}</div>;
};

export default Error;
