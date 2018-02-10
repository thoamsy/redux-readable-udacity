import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { List } from 'react-content-loader';
import { evolve, not } from 'ramda';
import Navbar from './Navbar';
import v4 from 'uuid/v4';

import PostList from '../components/PostList';
import { CategoriesItem, EditPostItem } from './CategoriesNavbar';
import { fetchPosts } from '../actions/posts';
import { fetchAllCategories } from '../actions/category';
import { fetchSavedPost } from '../actions/editPost';
import {
  getPostsByCategory,
  isPostsFetching,
  getCategories,
  getEdited,
} from '../reducers/';

class Root extends Component {
  state = {
    isToggle: false,
  };

  componentDidMount() {
    const { fetchPosts, fetchAllCategories } = this.props;
    let pos = 0;
    Promise.all([fetchSavedPost(), fetchAllCategories()])
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

  onToggleMenu = ({ target }) => {
    this.setState(
      evolve({
        isToggle: not,
      })
    );
  };

  render() {
    const { isPostsFetching, posts, categories, category, edited } = this.props;
    return (
      <Fragment>
        <Navbar
          categories={categories}
          onToggleMenu={this.onToggleMenu}
          isNavbarToggle={this.state.isToggle}>
          {categories => <CategoriesItem categories={categories} />}
          <EditPostItem id={edited.id || v4()} />
        </Navbar>

        <section className="section" style={{ backgroundColor: '#f6f6f6' }}>
          <h1 className="title">{category}</h1>
          <hr />
          {isPostsFetching ? (
            <div style={{ margin: '0 auto', width: 500 }}>
              <List />
            </div>
          ) : (
            <PostList posts={posts} />
          )}
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
    posts: getPostsByCategory(state, category),
    categories: getCategories(state),
    edited: getEdited(state),
  };
};

export default connect(mapStateToProps, {
  fetchPosts,
  fetchAllCategories,
  fetchSavedPost,
})(Root);
