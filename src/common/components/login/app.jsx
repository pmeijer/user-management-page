/**
 * @author pmeijer / https://github.com/pmeijer
 */

// Libraries
import React, { Component } from 'react';
// Self-defined
import LoginClient from '../../../client/rest_client/loginClient';
import TermsAndConditions from './TermsAndConditions';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.loginClient = new LoginClient();
    }

    render() {

        // Passing props through the route
        let FormWithBasePath = React.Children.map(this.props.children,
            child => React.cloneElement(child, {
                loginClient: this.loginClient,
                basePath: this.props.route.basePath
            }));

        return (
            <div className="login-box" style={{width: "800px"}}>
                <div className="login-logo">
                    Authentication
                </div>
                {FormWithBasePath}
                <TermsAndConditions/>
            </div>
        );
    }
}

App.propTypes = {
    route: React.PropTypes.shape({
        basePath: React.PropTypes.string.isRequired
    })
};
