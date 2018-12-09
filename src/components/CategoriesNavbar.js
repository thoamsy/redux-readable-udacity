import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) =>
      isCurrent
        ? {
            style: {
              color: 'rgba(0, 0, 0, 0.84)',
              fontWeight: 600,
            },
          }
        : null
    }
  />
);

const CategoryLink = styled(NavLink)`
  text-transform: uppercase;
  font-size: 18px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.56);
  transition: color ease-out 0.3s;

  &:hover {
    color: rgba(0, 0, 0, 0.84);
    text-decoration: underline;
  }
`;
const EditPostItem = ({ id }) => (
  <div className="navbar-item">
    <Link
      to={`/create/${id}`}
      data-tooltip="新建帖子"
      className="tooltip is-tooltip-bottom"
    >
      <span className="icon has-text-link is-large">
        <i className="fa fa-plus-square fa-2x" />
      </span>
    </Link>
  </div>
);
const CategoriesItem = ({ categories }) =>
  categories.map(category => (
    <CategoryLink
      key={category.name}
      className="navbar-item"
      to={'/' + category.path}
    >
      {category.name}
    </CategoryLink>
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
