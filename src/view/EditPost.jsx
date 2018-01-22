import React, { Component, Fragment } from 'react';
import { pick } from 'ramda';
import { connect } from 'react-redux';
import Navbar from './Navbar';


const ChooseCategory = ({ categories }) => (
  <div className="field">
    <label className="label">文章分类</label>
    <div className="control">
      <div className="tags">
        {categories.map(({ name }) =>
          <Fragment key={name}>
          <input type="radio"
            id={name + 'abcdefg'}
            name="choose-category"
            style={{ position: 'absolute', left: -9999 }}
          />
          <label
            className="tag is-medium"
            htmlFor={name + 'abcdefg'}>
            {name}
          </label>
        </Fragment>
        )}
      </div>
    </div>
  </div>
);

const GeneralInput = ({ eleType, inputRef, ...props }) => (
  <div className="field">
    <label className="label">{props.name}</label>
    <div className="control">
      {
        React.createElement(
          eleType,
          { ...props, ref: inputRef, className: props.className || eleType }
        )
      }
    </div>
  </div>
);
class EditPost extends Component {
  authorInput = null;
  titleInput = null;
  bodyInput = null;
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
            name="作者"
            placeholder="请输入一个名字"
            inputRef={node => this.authorInput = node}
          />
          <ChooseCategory categories={this.props.categories.slice(1)} />
          <GeneralInput
            eleType="input"
            name="文章标题"
            placeholder="请输入标题"
            inputRef={node => this.titleInput = node}
          />
          <GeneralInput
            eleType="textarea"
            name="文章"
            placeholder="说点什么吧"
            inputRef={node => this.bodyInput = node}
          />
        </div>
      </section>
      </Fragment>
    );
  };
}
EditPost = connect(pick(['categories']))(EditPost);


export default EditPost;
