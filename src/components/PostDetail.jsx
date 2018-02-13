import React, { Component } from 'react';
import Comments from './Comments';
import PostContainer from './PostContainer';
import { fetchComments, addComment, deleteComment, updateCommentVote } from '../actions/comments';
import { connect } from 'react-redux';
import { getPost, getComments, isCommentsFetching } from '../reducers/';

const leftTop = {
  position: 'absolute',
  left: 48,
  top: 24,
};

class PostDetail extends Component {
  state = {
    comment: '',
  };

  handleInputChange = ({ target }) => this.setState({ comment: target.value });
  onDeleteComment = commentId => () => {
    const { deleteComment, post } = this.props;
    deleteComment(commentId, post.id, post.category);
  };

  submitComment = () => {
    const { post, addComment } = this.props;
    addComment(post.id, this.state.comment, post.category);
    this.setState({
      comment: '',
    });
  };

  componentDidMount() {
    // 通过路由切换的试图的时候，滚动条可能还是保留在那个位置。
    if (!!window.scrollY) window.scrollTo(0, 0);
    const { match, fetchComments } = this.props;
    const { params: { id }, url } = match;
    fetchComments(`${url}/comments`, id);
  }

  onBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { post, comments, isFetching, incCommentVote, decCommentVote } = this.props;
    return (
      <div style={{ background: '#fafafa' }}>
        <section className="section">
          <div className="container">
            <PostContainer {...post} />
            <Comments
              comments={comments}
              isFetching={isFetching}
              onChange={this.handleInputChange}
              currentInput={this.state.comment}
              submitComment={this.submitComment}
              onDeleteComment={this.onDeleteComment}
              onIncVote={incCommentVote}
              onDecVote={decCommentVote}
            />
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
  const { id } = ownProps.match.params;
  return {
    post: getPost(state, id),
    comments: getComments(state, id),
    isFetching: isCommentsFetching(state, id),
  };
};

export default connect(mapStateToMaps, {
  fetchComments,
  addComment,
  deleteComment,
  incCommentVote: updateCommentVote(true),
  decCommentVote: updateCommentVote(false),
})(PostDetail);
