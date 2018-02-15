import React, { Component } from 'react';
import Comments from './Comments';
import PostContainer from './PostContainer';
const leftTop = {
  position: 'absolute',
  left: 48,
  top: 24,
};

class PostDetail extends Component {
  componentDidMount() {
    // 通过路由切换的试图的时候，滚动条可能还是保留在那个位置。
    if (!!window.scrollY) window.scrollTo(0, 0);
  }

  onBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { post } = this.props;
    const { sortWay, id, category } = post;
    return (
      <div style={{ background: '#fafafa' }}>
        <section className="section">
          <div className="container">
            <PostContainer {...post} />
            <Comments sortWay={sortWay} postId={id} postCategory={category} />
          </div>
        </section>
        <a className="icon has-text-info" style={leftTop} onClick={this.onBack}>
          <i className="fa fa-arrow-left fa-2x" />
        </a>
      </div>
    );
  }
}

export default PostDetail;
