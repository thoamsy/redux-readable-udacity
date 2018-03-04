import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="hero is-light is-large">
    <div className="hero-body">
      <div className="container has-text-centered">
        <h1 className="title has-text-grey is-spaced">文章没有找到(╯﹏╰)</h1>
        <h2 className="has-text-info subtitle">
          <Link to="/">回到首页</Link>
        </h2>
      </div>
    </div>
  </div>
);
export default NotFound;
