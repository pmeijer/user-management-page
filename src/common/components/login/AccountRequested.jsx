/* global window */

/**
 * @author pmeijer / https://github.com/pmeijer
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { RegisterForm as STYLE } from '../../../client/style';

export default class AccountRequested extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="register-box-body" style={STYLE.fieldBox}>
            <p className="login-box-msg">
                An account has been requested
            </p>
            <div className="account-requested-text">
                A request has been send to a site-admin. Monitor your email address provided for additional instructions
                once the request has been accepted.
            </div>
        </div>;
    }
}

AccountRequested.propTypes = {
    basePath: PropTypes.string,
    loginClient: PropTypes.object
};

