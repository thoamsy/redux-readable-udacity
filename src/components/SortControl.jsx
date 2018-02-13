import React from 'react';
import PropTypes from 'prop-types';
import { sortWays } from '../reducers/posts';

const SortControl = ({ sortWay, onClick, className = '', ...rest }) => (
  <a className={`has-text-grey ${className}`} onClick={onClick} {...rest}>
    <span className="icon">
      <i className="fa fa-retweet" />
    </span>
    <span>切换为{sortWay === sortWays[1] ? '时间' : '投票'}排序</span>
  </a>
);
SortControl.propTypes = {
  sortWay: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SortControl;
