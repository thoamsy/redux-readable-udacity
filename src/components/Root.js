import React, { Component, Fragment } from 'react';
import v4 from 'uuid/v4';
import { List } from 'react-content-loader';
import { connect } from 'react-redux';
import { evolve, not } from 'ramda';
import styled from 'styled-components';

import PostList from '../components/PostList';
import Navbar from './Navbar';
import SortControl from './SortControl';
import { CategoriesItem, EditPostItem } from './CategoriesNavbar';
import { fetchPosts, switchPostSortWay } from '../actions/posts';
import { fetchSavedPost } from '../actions/editPost';
import {
  getPostsByCategory,
  isPostsFetching,
  getCategories,
  getEdited,
} from '../reducers/';

const Section = styled.section`
  margin-top: 2rem;
  background-color: #f6f6f6;
`;
const CategoryTitle = styled.h1`
  text-transform: capitalize;
`;

class Root extends Component {
  // 导航栏的三明治效果，这个仅仅是 UI 变换，为了方便就放在 state 里
  state = {
    isToggle: false,
  };

  componentDidMount = () => {
    this.props.fetchSavedPost();
  };

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
    const { isPostsFetching, posts, categories, category, edited } = this.props;

    const { sortWay = 'timestamp' } = posts;
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

        <Section className="section">
          <CategoryTitle className="title">{category}</CategoryTitle>
          <SortControl sortWay={sortWay} onClick={this.onSwitchSortWay} />
          <hr />
          {isPostsFetching ? (
            <div style={{ margin: '0 auto', width: 500 }}>
              <List />
            </div>
          ) : (
            <PostList posts={posts} />
          )}
        </Section>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, { category = 'all' }) => {
  return {
    category,
    isPostsFetching: isPostsFetching(state, category),
    posts: getPostsByCategory(state, category),
    categories: getCategories(state),
    edited: getEdited(state),
  };
};

export default connect(
  mapStateToProps,
  {
    fetchPosts,
    switchPostSortWay,
    fetchSavedPost,
  }
)(Root);
