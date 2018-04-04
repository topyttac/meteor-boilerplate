import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';
import './main.html';

Router.configure({
  noRoutesTemplate: 'noRoutesTemplate',
 });
 
Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});
