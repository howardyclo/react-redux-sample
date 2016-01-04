/**
 * Entry point
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, Redirect } from 'react-router';
import { createHistory } from 'history';
import { syncReduxAndRouter } from 'redux-simple-router';
import store from './store/store';
import App from './containers/App/App';
import Login from './containers/Login/Login';
import Home from './containers/Home/Home';
import Meeting from './containers/Meeting/Meeting';
import NotFound from './containers/NotFound/NotFound';
import requireAuthentication from './components/AuthenticatedComponent/AuthenticatedComponent';

/**
 * redux (store.routing) <-> redux-simple-router <-> history (history.location) <-> react-router
 */
const history = createHistory();

syncReduxAndRouter(history, store);

render(
	<Provider store={store}>
		<Router history={history}>
	    	<Route path="/" component={App}>
	    		<IndexRoute component={Login}/>
		    	<Route path="/login" component={Login} />
		    	<Route path="/home" component={requireAuthentication(Home)} />
		      	<Route path="/meeting" component={Meeting} />
		    </Route>
		    <Route path="*" component={NotFound} />
		</Router>
  	</Provider>,
  	document.getElementById('app')
);