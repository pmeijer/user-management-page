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
	    <p>
		The SEAM tool set and the associated models have been prepared for the Radiation Effects research community for informational purposes that are not export controlled. Your privacy and security are important to us; please <b>do not<.b> upload any data that is <b>controlled unclassified information, export controlled, or considered to be intellectual property</b>.<br>
		Note: The content of this website  and the SEAM tool set are considered “Beta Software”.<br>
 	        Vanderbilt University disclaims all warranties with regard to this software, including all implied warranties of merchantability and fitness.  In no event shall Vanderbilt University be liable for any special, indirect or consequential damages or any damages whatsoever resulting from loss of use, data or profits, whether in an action of contract, negligence or other tortious action, arising out of or in connection with the use or performance of this software.
	     </p>
            </div>
        </div>;
    }
}
