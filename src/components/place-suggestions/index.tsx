import "./style.css";
import React from "react";
import { IoIosTrendingUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface PlaceSuggestionProps {
  text: string;
}

const PlaceSuggestion: React.FC<PlaceSuggestionProps> = ({ text }) => {
  const navigate = useNavigate();
  return (
    <div
      className="place-suggestion"
      onClick={() => navigate(`?search=${encodeURIComponent(text)}`)}
    >
      <div>
        <IoIosTrendingUp />
      </div>
      <div>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default PlaceSuggestion;
