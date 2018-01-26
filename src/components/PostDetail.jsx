import React, { Fragment, Component } from 'react';
import fetchComments from '../actions/comments';
import { connect } from 'react-redux';
const leftTop = {
  position: 'absolute',
  left: 20,
  top: 20,
};
class PostDetail extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    const { id } = match.params;
    const { url } = match;
    dispatch(fetchComments(url, id));
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <article className="content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui a
              harum sint repellendus tempore voluptatem veniam officia, magnam
              vitae debitis nisi aperiam, obcaecati repellat ipsum quibusdam,
              placeat praesentium suscipit similique.
            </article>
          </div>
        </section>
        <a className="icon has-text-grey" style={leftTop}>
          <i className="fa fa-times fa-2x" />
        </a>
      </Fragment>
    );
  }
}

export default connect()(PostDetail);
