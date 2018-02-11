import React from 'react';
import { distanceInWords } from 'date-fns';

const Media = ({ avatar, author, body, children, timestamp }) => (
  <article className="media">
    <figure className="media-left">
      <p className="image is-64x64">
        <img
          src={avatar || 'https://bulma.io/images/placeholders/128x128.png'}
          alt="an avatar"
        />
      </p>
    </figure>
    <div className="media-content">
      <div className="content">
        <p>
          <strong>{author}</strong>
          <small>
            {distanceInWords(timestamp, new Date(), { addSuffix: true })}
          </small>
          <br />
          {body}
          <br />
          <span className="icon is-small">
            <i className="fa fa-heart" />
          </span>
        </p>
      </div>
      {children}
    </div>
  </article>
);

export default Media;
