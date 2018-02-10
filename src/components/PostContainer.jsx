import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ActionBar from './ActionBar';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePost } from '../actions/posts';
import { postVoteScore } from '../actions/posts';

const Post = ({
  title,
  timestamp,
  body,
  category,
  author,
  voteScore,
  commentCount,
  incVoteScore,
  decVoteScore,
  onDeletePost,
  id,
  isThumbnail,
}) => (
  <div className="comment-container">
    <article className="comment">
      {/* eslint-disable */}
      {isThumbnail && (
        <button
          className="delete"
          aria-label="delete post"
          onClick={onDeletePost}
        />
      )}
      {/* eslint-enable */}
      <strong className="has-text-info" style={{ textTransform: 'capitalize' }}>
        {category}
      </strong>
      <h2 className="comment-title title">{title}</h2>
      <h4 className="subtitle">
        by <a className="link is-link">{author}</a>
      </h4>
      <div className="body">
        <div
          dangerouslySetInnerHTML={{ __html: body }}
          className={`content is-marginless ${
            isThumbnail ? 'is-thumbnail' : ''
          }`}
        />
        {isThumbnail && <Link to={`/posts/${id}`}>阅读全文</Link>}
      </div>
      <time className="has-text-grey" style={{ margin: '10px 0' }}>
        {format(timestamp, 'YYYY-MM-DD')}
      </time>
    </article>
    <ActionBar
      voteScore={voteScore}
      incVoteScore={incVoteScore}
      decVoteScore={decVoteScore}
      commentCount={commentCount}
    />
  </div>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  voteScore: PropTypes.number.isRequired,
  incVoteScore: PropTypes.func.isRequired,
  decVoteScore: PropTypes.func.isRequired,
  onDeletePost: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  commentCount: PropTypes.number.isRequired,
  isThumbnail: PropTypes.bool,
};
Post.defaultProps = {
  isThumbnail: false,
};

class PostContainer extends Component {
  onHandleVoteScoreChange = up => {
    const { category, id, postVoteScore } = this.props;
    return () => postVoteScore(id, category, up);
  };

  onDeletePost = id => () => this.props.deletePost(id, this.props.category);

  onClickComments = id => () => this.setState({ to: `/posts/${id}/comments` });

  render() {
    const { id } = this.props;
    return (
      <Post
        {...this.props}
        incVoteScore={this.onHandleVoteScoreChange(true)}
        decVoteScore={this.onHandleVoteScoreChange()}
        onDeletePost={this.onDeletePost(id)}
        onClickComments={this.onClickComments(id)}
      />
    );
  }
}

export default connect(null, {
  postVoteScore,
  deletePost,
})(PostContainer);
