import React, { Component } from 'react';
import EditComment from './EditComment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/comment.css';
import distanceInWords from 'date-fns/distance_in_words_strict/';
import zh from 'date-fns/locale/zh_cn';
import { List } from 'react-content-loader';
import ActionBar from './ActionBar';
import SortControl from './SortControl';
import { switchCommentSortWay } from '../actions/posts';
import {
  fetchComments,
  addComment,
  deleteComment,
  updateCommentVote,
  editComment,
} from '../actions/comments';
import {
  getComments,
  isCommentsFetching,
  getCommentEditStatus,
} from '../reducers/';

const headTitle = {
  fontSize: 16,
  color: 'rgba(0,0,0,.68)',
  fontWeight: 600,
  margin: '10px 0',
};
const divider = {
  marginBottom: 20,
  borderTop: '2px solid rgba(0,0,0,.54)',
  width: 75,
};

class Comments extends Component {
  static propTypes = {
    err: PropTypes.string,
    comments: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    incCommentVote: PropTypes.func.isRequired,
    decCommentVote: PropTypes.func.isRequired,
    sortWay: PropTypes.string.isRequired,
    deleteComment: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    postCategory: PropTypes.string.isRequired,
  };

  state = {
    comment: '',
    editedComment: '',
    editedCommentId: '',
    isEditingComment: false,
  };

  componentDidMount = () => {
    const { postId, fetchComments } = this.props;
    const url = `/posts/${postId}/comments`;
    fetchComments(url, postId);
  };

  switchCommentSortWay = () => {
    this.props.switchCommentSortWay(this.props.postId);
  };

  handleInputChange = ({ target }) =>
    this.setState({ [target.name]: target.value });

  submitNewComment = () => {
    const { postId, addComment, postCategory } = this.props;
    const { comment } = this.state;
    addComment(postId, comment, postCategory);
    this.setState({
      comment: '',
    });
  };

  onDeleteComment = commentId => () => {
    const { deleteComment, postId, postCategory } = this.props;
    deleteComment(commentId, postId, postCategory);
  };

  onClickEditButton = (commentId, content) => () => {
    this.setState({
      isEditingComment: true,
      editedCommentId: commentId,
      editedComment: content,
    });
  };

  submitEditComment = commentId => event => {
    // 按回车的时候就自动提交
    if ((event.key && event.key === 'Enter') || event.keyCode === 13) {
      const { editedComment } = this.state;
      this.props.editComment(commentId, editedComment).then(() => {
        this.setState({
          editedComment: '',
          isEditingComment: false,
        });
      });
    }
  };

  onCloseModal = () => {
    this.setState({
      isEditingComment: false,
    });
  };

  get isPending() {
    return this.props.isPending(this.state.editedCommentId);
  }

  render() {
    const {
      err,
      comments,
      isFetching,
      incCommentVote,
      decCommentVote,
      sortWay,
    } = this.props;

    if (err) {
      return <h1 className="title has-text-danger">评论获取失败，请重试</h1>;
    }
    return (
      <section className="comment-block">
        <h4 style={headTitle}>Response</h4>
        <div className="field is-grouped">
          <div className="control is-expanded">
            <input
              type="text"
              name="comment"
              className="input"
              placeholder="Write a response"
              onChange={this.handleInputChange}
              value={this.state.comment}
            />
          </div>
          <div className="control">
            <a className="button is-info" onClick={this.submitNewComment}>
              发布
            </a>
          </div>
        </div>
        <div style={divider} />
        {isFetching ? (
          <div style={{ margin: '0 auto', width: 500 }}>
            <List />
          </div>
        ) : (
          <div className="card">
            <header className="card-header">
              <h1 className="card-header-title">评论</h1>
              <SortControl
                className="card-header-icon"
                aria-label="切换排序"
                sortWay={sortWay}
                onClick={this.switchCommentSortWay}
              />
            </header>
            <div className="card-content">
              {!!comments.length ? (
                comments.map(comment => (
                  <div className="comment box" key={comment.id}>
                    <button
                      className="delete"
                      onClick={this.onDeleteComment(comment.id)}
                    />
                    <header className="comment-header">
                      <p className="author">{comment.author}</p>
                      <time>
                        {distanceInWords(comment.timestamp, new Date(), {
                          addSuffix: true,
                          locale: zh,
                        })}
                      </time>
                    </header>
                    <article className="body">
                      <p>{comment.body}</p>
                    </article>
                    <ActionBar
                      voteScore={comment.voteScore}
                      incVoteScore={() => incCommentVote(comment.id)}
                      decVoteScore={() => decCommentVote(comment.id)}
                      onEdit={this.onClickEditButton(comment.id, comment.body)}
                    />
                  </div>
                ))
              ) : (
                <h2 className="subtitle">快来留下第一个评论吧！</h2>
              )}
            </div>
          </div>
        )}
        <EditComment
          onChange={this.handleInputChange}
          value={this.state.editedComment}
          isOpen={this.state.isEditingComment}
          submitEdit={this.submitEditComment(this.state.editedCommentId)}
          onRequestClose={this.onCloseModal}
          isPending={this.isPending}
        />
      </section>
    );
  }
}

const mapStateToMaps = (state, ownProps) => {
  const { postId } = ownProps;
  return {
    comments: getComments(state, postId),
    isFetching: isCommentsFetching(state, postId),
    isPending: getCommentEditStatus(state),
  };
};
export default connect(mapStateToMaps, {
  addComment,
  deleteComment,
  editComment,
  incCommentVote: updateCommentVote(true),
  decCommentVote: updateCommentVote(false),
  switchCommentSortWay,
  fetchComments,
})(Comments);
