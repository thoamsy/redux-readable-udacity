import React from 'react';
import '../styles/comment.css';
import distanceInWords from 'date-fns/distance_in_words';
import { List } from 'react-content-loader';

const headTitle = {
  fontSize: 16,
  color: 'rgba(0,0,0,.68)',
  fontWeight: 600,
  margin: '10px 0',
};
const divider = {
  marginBottom: 20,
  borderTop: '2px solid rgba(0,0,0,.54)',
  width: 75,
};

const Comments = ({ err, comments, isFetching, onChange, currentInput, submitComment, isCommenting }) => {
  if (err) {
    return <h1 className="title has-text-danger">评论获取失败，请重试</h1>;
  }
  if (isFetching) {
    return (
      <div style={{ margin: '0 auto', width: 500 }}>
        <List />
      </div>
    );
  }
  return (
    <section className="comment-block">
      <h4 style={headTitle}>Response</h4>
      <div className="field is-grouped">
        <div className="control is-expanded">
          <input
            type="text"
            className="input"
            placeholder="Write a response"
            onChange={onChange}
            value={currentInput}
          />
        </div>
        <div className="control">
          <a className="button is-info" onClick={submitComment}>评论</a>
        </div>
      </div>
      <div style={divider} />
      {!!comments.length ? (
        comments.map(comment => (
          <div className="comment box" key={comment.id}>
            <header className="comment-header">
              <p className="author">{comment.author}</p>
              <time>
                {distanceInWords(comment.timestamp, new Date(), {
                  addSuffix: true,
                })}
              </time>
            </header>
            <article className="body">
              <p>{comment.body}</p>
            </article>
          </div>
        ))
      ) : (
        <h2 className="subtitle">快来留下第一个评论吧！</h2>
      )}
    </section>
  );
};

export default Comments;
