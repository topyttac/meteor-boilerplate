import React from 'react';
import { Link } from 'react-router';

export default () => {
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1 className="set--margin-bottom">404 - Page Not Found</h1>
        <p className="set--margin-bottom">Hmmm, we're unable to find that page.</p>
        <Link to="/" className="button button--link">HEAD HOME</Link>
      </div>
    </div>
  );
};
