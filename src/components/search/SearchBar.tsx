import React from 'react';

interface SearchBarProps {
  onTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchBar = ({ onTextChange, placeholder }: SearchBarProps) => (
  <div className='search-bar'>
    <input type='text' placeholder={placeholder} onChange={onTextChange} />
  </div>
);

export default SearchBar;
