import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import '../styles/category.css';

const CategoriesNav = ({ categories }) => (
  <nav className="navbar is-transparent is-fixed-top">
    <div className="navbar-start">
      {
        categories.map(category => (
          <NavLink
            key={category.name}
            exact
            activeClassName="is-active"
            className="navbar-item category"
            to={'/' + category.path}
          >{category.name}</NavLink>
        ))
      }
    </div>
    <div className="navbar-end">
      <div className="navbar-item">
        <a data-tooltip="新建博客" className="tooltip is-tooltip-bottom"><span className="icon has-text-info is-large">
          <i className="fa fa-pencil-square fa-2x"></i>
        </span></a>
      </div>
    </div>
  </nav>
);
CategoriesNav.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  }))
};

export default CategoriesNav;
