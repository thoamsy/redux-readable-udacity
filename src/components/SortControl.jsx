import React from 'react';

const textStyle = {
  color: '#8590a6',
  padding: 0
};
const SortControl = ({ isTimeStamp, onClick }) => (
  <div className="field">
    <a className="button is-light" onClick={onClick} style={textStyle}>
      <span className="icon">
        <i className="fa fa-retweet" />
      </span>
      <span>切换为{!isTimeStamp ? '时间' : '投票'}排序</span>
    </a>
  </div>
);
SortControl.defaultProps = {
  isTimeStamp: true,
};

export default SortControl;
