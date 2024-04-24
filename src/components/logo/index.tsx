import "./style.css";
import { TiWeatherPartlySunny } from "react-icons/ti";

const Logo = () => {
  return (
    <div className="logo">
      <TiWeatherPartlySunny className="ico" size={48} />
      <h1>
        <span>WEATHER</span> APP
      </h1>
    </div>
  );
};

export default Logo;
