import React from 'react';
import PropTypes from 'prop-types';
import '../styles/post.css';
import { format } from 'date-fns';

const Post = ({ author, title, timestamp, body, category }) => (
  <div className="comment-container">
    <article className="comment">
      {/* eslint-disable */}
      <a className="delete" aria-label="delete post" />
      {/* eslint-enable */}
      <p className="category">来自分类：{category}</p>
      <h2 className="author">{author}</h2>
      <h2 className="comment-title">{title}</h2>
      <div className="body">{body}</div>
      <time className="comment-time">{format(timestamp, 'YYYY-MM-DD')}</time>
    </article>
    <div className="actions">
      <button className="button">
        <span className="icon is-small">
          <i className="fa fa-angle-up" />
        </span>
        <span>400</span>
      </button>
      <button className="button">
        <span className="icon is-small">
          <i className="fa fa-angle-down" />
        </span>
      </button>
    </div>
  </div>
);
Post.propTypes = {
  author: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  category: PropTypes.string,
  title: PropTypes.string.isRequired
};

const PostList = ({ posts }) => (
  <div className="container">{posts.map(post => <Post key={post.timestamp} {...post} />)}</div>
);

export default PostList;
