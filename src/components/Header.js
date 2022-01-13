import React from 'react';
import headerLogo from '../image/logo.svg';

function Header() {
  return (
    <header className="header">
    <img className="logo header__logo" src={headerLogo} alt="Город.Россия" />
  </header>
  );
}

export default Header;