import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';

export default function requireAuthentication(Component) {

	class AuthenticatedComponent extends Component {

		componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth();
        }

        checkAuth = () => {
        	
        	const { auth, dispatch, location } = this.props;

            if (!auth.user) {
                let redirectAfterLogin = location.pathname;
                dispatch(pushPath(`/login?redirectAfterLogin=${redirectAfterLogin}`));
            }
        }

        render() {

        	const { auth } = this.props;

            return (
                <div>
                    { 
                    	auth.user 
                    	? <Component {...this.props}/> 
                    	: null 
                    }
                </div>
            )

        }
	}

	const mapStateToProps = (state) => ({
		auth: state.auth
	});

    return connect(mapStateToProps)(AuthenticatedComponent);
} 