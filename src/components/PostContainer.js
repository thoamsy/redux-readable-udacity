import React, { Component } from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import { Link } from '@reach/router';
import { connect } from 'react-redux';

import ActionBar from './ActionBar';
import { deletePost } from '../actions/posts';
import { postVoteScore } from '../actions/posts';

const Post = ({
  title,
  timestamp,
  rendered,
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
  <div className="post-container">
    <article className="post">
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
      <h2 className="post-title title">{title}</h2>
      <h4 className="subtitle">
        by <a className="link is-link">{author}</a>
      </h4>
      <div className="body">
        <div
          dangerouslySetInnerHTML={{ __html: rendered }}
          className={`content ${isThumbnail ? 'is-thumbnail' : ''}`}
        />
        {isThumbnail && <Link to={`/${category}/${id}`}>阅读全文</Link>}
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
      editPostLink={`/edit/${id}`}
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
  onDeletePost = id => () => this.props.deletePost(id, this.props.category);
  onClickComments = id => () => this.setState({ to: `/posts/${id}/comments` });
  incVoteScore = () =>
    this.props.incVoteScore(this.props.id, this.props.category);
  decVoteScore = () =>
    this.props.decVoteScore(this.props.id, this.props.category);

  render() {
    const { id } = this.props;
    return (
      <Post
        {...this.props}
        incVoteScore={this.incVoteScore}
        decVoteScore={this.decVoteScore}
        onDeletePost={this.onDeletePost(id)}
        onClickComments={this.onClickComments(id)}
      />
    );
  }
}

export default connect(
  null,
  {
    incVoteScore: postVoteScore(true),
    decVoteScore: postVoteScore(false),
    deletePost,
  }
)(PostContainer);
