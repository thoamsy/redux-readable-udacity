import React, { Component } from 'react';
import Comments from './Comments';
import PostContainer from './PostContainer';
import EditComment from './EditComment';
import { switchCommentSortWay } from '../actions/posts';
import {
  fetchComments,
  addComment,
  deleteComment,
  updateCommentVote,
  editComment,
} from '../actions/comments';
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
    editedComment: '',
    editedCommentId: '',
    isEditingComment: false,
  };

  handleInputChange = ({ target }) =>
    this.setState({ [target.name]: target.value });

  onDeleteComment = commentId => () => {
    const { deleteComment, post } = this.props;
    deleteComment(commentId, post.id, post.category);
  };

  submitNewComment = () => {
    const { post, addComment } = this.props;
    addComment(post.id, this.state.comment, post.category);
    this.setState({
      comment: '',
    });
  };

  // 因为 comment id 和 comment content 不能在这个组件获得。通过这样设置 state 来间接取得
  onClickEditButton = (commentId, content) => () => {
    this.setState({
      isEditingComment: true,
      editedCommentId: commentId,
      editedComment: content,
    });
  };

  submitEditComment = commentId => event => {
    if ((event.key && event.key === 'Enter') || event.keyCode === 13) {
      const { editedComment } = this.state;
      this.props.editComment(commentId, editedComment);
      this.setState({
        editedComment: '',
        isEditingComment: false,
      });
    }
  };

  onCloseModal = () => {
    this.setState({
      isEditingComment: false,
    });
  };

  switchCommentSortWay = () => {
    this.props.switchCommentSortWay(this.props.post.id);
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
    const {
      post,
      comments,
      isFetching,
      incCommentVote,
      decCommentVote,
    } = this.props;
    const { sortWay } = post;
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
              submitComment={this.submitNewComment}
              onDeleteComment={this.onDeleteComment}
              onIncVote={incCommentVote}
              onDecVote={decCommentVote}
              sortWay={sortWay}
              switchSortWay={this.switchCommentSortWay}
              onEditComment={this.onClickEditButton}
            />
          </div>
        </section>
        <a className="icon has-text-info" style={leftTop} onClick={this.onBack}>
          <i className="fa fa-arrow-left fa-2x" />
        </a>
        <EditComment
          onChange={this.handleInputChange}
          value={this.state.editedComment}
          isOpen={this.state.isEditingComment}
          submitEdit={this.submitEditComment(this.state.editedCommentId)}
          onRequestClose={this.onCloseModal}
          isEditing={false}
        />
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
  switchCommentSortWay,
  editComment,
})(PostDetail);
