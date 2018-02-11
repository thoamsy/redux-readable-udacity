import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import '../styles/category.css';

const EditPostItem = ({ id }) => (
  <div className="navbar-item">
    <Link
      to={`/${id}/edit`}
      data-tooltip="新建帖子"
      className="tooltip is-tooltip-bottom"
    >
      <span className="icon has-text-link is-large">
        <i className="fa fa-pencil-square fa-2x" />
      </span>
    </Link>
  </div>
);
const CategoriesItem = ({ categories }) =>
  categories.map(category => (
    <NavLink
      key={category.name}
      exact
      activeClassName="is-active"
      className="navbar-item category"
      to={'/' + category.path}
    >
      {category.name}
    </NavLink>
  ));

CategoriesItem.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ),
};

export { EditPostItem, CategoriesItem };
