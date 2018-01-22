import React, { Component } from 'react';
import { pick } from 'ramda';
import { connect } from 'react-redux';

const ChooseCategory = ({ categories }) => (
  <div className="tags">
    {categories.map(category => <a className="tag">{category.name}</a>)}
  </div>
);
class EditPost extends Component {
  render() {
    return (
      <form>
        <ChooseCategory categories={this.props.categories.slice(1)} />
      </form>
    );
  };
}
EditPost = connect(pick(['categories']))(EditPost);


export default EditPost;
