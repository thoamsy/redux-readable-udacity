import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';
import { fetchAllCategories } from '../actions/category';
import { fetchSavedPost } from '../actions/editPost';
import { getPost, isPostsFetching, getCategories, getEdited } from '../reducers/';
import ContentLoader from 'react-content-loader';
import Navbar from './Navbar';
import { CategoriesItem, EditPostItem } from './CategoriesNavbar';
import v4 from 'uuid/v4';
import PostList from '../view/PostList';
const ListLoader = () => <ContentLoader type="list"/>;

class Root extends Component {
  componentDidMount() {
    const { fetchPosts, category, fetchAllCategories } = this.props;
    fetchSavedPost();
    let pos = 0;
    fetchAllCategories()
    .then(() => this.props.categories)
    .then(function preload(categories) {
      if (!categories.length) return;
      categories.slice(0, 3).map(({ name }) => fetchPosts(name));
      pos += 3;
      return preload(categories.slice(pos));
    });
  }

  componentDidUpdate(prevProps) {
    const { fetchPosts, category } = this.props;
    if (prevProps.category !== category) {
      fetchPosts(category);
    }
  }

  render() {
    const { isPostsFetching, posts, categories, category, edited } = this.props;
    return (
      <Fragment>
        <Navbar categories={categories}>
          {
            (categories) => <CategoriesItem categories={categories} />
          }
          <EditPostItem id={edited.id || v4()}/>
        </Navbar>

        <section className="section"
          style={{ backgroundColor: '#f6f6f6' }}>
          <h1 className="title">{category}</h1>
          <hr />
          {isPostsFetching ?
            <div style={{ margin: '0 auto', width: 500 }}>
              <ListLoader />
            </div> :
            <PostList posts={posts} />
          }
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, { match: { params } }) => {
  const { category = 'all' } = params;
  return {
    category,
    isPostsFetching: isPostsFetching(state, category),
    posts: getPost(state, category),
    categories: getCategories(state),
    edited: getEdited(state)
  };
};

export default connect(mapStateToProps, { fetchPosts, fetchAllCategories, fetchSavedPost })(Root);
