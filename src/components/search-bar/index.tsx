import "./style.css";
import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../form/button";
import Input from "../form/input";

interface SearchBarProps {
  searchQuery: string;
  isSearching: boolean;
}

function SearchBar({ searchQuery, isSearching }: SearchBarProps) {
  const [input, setInput] = useState<string>(searchQuery);
  const navigate = useNavigate();

  /* update input if search query already present in url */
  useEffect(() => {
    setInput(searchQuery);
  }, [searchQuery]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`?search=${encodeURIComponent(input)}`);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <Input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Enter city name"
        className="search-input"
        autoFocus
      />
      <Button className="search-btn" disabled={isSearching || !input}>
        Search
      </Button>
    </form>
  );
}
const MemoizedSearchBar = React.memo(SearchBar);
export default MemoizedSearchBar;
