import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';
import { fetchAllCategories } from '../actions/category';
import { getCategories } from '../reducers/category';
import { getPostWith, isPostsFetching } from '../reducers/posts';
import ContentLoader from 'react-content-loader';
import CategoryNav from './Category';
const ListLoader = () => <ContentLoader type="list" />;

class Root extends Component {
  componentDidMount() {
    const { fetchPosts, category, fetchAllCategories } = this.props;
    Promise.all([
      fetchPosts(category),
      fetchAllCategories()
    ]);
  }

  componentDidUpdate() {
    console.log(1);
  }

  render() {
    const { isPostsFetching, posts, categories } = this.props;
    return (
      <Fragment>
        <CategoryNav categories={categories} />
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
    posts: getPostWith(state, category),
    categories: getCategories(state)
  };
}

export default connect(mapStateToProps, { fetchPosts, fetchAllCategories })(Root);
