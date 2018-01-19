import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import '../styles/category.css';

const CategoriesNav = ({ categories }) => (
  <nav className="navbar">
    {
      categories.map(category => (
        <NavLink
          key={category.name}
          activeClassName="is-active"
          className="category"
          to={category.path}
        >{category.name}</NavLink>
      ))
    }
  </nav>
);
CategoriesNav.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  }))
}

export default CategoriesNav;
