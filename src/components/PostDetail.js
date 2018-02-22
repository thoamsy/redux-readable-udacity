import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost, getCategories } from '../reducers/';
import { fetchPosts } from '../actions/posts';
import { fetchAllCategories } from '../actions/category';
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
    // 说明时直接从 URL 读取的，同样的也要去获取所有的 post。
    if (this.props.post === null) {
      const { fetchPosts, fetchAllCategories } = this.props;
      let pos = 0;
      fetchAllCategories()
        .then(() => this.props.categories)
        .then(function preload(categories) {
          if (!categories.length) return;
          categories.slice(0, 3).map(({ name }) => fetchPosts(name));
          pos += 3;
          return preload(categories.slice(pos));
        });
    }
  }

  onBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { post } = this.props;
    const { sortWay, id, category } = post;
    if (post === null) {
      return null;
    }

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

export default connect(
  (state, ownProps) => ({
    post: getPost(state, ownProps.match.params.id),
    categories: getCategories(state),
  }),
  {
    fetchPosts,
    fetchAllCategories,
  }
)(PostDetail);
