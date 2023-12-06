import React, { useState } from 'react';

import '@styles/search/SearchBar.css';

interface SearchBarProps {
  onSearch: () => void;
  setText: (name: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, setText, placeholder }: SearchBarProps) => (
  <div className='search-bar'>
    <input
      className='search-bar__input'
      type='text'
      placeholder={placeholder}
      onChange={(e) => setText(e.target.value)}
    />
    <button className='search-bar__button' onClick={onSearch}>
      ⌕
    </button>
  </div>
);

export default SearchBar;
