import React, { Children } from 'react';

import '@styles/DivisionsLayout.css';

interface DivisionsLayoutProps {
  children: React.ReactNode[];
}

const DivisionsLayout = ({ children }: DivisionsLayoutProps) => (
  <div className='div-container'>
    {Children.map(children, (child) => (
      <div className='div-column'>{child}</div>
    ))}
  </div>
);

export default DivisionsLayout;
