import React from 'react';

import { ButtonVariant } from '@enums/buttons';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
}

const Button = ({ children, variant = ButtonVariant.Primary, ...rest }: ButtonProps) => (
  <button className={variant} {...rest}>
    {children}
  </button>
);

export default Button;
