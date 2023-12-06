import React from 'react';

import '@styles/tools/BackgroundColorizer.css';

interface BackgroundColorizerProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BackgroundColorizer = ({ onChange }: BackgroundColorizerProps) => (
  <div className='bg-colorizer'>
    <label>Background Color: </label>
    <input type='color' onChange={onChange} />
  </div>
);

export default BackgroundColorizer;
