import React, { useState } from 'react';
import v4 from 'uuid/v4';
import { connect } from 'react-redux';
import { CategoriesItem, EditPostItem } from './CategoriesNavbar';

import { getEdited, getCategories } from '../reducers';
const height = {
  height: '3.25rem',
};

const Navbar = ({ children, categories, onToggleMenu, isNavbarToggle }) => {
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

const TopNavBar = ({ categories, edited, children }) => {
  const [isToggle, toggleNavbar] = useState(false);
  const onToggleMenu = () => toggleNavbar(!isToggle);
  return (
    <React.Fragment>
      <Navbar
        categories={categories}
        onToggleMenu={onToggleMenu}
        isNavbarToggle={isToggle}
      >
        {categories => <CategoriesItem categories={categories} />}
        <EditPostItem id={edited.id || v4()} />
      </Navbar>
      {children}
    </React.Fragment>
  );
};

const mapStateToProps = (state, { category = 'all' }) => {
  return {
    categories: getCategories(state),
    edited: getEdited(state),
  };
};

export default connect(mapStateToProps)(TopNavBar);
