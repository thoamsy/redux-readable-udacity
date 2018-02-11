import React from 'react';

const height = {
  height: '3.25rem',
};
const NavBar = ({ children, categories, onToggleMenu, isNavbarToggle }) => {
  if (!Array.isArray(children)) children = [children];
  const [start, end] = children;
  return (
    <nav className="navbar is-transparent is-fixed-top" style={height}>
      <div className="navbar-brand">
        <a
          className={`navbar-burger ${isNavbarToggle ? 'is-active' : ''}`}
          onClick={onToggleMenu}
        >
          <span />
          <span />
          <span />
        </a>
      </div>
      <menu className={`navbar-menu ${isNavbarToggle ? 'is-active' : ''}`}>
        <div className="navbar-start">
          {typeof start === 'function' ? start(categories) : start}
        </div>
        <div className="navbar-end">
          {typeof end === 'function' ? end(categories) : end}
        </div>
      </menu>
    </nav>
  );
};

export default NavBar;
