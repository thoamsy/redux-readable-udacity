import React from 'react';

const NavBar = ({ children, categories }) => {
  if (!Array.isArray(children)) children = [children];
  const [start, end] = children;
  return (
    <nav className="navbar is-transparent is-fixed-top">
      <div className="navbar-start">
        {typeof start === 'function' ? start(categories) : start}
      </div>
      <div className="navbar-end">
        {typeof end === 'function' ? end(categories) : end}
      </div>
    </nav>
  );
};

export default NavBar;
