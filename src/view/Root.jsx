import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';


class Root extends Component {
  componentDidMount() {
    this.props.fetchPosts(this.props.category);
  }

  render() {
    return <h1>hello</h1>;
  }
}

const mapStateToProps = (state, { match: { params } }) => {
  return {
    category: params.category
  };
}

export default connect(mapStateToProps, { fetchPosts })(Root);
