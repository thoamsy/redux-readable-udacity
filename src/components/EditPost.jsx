import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { pick, identical, isEmpty, complement } from 'ramda';
import { connect } from 'react-redux';
import { savePost, fetchSavedPost } from '../actions/editPost';
import Navbar from './Navbar';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/theme/ttcn.css';
import 'codemirror/addon/display/placeholder';
import 'codemirror/addon/selection/active-line';
import 'codemirror/mode/javascript/javascript';

const ChooseCategory = ({ categories, value, onChange }) => (
  <div className="field">
    <label className="label">文章分类</label>
      <div className="select is-multiple">
      <select size={categories.length}
        onChange={onChange}
        value={value}
        multiple
        name="category">
        {categories.map(({ name }) => <option value={name} key={name}>{name}</option>)}
      </select>
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
class EditPost extends Component {
  state = { ...this.props.edited }
  get post() {
    return {
      ...this.state,
      body: this.code.doc.getValue()
    };
  }

  componentDidMount() {
    this.props.fetchSavedPost();
    this.code = CodeMirror.fromTextArea(document.querySelector('#editSection'), {
      mode: {
        name: 'gfm',
        highlightFormatting: true
      },
      theme: 'ttcn',
      styleActiveLine: true,
      lineNumber: true
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!identical(nextProps.edited, this.props.edited)) {
      this.setState(nextProps.edited);
    }
  }

  componentWillUnmount() {
    const isValid = complement(isEmpty);
    this.code.toTextArea();
    if (Object.values(this.post).some(isValid)) {
      this.props.savePost({ ...this.post, id: this.props.match.params.id });
    }
  }

  handleInputChange = ({ target }) => {
    let { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { history } = this.props;
    return (
      <Fragment>
        <Navbar>
          <div className="navbar-item">
            <h1>发布</h1>
          </div>
            <div className="navbar-item">
              <div className="field is-grouped">
                <p className="control">
                  <a className="button is-text">Publish</a>
                </p>
                <p className="control">
                <a className="button is-danger" onClick={() => history.goBack()}>Cancel</a>
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
            />
            <ChooseCategory
              categories={this.props.categories.slice(1)}
              value={[this.state.category]}
              onChange={this.handleInputChange}
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
EditPost = connect(pick(['categories', 'edited']), { savePost, fetchSavedPost })(EditPost);

export default EditPost;
