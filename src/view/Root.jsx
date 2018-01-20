import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';
import { fetchAllCategories } from '../actions/category';
import { getCategories } from '../reducers/category';
import { getPostWith, isPostsFetching } from '../reducers/posts';
import ContentLoader from 'react-content-loader';
import CategoryNav from './Category';
const ListLoader = () => <ContentLoader type="list"/>;

class Root extends Component {
  componentDidMount() {
    const { fetchPosts, category, fetchAllCategories } = this.props;
    Promise.all([
      fetchPosts(category),
      fetchAllCategories()
    ]);
  }

  componentDidUpdate(prevProps) {
    const { fetchPosts, category } = this.props;
    if (prevProps.category !== category) {
      fetchPosts(category);
    }
  }

  render() {
    const { isPostsFetching, posts, categories, category } = this.props;
    return (
      <Fragment>
        <CategoryNav categories={categories} />
        <section className="section">
          <h1 className="title">{category}</h1>
          <hr/>
          {isPostsFetching ?
            <div style={{ margin: '0 auto', width: 500}}>
              <ListLoader />
            </div>:
            <p>{JSON.stringify(posts)}</p>}
        </section>
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
