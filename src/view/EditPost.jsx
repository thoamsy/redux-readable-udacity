import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { pick } from 'ramda';
import { connect } from 'react-redux';
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
  state = {
    author: '',
    title: '',
    body: '',
    category: [],
  };

  handleInputChange = ({ target }) => {
    let { value, name, type } = target;
    // 这里是因为 UI 实现细节使用的 select-multiple, 主要是懒得自己写 CSS 了.
    if (type.includes('select')) {
      value = [value];
    }
    console.log(type, value);
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <Fragment>
        <Navbar>
          <h1>nihao</h1>
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
              value={this.state.category}
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
EditPost = connect(pick(['categories']))(EditPost);

export default EditPost;
