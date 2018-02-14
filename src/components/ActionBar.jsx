import React from 'react';
import PropTypes from 'prop-types';

const ActionBar = ({ incVoteScore, voteScore, decVoteScore, commentCount }) => (
  <nav className="actions level is-mobile">
    <div className="level-left">
      <div className="level-item">
        <button className="button" onClick={incVoteScore}>
          <span className="icon is-small">
            <i className="fa fa-angle-up" />
          </span>
          <span>{voteScore}</span>
        </button>
        <button className="button" onClick={decVoteScore}>
          <span className="icon is-small">
            <i className="fa fa-angle-down" />
          </span>
        </button>
      </div>
      {commentCount !== undefined && (
        <p className="level-item has-text-info">
          <span className="icon is-medium">
            <i className="fa fa-commenting" />
          </span>
          {commentCount} 条评论
        </p>
      )}
    </div>
  </nav>
);
ActionBar.propTypes = {
  incVoteScore: PropTypes.func.isRequired,
  decVoteScore: PropTypes.func.isRequired,
  voteScore: PropTypes.number.isRequired,
  commentCount: PropTypes.number,
};

export default ActionBar;
