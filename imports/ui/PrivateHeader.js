import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';

const PrivateHeader = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <div>
          <h1 className="header__title">{props.title}</h1>
          <h3 className="reset--margin">{props.subtitle}</h3>
        </div>
        <button className="button button--link-text button--black" onClick={() => Accounts.logout()}>Logout</button>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
};

export default PrivateHeader;
