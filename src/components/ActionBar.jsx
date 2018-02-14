import React from 'react';
import PropTypes from 'prop-types';

const ActionBar = ({ incVoteScore, voteScore, decVoteScore, commentCount, onEdit }) => (
  <nav className="actions level is-mobile">
    <div className="level-left">
      <div className="level-item">
        <button className="button vote" onClick={incVoteScore}>
          <span className="icon is-small">
            <i className="fa fa-angle-up" />
          </span>
          <span>{voteScore}</span>
        </button>
        <button className="button vote" onClick={decVoteScore}>
          <span className="icon is-small">
            <i className="fa fa-angle-down" />
          </span>
        </button>
      </div>

      <div className="level-item">
        <button className="button is-white" onClick={onEdit}>
          <span className="icon is-small">
            <i className="fa fa-pencil"></i>
          </span>
          <span>编辑</span>
        </button>
      </div>
      {commentCount !== undefined && (
        <p className="level-item">
          <span className="icon is-medium">
            <i className="fa fa-commenting" />
          </span>
          <span>{commentCount} 条评论</span>
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
