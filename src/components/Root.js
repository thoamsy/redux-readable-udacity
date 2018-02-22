import React, { Component, Fragment } from 'react';
import PostList from '../components/PostList';
import { List } from 'react-content-loader';
import Navbar from './Navbar';
import SortControl from './SortControl';
import v4 from 'uuid/v4';
import { connect } from 'react-redux';
import { evolve, not } from 'ramda';
import { CategoriesItem, EditPostItem } from './CategoriesNavbar';
import { fetchPosts, switchPostSortWay } from '../actions/posts';
import { fetchAllCategories } from '../actions/category';
import { fetchSavedPost } from '../actions/editPost';
import {
  getPostsByCategory,
  isPostsFetching,
  getCategories,
  getEdited,
  getPostSortWay,
} from '../reducers/';

const sectionStyle = {
  marginTop: '2rem',
  backgroundColor: '#f6f6f6',
};
const titleStyle = {
  textTransform: 'capitalize',
};

class Root extends Component {
  // 导航栏的三明治效果，这个仅仅是 UI 变换，为了方便就放在 state 里
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

  onSwitchSortWay = () => {
    this.props.switchPostSortWay(this.props.category);
  };

  render() {
    const {
      isPostsFetching,
      posts,
      categories,
      category,
      edited,
      sortWay,
    } = this.props;
    return (
      <Fragment>
        <Navbar
          categories={categories}
          onToggleMenu={this.onToggleMenu}
          isNavbarToggle={this.state.isToggle}
        >
          {categories => <CategoriesItem categories={categories} />}
          <EditPostItem id={edited.id || v4()} />
        </Navbar>

        <section className="section" style={sectionStyle}>
          <h1 className="title" style={titleStyle}>
            {category}
          </h1>
          <SortControl sortWay={sortWay} onClick={this.onSwitchSortWay} />
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
    sortWay: getPostSortWay(state, category),
  };
};

export default connect(mapStateToProps, {
  fetchPosts,
  fetchAllCategories,
  switchPostSortWay,
  fetchSavedPost,
})(Root);
