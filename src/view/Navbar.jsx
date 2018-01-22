import React from 'react';

const NavBar = ({ children, categories }) => {
  const [start, end] = children;
  return (
    <nav className="navbar is-transparent is-fixed-top">
      <div className="navbar-start">
        {typeof start === 'function' ? start(categories) : start}
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          {typeof end === 'function' ? end(categories) : end}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
