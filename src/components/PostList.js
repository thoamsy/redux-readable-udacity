import React, { Fragment } from 'react';
import '../styles/post.css';
import 'highlight.js/styles/github.css';
import PostContainer from './PostContainer';

const PostList = ({ posts }) => (
  <Fragment>
    {!posts.length ? (
      <div className="notification is-warning">
        该分类没有任何文章，去其他分类看看吧。(´･ω･`)
      </div>
    ) : (
      <div className="container">
        {posts.map(post => (
          <PostContainer key={post.timestamp} {...post} isThumbnail />
        ))}
      </div>
    )}
  </Fragment>
);

export default PostList;
