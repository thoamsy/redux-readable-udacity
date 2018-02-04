import React from 'react';
import PropTypes from 'prop-types';
import '../styles/post.css';
import 'highlight.js/styles/github.css';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost } from '../actions/posts';
import { postVoteScore } from '../actions/posts';

const Post = ({
  title,
  timestamp,
  body,
  category,
  voteScore,
  incVoteScore,
  decVoteScore,
  onDeletePost,
  id,
  commentCount,
  }) => (
    <div className="comment-container">
      <article className="comment">
        {/* eslint-disable */}
        <button
          className="delete"
          aria-label="delete post"
          onClick={onDeletePost(id)}
        />
        {/* eslint-enable */}
        <strong
          className="has-text-info"
          style={{ textTransform: 'capitalize' }}>
          {category}
        </strong>
        <h2 className="comment-title">{title}</h2>
        <div className="body">
          <div dangerouslySetInnerHTML={{ __html: body }} className="content" />
          <Link to={`/posts/${id}`}>阅读全文</Link>
        </div>
        <time className="has-text-grey" style={{ margin: '10px 0' }}>
          {format(timestamp, 'YYYY-MM-DD')}
        </time>
      </article>
      <div className="actions level is-mobile">
        <div className="level-left">
          <div className="level-item">
            <button
              className="button"
              onClick={incVoteScore}>
              <span className="icon is-small">
                <i className="fa fa-angle-up" />
              </span>
              <span>{voteScore}</span>
            </button>
            <button
              className="button"
              onClick={decVoteScore}>
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
      </div>
    </div>
  );

Post.propTypes = {
  title: PropTypes.string.isRequired,
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  voteScore: PropTypes.number.isRequired,
  incVoteScore: PropTypes.func.isRequired,
  decVoteScore: PropTypes.func.isRequired,
  onDeletePost: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  commentCount: PropTypes.number.isRequired,
};

class PostContainer extends React.Component {
  static displayName = 'Post';
  onHandleVoteScoreChange = (up) => {
    const { category, id, postVoteScore } = this.props;
    return () => postVoteScore(id, category, up);
  }
  onDeletePost = id => () => this.props.deletePost(id, this.props.category)

  render() {
    return (
      <Post {...this.props}
        incVoteScore={this.onHandleVoteScoreChange(true)}
        decVoteScore={this.onHandleVoteScoreChange()}
        onDeletePost={this.onDeletePost}
      />
    );
  }
}

PostContainer = connect(null, {
  postVoteScore,
  deletePost,
})(PostContainer);

const PostList = ({ posts }) => (
  <div className="container">
    {!posts.length ? (
      <div className="notification is-warning">
        该分类没有任何文章，去其他分类看看吧。(´･ω･`)
      </div>
    ) : (
      posts.map(post => <PostContainer key={post.timestamp} {...post} />)
    )}
  </div>
);

export default PostList;
