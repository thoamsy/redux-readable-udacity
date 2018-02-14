import React from 'react';
import PropTypes from 'prop-types';
import '../styles/comment.css';
import distanceInWords from 'date-fns/distance_in_words_strict/';
import zh from 'date-fns/locale/zh_cn';
import { List } from 'react-content-loader';
import ActionBar from './ActionBar';
import SortControl from './SortControl';

const headTitle = {
  fontSize: 16,
  color: 'rgba(0,0,0,.68)',
  fontWeight: 600,
  margin: '10px 0',
};
const divider = {
  marginBottom: 20,
  borderTop: '2px solid rgba(0,0,0,.54)',
  width: 75,
};

const Comments = ({
  err,
  comments,
  isFetching,
  onChange,
  currentInput,
  submitComment,
  isCommenting,
  onDeleteComment,
  onIncVote,
  onDecVote,
  sortWay,
  switchSortWay,
  onEditComment,
}) => {
  if (err) {
    return <h1 className="title has-text-danger">评论获取失败，请重试</h1>;
  }

  return (
    <section className="comment-block">
      <h4 style={headTitle}>Response</h4>
      <div className="field is-grouped">
        <div className="control is-expanded">
          <input
            type="text"
            name="comment"
            className="input"
            placeholder="Write a response"
            onChange={onChange}
            value={currentInput}
          />
        </div>
        <div className="control">
          <a className="button is-info" onClick={submitComment}>
            评论
          </a>
        </div>
      </div>
      <div style={divider} />
      {isFetching ? (
        <div style={{ margin: '0 auto', width: 500 }}>
          <List />
        </div>
      ) : (
        <div className="card">
          <header className="card-header">
            <h1 className="card-header-title">评论</h1>
            <SortControl
              className="card-header-icon"
              aria-label="切换排序"
              sortWay={sortWay}
              onClick={switchSortWay}
            />
          </header>
          <div className="card-content">
            {!!comments.length ? (
              comments.map(comment => (
                <div className="comment box" key={comment.id}>
                  <button
                    className="delete"
                    onClick={onDeleteComment(comment.id)}
                  />
                  <header className="comment-header">
                    <p className="author">{comment.author}</p>
                    <time>
                      {distanceInWords(comment.timestamp, new Date(), {
                        addSuffix: true,
                        locale: zh,
                      })}
                    </time>
                  </header>
                  <article className="body">
                    <p>{comment.body}</p>
                  </article>
                  <ActionBar
                    voteScore={comment.voteScore}
                    incVoteScore={() => onIncVote(comment.id)}
                    decVoteScore={() => onDecVote(comment.id)}
                    onEdit={onEditComment(comment.id, comment.body)}
                  />
                </div>
              ))
            ) : (
              <h2 className="subtitle">快来留下第一个评论吧！</h2>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
Comment.propTypes = {
  err: PropTypes.string,
  comments: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isCommenting: PropTypes.bool,
  onDeleteComment: PropTypes.func.isRequired,
  onIncVote: PropTypes.func.isRequired,
  onDecVote: PropTypes.func.isRequired,
  sortWay: PropTypes.string.isRequired,
  switchSortWay: PropTypes.func.isRequired,
  currentInput: PropTypes.string.isRequired,
  submitComment: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onEditComment: PropTypes.func.isRequired,
};

export default Comments;
