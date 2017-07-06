/* global window */

/**
 * @author pmeijer / https://github.com/pmeijer
 */

// Libraries
import React, { Component } from 'react';

export default class TermsAndConditions extends Component {
    constructor(props) {
        super(props);
    }
    //
    // componentDidMount() {
    //     this.props.loginClient.getGmeConfig()
    //         .then((gmeConfig) => {
    //             this.setState({
    //                 allowGuests: gmeConfig.authentication.allowGuests,
    //                 allowUserRegistration: gmeConfig.authentication.allowUserRegistration
    //             });
    //         });
    // }

    render() {
        return <div className="register-box-body" style={{float: 'left', width: '360px'}}>
            <p className="login-box-msg">
                <b>Disclaimer</b>
            </p>
            <div className="terms-and-conditions-text">
                The contents of the <i>Model Based Assurance</i> website have been prepared for the <i>Radiation Effects and
                Reliability Assurance</i> research community for informational purposes that are not export controlled.
                Your privacy and security are important to us; please <b>do not</b> upload any data that is <b>controlled
                unclassified information, export controlled, or considered to be intellectual property</b>.
            </div>
        </div>;
    }
}
