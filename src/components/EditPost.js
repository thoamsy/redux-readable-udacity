import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { pick, identical, isEmpty, complement } from 'ramda';
import { connect } from 'react-redux';
import {
  savePost,
  fetchSavedPost,
  publishPost,
  modifyPost,
} from '../actions/editPost';
import Navbar from './Navbar';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/theme/ttcn.css';
import 'codemirror/addon/display/placeholder';
import 'codemirror/addon/selection/active-line';
import 'codemirror/mode/javascript/javascript';

const ChooseCategory = ({ categories, value, onChange, disabled }) => (
  <div className="field">
    <label className="label">文章分类</label>
    <div className="buttons">
      {categories.map(({ name }) => (
        <button
          disabled={disabled}
          key={name}
          onClick={onChange(name)}
          className={`button ${value === name ? 'is-info' : ''}`}
        >
          {name}
        </button>
      ))}
    </div>
  </div>
);

ChooseCategory.propType = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ),
};

const GeneralInput = ({ eleType, labelName, ...props }) => (
  <div className="field">
    <label className="label">{labelName}</label>
    <div className="control">
      {React.createElement(eleType, {
        ...props,
        className: props.className || eleType,
      })}
    </div>
  </div>
);
GeneralInput.propType = {
  eleType: PropTypes.oneOf(['input', 'textarea', 'button']),
  inputRef: PropTypes.func,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

const pickMeta = pick(['author', 'category', 'id', 'title', 'body']);
class EditPost extends Component {
  state = pickMeta(this.props.edited);
  get post() {
    return {
      ...this.state,
      body: this.code.doc.getValue(),
    };
  }
  get isPublishPost() {
    return this.props.match.params.verb === 'create';
  }

  componentDidMount() {
    if (this.isPublishPost) {
      this.props.fetchSavedPost();
    }
    this.code = CodeMirror.fromTextArea(
      document.querySelector('#editSection'),
      {
        mode: {
          name: 'gfm',
          highlightFormatting: true,
        },
        theme: 'ttcn',
        styleActiveLine: true,
        lineNumber: true,
      }
    );
  }

  // 使用 props 来初始化 state，都需要用到这个方法。
  componentWillReceiveProps(nextProps) {
    const { edited } = nextProps;
    if (!identical(edited, this.props.edited)) {
      this.setState(pickMeta(edited));
      this.code.doc.setValue(edited.body);
    }
  }

  componentWillUnmount() {
    const isValid = complement(isEmpty);
    // 防止 code mirror 导致的内存泄漏。
    this.code.toTextArea();

    if (!this.isPublishPost) return;
    const { post } = this;
    const keys = Object.keys(post);
    for (let key of keys) {
      if (key !== 'id' && isValid(post[key])) {
        this.props.savePost({ ...post, id: this.props.match.params.id });
        return;
      }
    }
  }

  handleInputChange = ({ target }) => {
    let { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  handleCategoryClick = value => () => {
    this.setState({
      category: value,
    });
  };

  onPublic = () => {
    const { publishPost, history, modifyPost } = this.props;
    if (window.confirm('你确定发布吗？')) {
      if (this.isPublishPost) {
        publishPost(this.post).then(() => history.goBack());
      } else {
        modifyPost(pick(['id', 'body', 'title', 'category'], this.post)).then(
          () => history.goBack()
        );
      }
    }
  };

  render() {
    const { history, edited: { isSaving } } = this.props;
    return (
      <Fragment>
        <Navbar>
          <div className="navbar-item">
            <h1>发布文章</h1>
          </div>
          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control">
                <a
                  onClick={this.onPublic}
                  className={`button is-text ${isSaving ? 'is-loading' : ''}`}
                >
                  {this.isPublishPost ? '发布' : '修改'}
                </a>
              </p>
              <p className="control">
                <a
                  className="button is-danger"
                  onClick={() => !isSaving && history.goBack()}
                >
                  Cancel
                </a>
              </p>
            </div>
          </div>
        </Navbar>
        <section className="section">
          <div className="container">
            <GeneralInput
              eleType="input"
              labelName="作者"
              placeholder="请输入一个名字"
              value={this.state.author}
              onChange={this.handleInputChange}
              name="author"
              disabled={!this.isPublishPost}
            />
            <ChooseCategory
              categories={this.props.categories.slice(1)}
              value={this.state.category}
              onChange={this.handleCategoryClick}
              disabled={!this.isPublishPost}
            />
            <GeneralInput
              eleType="input"
              labelName="文章标题"
              placeholder="请输入标题"
              value={this.state.title}
              onChange={this.handleInputChange}
              name="title"
            />
            <GeneralInput
              eleType="textarea"
              labelName="文章"
              placeholder="说点什么吧, 支持 Markdown"
              id="editSection"
              value={this.state.body}
              onChange={this.handleInputChange}
              name="body"
            />
          </div>
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  categories: state.categories,
  edited: ownProps.edited || state.edited,
});
EditPost = connect(mapStateToProps, {
  savePost,
  fetchSavedPost,
  publishPost,
  modifyPost,
})(EditPost);

export default EditPost;
