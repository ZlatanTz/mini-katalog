import React from 'react';
import styles from './Button.module.css';

export const Button = React.forwardRef(function Button(
  { variant = 'primary', className = '', ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      className={`${styles.btn} ${styles[`btn-${variant}`]} ${className}`}
      {...rest}
    />
  );
});
