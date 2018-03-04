import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ActionMenu = styled.menu`
  color: #209cee;
  display: flex;
  justify-content: space-around;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.25;
`;

const NotFound = ({ location }) => (
  <div className="hero is-light is-large">
    <div className="hero-body">
      <div className="container has-text-centered">
        <h1 className="title has-text-grey is-spaced">文章没有找到(╯﹏╰)</h1>
        <ActionMenu>
          <Link to="/">回到首页</Link>
          <Link to={location.state.from}>刷新重试</Link>
        </ActionMenu>
      </div>
    </div>
  </div>
);
export default NotFound;
