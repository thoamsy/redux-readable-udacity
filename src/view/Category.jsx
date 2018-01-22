import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import { NavLink, Link } from 'react-router-dom';
import '../styles/category.css';
import v4 from 'uuid/v4';

const CategoriesNav = ({ categories }) => (
  <Navbar>
    <Fragment>
    {categories.map(category => (
      <NavLink
        key={category.name}
        exact
        activeClassName="is-active"
        className="navbar-item category"
        to={'/' + category.path}>
        {category.name}
      </NavLink>
      ))}
    </Fragment>
    <Link
      to={`/${v4()}/edit`}
      data-tooltip="新建帖子"
      className="tooltip is-tooltip-bottom">
      <span className="icon has-text-link is-large">
        <i className="fa fa-pencil-square fa-2x" />
      </span>
    </Link>
  </Navbar>
);
CategoriesNav.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ),
};

export default CategoriesNav;
