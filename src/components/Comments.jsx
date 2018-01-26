import React from 'react';
import '../styles/comment.css';

const headTitle = {
  fontSize: 16,
  color: 'rgba(0,0,0,.68)',
  fontWeight: 600,
};
const divider = {
  marginBottom: 20,
  borderTop: '2px solid rgba(0,0,0,.54)',
  width: 75,
};

const Comments = err => (
  <div>
    {err ? (
      <h1 className="title has-text-danger">评论获取失败，请重试</h1>
    ) : (
      <section className="comment-block">
        <h4 style={headTitle}>Response</h4>
        <div className="field">
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="Write a response"
            />
          </div>
        </div>
        <div style={divider} />
        <div className="comment box">
          <header className="comment-header">
            <p className="author">nihao</p>
            <time>2014/12/12</time>
          </header>
          <article className="body">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus porro soluta eveniet blanditiis nulla minus quasi
              voluptates, quia corrupti aliquid! Corporis necessitatibus, dicta
              iusto soluta mollitia iste enim aspernatur eveniet.
            </p>
          </article>
        </div>
        <div className="comment box">
          <header className="comment-header">
            <p className="author">nihao</p>
            <time>2014/12/12</time>
          </header>
          <article className="body">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus porro soluta eveniet blanditiis nulla minus quasi
              voluptates, quia corrupti aliquid! Corporis necessitatibus, dicta
              iusto soluta mollitia iste enim aspernatur eveniet.
            </p>
          </article>
        </div>
      </section>
    )}
  </div>
);

export default Comments;
