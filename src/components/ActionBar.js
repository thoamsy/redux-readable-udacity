import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ActionBar = ({
  incVoteScore,
  voteScore,
  decVoteScore,
  commentCount,
  onEdit,
  editPostLink,
}) => (
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
        {typeof onEdit === 'function' ? (
          <a className="button is-white" onClick={onEdit}>
            <span className="icon is-small">
              <i className="fa fa-pencil" />
            </span>
            <span>编辑</span>
          </a>
        ) : (
          <Link className="button is-white" to={editPostLink}>
            <span className="icon is-small">
              <i className="fa fa-pencil" />
            </span>
            <span>编辑</span>
          </Link>
        )}
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
  onEdit: PropTypes.func,
  editPostLink: PropTypes.string,
};

export default ActionBar;
