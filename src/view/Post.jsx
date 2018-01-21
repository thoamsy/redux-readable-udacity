import React from 'react';
import PropTypes from 'prop-types';
import '../styles/post.css';
import { format } from 'date-fns';

const Post = ({ title, timestamp, body, category }) => (
  <div className="comment-container">
    <article className="comment">
      {/* eslint-disable */}
      <a className="delete" aria-label="delete post" />
      {/* eslint-enable */}
      <strong className="has-text-info" style={{textTransform: 'capitalize'}}>{category}</strong>
      <h2 className="comment-title">{title}</h2>
      <div className="body">{body}</div>
      <time className="has-text-grey" style={{ margin: '10px 0' }}>{format(timestamp, 'YYYY-MM-DD')}</time>
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
  body: PropTypes.string.isRequired,
  timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  category: PropTypes.string,
  title: PropTypes.string.isRequired
};

const PostList = ({ posts }) => (
  <div className="container">
  {
      !posts.length ?
        <div className="notification is-warning">
          该分类没有任何文章，去其他分类看看吧。(´･ω･`)
        </div> :
    posts.map(post => <Post key={post.timestamp} {...post} />)
  }
  </div>
);

export default PostList;
