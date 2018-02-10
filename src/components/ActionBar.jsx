import React from 'react';
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
      <a className="level-item">
        <span className="icon is-medium">
          <i className="fa fa-commenting" />
        </span>
        {commentCount} 条评论
      </a>
    </div>
  </nav>
);

export default ActionBar;
