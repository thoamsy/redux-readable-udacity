import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getPost } from '../reducers/';
import Comments from './Comments';
import PostContainer from './PostContainer';

const GoBackLink = styled.a`
  position: absolute;
  left: 48px;
  top: 24px;
`;

class PostDetail extends Component {
  componentDidMount() {
    // 通过路由切换的试图的时候，滚动条可能还是保留在那个位置。
    if (!!window.scrollY) window.scrollTo(0, 0);
  }

  onBack = () => {
    this.props.navigate('/');
  };

  render() {
    const { post } = this.props;
    if (post === null) {
      return null;
    }
    const { sortWay, id, category, error } = post;

    if (error) {
      return <Redirect to={error} />;
    }

    return (
      <div style={{ background: '#fafafa' }}>
        <section className="section">
          <div className="container">
            <PostContainer {...post} />
            <Comments sortWay={sortWay} postId={id} postCategory={category} />
          </div>
        </section>
        <GoBackLink className="icon has-text-info" onClick={this.onBack}>
          <i className="fa fa-arrow-left fa-2x" />
        </GoBackLink>
      </div>
    );
  }
}

export default connect((state, { id }) => ({
  post: getPost(state, id),
}))(PostDetail);
