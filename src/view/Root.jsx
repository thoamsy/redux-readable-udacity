import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';
import { isPostsFetching, getPostWith } from '../reducers/index';
import ContentLoader from 'react-content-loader';
const ListLoader = () => <ContentLoader type="list" />;

class Root extends Component {
  componentDidMount() {
    const { fetchPosts, category } = this.props;
    fetchPosts(category);
  }

  componentDidUpdate() {
    console.log(1);
  }

  render() {
    const { isPostsFetching, posts } = this.props;
    return (
      <Fragment>
        {isPostsFetching ? <ListLoader /> : <p>{JSON.stringify(posts)}</p>}
      </Fragment>
    )
  }
}

const mapStateToProps = (state, { match: { params } }) => {
  const { category = 'all' } = params;
  return {
    category,
    isPostsFetching: isPostsFetching(state, category),
    posts: getPostWith(state, category)
  };
}

export default connect(mapStateToProps, { fetchPosts })(Root);
