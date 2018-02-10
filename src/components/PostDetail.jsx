import React, { Component } from 'react';
import Comments from './Comments';
import PostContainer from './PostContainer';
import fetchComments from '../actions/comments';
import { connect } from 'react-redux';
import { getPost } from '../reducers/';
import format from 'date-fns/format';

const leftTop = {
  position: 'absolute',
  left: 44,
  top: 44,
};
class PostDetail extends Component {
  componentDidMount() {
    // 通过路由切换的试图的时候，滚动条可能还是保留在那个位置。
    if (!!window.scrollY) window.scrollTo(0, 0);
    const { match, fetchComments } = this.props;
    const { params: { id }, url } = match;
    fetchComments(`${url}/comments`, id).then(console.log);
  }

  onBack = () => {
    this.props.history.goBack();
  }

  render() {
    const { post } = this.props;
    return (
      <div style={{ background: '#fafafa' }}>
        <section className="section">
          <div className="container">
            <PostContainer {...post}/>
            <Comments />
          </div>
        </section>
        <a className="icon has-text-info" style={leftTop} onClick={this.onBack}>
          <i className="fa fa-arrow-left fa-2x" />
        </a>
      </div>
    );
  }
}
const mapStateToMaps = (state, ownProps) => {
  const { match } = ownProps;
  const { id } = match.params;
  return {
    post: getPost(state, id)
  };
};

export default connect(mapStateToMaps, { fetchComments })(PostDetail);
