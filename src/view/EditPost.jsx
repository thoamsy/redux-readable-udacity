import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { pick, identical } from 'ramda';
import { connect } from 'react-redux';
import { savePost, fetchSavedPost } from '../actions/editPost';
import Navbar from './Navbar';

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
  state = { ...this.props.edited.saved }
  get post() {
    return {
      ...this.state,
    };
  }

  componentDidMount() {
    this.props.fetchSavedPost();
  }

  componentWillReceiveProps(nextProps) {
    if (!identical(nextProps.edited.saved, this.props.edited.saved)) {
      this.setState(nextProps.edited.saved);
    }
  }

  componentWillUnmount() {
    this.props.savePost(this.post);
  }

  handleInputChange = ({ target }) => {
    let { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { edited, history } = this.props;
    return (
      <Fragment>
        <Navbar>
          <div className="navbar-item">
            <h1>{edited.navState}</h1>
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
              placeholder="说点什么吧"
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
