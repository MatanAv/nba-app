import React from 'react';

import '@styles/search/SearchBar.css';

interface SearchBarProps {
  onTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchBar = ({ onTextChange, placeholder }: SearchBarProps) => (
  <div className='search-bar'>
    <input className='search-bar__input' type='text' placeholder={placeholder} onChange={onTextChange} />
    <button className='search-bar__button'>⌕</button>
  </div>
);

export default SearchBar;
