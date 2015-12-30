/**
 * Entry point
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';
import store from './store/store';
import App from './containers/App/App';
import Login from './containers/Login/Login';
import Timetable from './components/Timetable/Timetable';

const history = createHistory();

render(
	<Provider store={store}>
		<Router history={history}>
	    	<Route path="/" component={App}>
		      <Route path="/login" component={Login} />
		      <Route path="/make-appointment" component={Timetable} />
		    </Route>
		</Router>
  	</Provider>,
  	document.getElementById('app')
);