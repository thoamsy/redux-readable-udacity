import React from 'react';

const NavBar = ({ children }) => {
  const [start, end] = React.Children.toArray(children);
  console.log(start, end);
  return (
    <nav className="navbar is-transparent is-fixed-top">
      <div className="navbar-start">
        {start}
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          {end}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
