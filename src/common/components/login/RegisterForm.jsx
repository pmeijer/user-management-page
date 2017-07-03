/**
 * @author pmeijer / https://github.com/pmeijer
 * @author patrickkerrypei / https://github.com/patrickkerrypei
 */

// Libraries
import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
// Self-defined
import LoginField from '../content/widgets/LoginField';
import { verifyEmail, verifyPassword, verifyUserOrOrganizationId, verifyUserName, verifyOrganizationField}
    from '../../../client/utils/loginUtils';
// Style
import { RegisterForm as STYLE } from '../../../client/style';

export default class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            creating: false,
            agreeToTerms: false,
            confirmPassword: '',
            email: '',
            // State so a different message for duplicate userId can be shown
            invalidMessage: {
                confirmPassword: "Passwords must match",
                password: "Password must be at least 3 characters long and must not be " +
                "a poor password such as 'password'",
                email: "Invalid email",
                userId: "Username must only contain letters, numbers, and the underscore" +
                        " and must be at least 3 characters long",
                userName: "Provide a first and a surname separated by space",
                orgName: "Provide an organization",
                orgAddr: "Provide the address of your organization",
                orgCountry: "Provide the country of your organization"
            },
            userId: '',
            userName: '',
            orgName: '',
            orgAddr: '',
            orgCountry: '',
            validCredentials: {
                agreeToTerms: true,
                confirmPassword: true,
                password: true,
                email: true,
                userId: true,
                userName: true,
                orgName: true,
                orgAddr: true,
                orgCountry: true
            }
        };

        // Event handlers
        this.checkAllFields = this.checkAllFields.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.checkConfirmPassword = this.checkConfirmPassword.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.checkUserId = this.checkUserId.bind(this);
        this.checkUserName = this.checkUserName.bind(this);
        this.checkOrgName = this.checkOrgName.bind(this);
        this.checkOrgAddr = this.checkOrgAddr.bind(this);
        this.checkOrgCountry = this.checkOrgCountry.bind(this);

        this.onAgreeToTermsChange = this.onAgreeToTermsChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.atFailedNewUser = this.atFailedNewUser.bind(this);
        this.onUserIdChange = this.onUserIdChange.bind(this);
        this.onUserNameChange = this.onUserNameChange.bind(this);
        this.onOrgNameChange = this.onOrgNameChange.bind(this);
        this.onOrgAddrChange = this.onOrgAddrChange.bind(this);
        this.onOrgCountryChange = this.onOrgCountryChange.bind(this);
    }

    componentDidMount() {

    }

    // Check fields
    checkAllFields() {
        this.setState({
            validCredentials: {
                agreeToTerms: this.state.agreeToTerms,
                confirmPassword: this.state.password === this.state.confirmPassword,
                email: verifyEmail(this.state.email),
                userId: verifyUserOrOrganizationId(this.state.userId),
                password: verifyPassword(this.state.password),
                userName: verifyUserName(this.state.userName),
                orgName: verifyOrganizationField(this.state.orgName),
                orgAddr: verifyOrganizationField(this.state.orgAddr),
                orgCountry: verifyOrganizationField(this.state.orgCountry)
            }
        });
    }

    checkUserId() {
        this.setState({
            validCredentials: {
                agreeToTerms: this.state.validCredentials.agreeToTerms,
                email: this.state.validCredentials.email,
                userId: verifyUserOrOrganizationId(this.state.userId),

                confirmPassword: this.state.validCredentials.confirmPassword,
                password: this.state.validCredentials.password,

                userName: this.state.validCredentials.userName,
                orgName: this.state.validCredentials.orgName,
                orgAddr: this.state.validCredentials.orgAddr,
                orgCountry: this.state.validCredentials.orgCountry
            }
        });
    }

    checkPassword() {
        this.setState({
            validCredentials: {
                agreeToTerms: this.state.validCredentials.agreeToTerms,
                email: this.state.validCredentials.email,
                userId: this.state.validCredentials.userId,

                confirmPassword: this.state.validCredentials.confirmPassword,
                password: verifyPassword(this.state.password),

                userName: this.state.validCredentials.userName,
                orgName: this.state.validCredentials.orgName,
                orgAddr: this.state.validCredentials.orgAddr,
                orgCountry: this.state.validCredentials.orgCountry
            }
        });
    }

    checkConfirmPassword() {
        this.setState({
            validCredentials: {
                agreeToTerms: this.state.validCredentials.agreeToTerms,
                email: this.state.validCredentials.email,
                userId: this.state.validCredentials.userId,

                confirmPassword: this.state.password === this.state.confirmPassword,
                password: this.state.validCredentials.password,

                userName: this.state.validCredentials.userName,
                orgName: this.state.validCredentials.orgName,
                orgAddr: this.state.validCredentials.orgAddr,
                orgCountry: this.state.validCredentials.orgCountry
            }
        });
    }

    checkUserName() {
        this.setState({
            validCredentials: {
                agreeToTerms: this.state.validCredentials.agreeToTerms,
                email: this.state.validCredentials.email,
                userId: this.state.validCredentials.userId,

                confirmPassword: this.state.validCredentials.confirmPassword,
                password: this.state.validCredentials.password,

                userName: verifyUserName(this.state.userName),
                orgName: this.state.validCredentials.orgName,
                orgAddr: this.state.validCredentials.orgAddr,
                orgCountry: this.state.validCredentials.orgCountry
            }
        });
    }

    checkEmail() {
        this.setState({
            validCredentials: {
                agreeToTerms: this.state.validCredentials.agreeToTerms,
                email: verifyEmail(this.state.email),
                userId: this.state.validCredentials.userId,

                confirmPassword: this.state.validCredentials.confirmPassword,
                password: this.state.validCredentials.password,

                userName: this.state.validCredentials.userName,
                orgName: this.state.validCredentials.orgName,
                orgAddr: this.state.validCredentials.orgAddr,
                orgCountry: this.state.validCredentials.orgCountry
            }
        });
    }

    checkOrgName() {
        this.setState({
            validCredentials: {
                agreeToTerms: this.state.validCredentials.agreeToTerms,
                email: this.state.validCredentials.email,
                userId: this.state.validCredentials.userId,

                confirmPassword: this.state.validCredentials.confirmPassword,
                password: this.state.validCredentials.password,

                userName: this.state.validCredentials.userName,
                orgName: verifyOrganizationField(this.state.orgName),
                orgAddr: this.state.validCredentials.orgAddr,
                orgCountry: this.state.validCredentials.orgCountry
            }
        });
    }

    checkOrgAddr() {
        this.setState({
            validCredentials: {
                agreeToTerms: this.state.validCredentials.agreeToTerms,
                email: this.state.validCredentials.email,
                userId: this.state.validCredentials.userId,

                confirmPassword: this.state.validCredentials.confirmPassword,
                password: this.state.validCredentials.password,

                userName: this.state.validCredentials.userName,
                orgName: this.state.validCredentials.orgName,
                orgAddr: verifyOrganizationField(this.state.orgAddr),
                orgCountry: this.state.validCredentials.orgCountry
            }
        });
    }

    checkOrgCountry() {
        this.setState({
            validCredentials: {
                agreeToTerms: this.state.validCredentials.agreeToTerms,
                email: this.state.validCredentials.email,
                userId: this.state.validCredentials.userId,

                confirmPassword: this.state.validCredentials.confirmPassword,
                password: this.state.validCredentials.password,

                userName: this.state.validCredentials.userName,
                orgName: this.state.validCredentials.orgName,
                orgAddr: this.state.validCredentials.orgAddr,
                orgCountry: verifyOrganizationField(this.state.orgCountry)
            }
        });
    }

    onAgreeToTermsChange() {
        var prev = this.state.agreeToTerms;
        this.setState({
            agreeToTerms: !prev,
            validCredentials: {
                agreeToTerms: !prev,
                email: this.state.validCredentials.email,
                userId: this.state.validCredentials.userId,

                confirmPassword: this.state.validCredentials.confirmPassword,
                password: this.state.validCredentials.password,

                userName: this.state.validCredentials.userName,
                orgName: this.state.validCredentials.orgName,
                orgAddr: this.state.validCredentials.orgAddr,
                orgCountry: this.state.validCredentials.orgCountry
            }
        });
    }

    onPasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    onConfirmPasswordChange(event) {
        this.setState({
            confirmPassword: event.target.value
        });
    }

    onEmailChange(event) {
        this.setState({
            email: event.target.value
        });
    }

    onUserIdChange(event) {
        this.setState({
            userId: event.target.value
        });
    }

    onUserNameChange(event) {
        this.setState({
            userName: event.target.value
        });
    }

    onOrgNameChange(event) {
        this.setState({
            orgName: event.target.value
        });
    }

    onOrgAddrChange(event) {
        this.setState({
            orgAddr: event.target.value
        });
    }

    onOrgCountryChange(event) {
        this.setState({
            orgCountry: event.target.value
        });
    }

    onRegister() {
        let allValid = true;

        this.checkAllFields();

        Object.keys(this.state.validCredentials).forEach(key => {
            if (!this.state.validCredentials[key]) {
                allValid = false;
            }
        });

        if (allValid && this.state.agreeToTerms) {
            this.setState({
                creating: true
            });

            this.props.onNewUser(this.state.userId, this.state.password, this.state.email, {
                userName: this.state.userName,
                orgName: this.state.orgName,
                orgAddr: this.state.orgAddr,
                orgCountry: this.state.orgCountry
            })
                .then((status) => {
                    if (typeof status === 'number') {
                        this.atFailedNewUser(status);
                    }
                });

        } else {
            // Reset fields
            this.setState({
                agreeToTerms: false,
                password: '',
                confirmPassword: '',
                email: this.state.validCredentials.email ? this.state.email : '',
                userId: this.state.validCredentials.userId ? this.state.userId : '',
                userName: this.state.validCredentials.userName ? this.state.userName : '',
                orgName: this.state.validCredentials.orgName ? this.state.orgName : '',
                orgAddr: this.state.validCredentials.orgAddr ? this.state.orgAddr : '',
                orgCountry: this.state.validCredentials.orgCountry ? this.state.orgCountry : ''
            });
        }
    }

    atFailedNewUser(status) {
        this.setState({
            creating: false
        });

        if (status === 400) {
            // Immutability add-ons aren't worth installing for this one case
            this.setState({
                invalidMessage: {
                    email: "Email or user ID already taken",
                    userId: "Email or user ID already taken"
                },
                validCredentials: {
                    email: false,
                    userId: false
                }
            });
        } else {
            console.error(status);
        }
    }

    render() {

        let validAndNotEmpty = Object.keys(this.state.validCredentials).reduce(
            (previousValue, currentValue /* , currentIndex, array */) => {
                return previousValue && this.state.validCredentials[currentValue] && this.state[currentValue] !== '';
            }, true),
            titleMessage = this.props.allowUserCreation ? this.props.title : 'User Creation Not Permitted';

        return <div className="register-box-body" style={STYLE.fieldBox}>
            {titleMessage ?
                <p className="login-box-msg">{titleMessage}</p> : null}

            <form>

                {/* userName/Id */}
                <LoginField autoFocus={true}
                            hint="Name"
                            iconClass="glyphicon glyphicon-user"
                            disabled = {!this.props.allowUserCreation}
                            invalidMessage={this.state.invalidMessage.userName}
                            onBlur={this.checkUserName}
                            onInputChange={this.onUserNameChange}
                            valid={this.state.validCredentials.userName}
                            value={this.state.userName}/>

                <LoginField autoFocus={true}
                            hint="User ID"
                            iconClass="glyphicon glyphicon-certificate"
                            disabled = {!this.props.allowUserCreation}
                            invalidMessage={this.state.invalidMessage.userId}
                            onBlur={this.checkUserId}
                            onInputChange={this.onUserIdChange}
                            valid={this.state.validCredentials.userId}
                            value={this.state.userId}/>

                {/* password */}
                <LoginField hint="Password"
                            iconClass="glyphicon glyphicon-lock"
                            disabled = {!this.props.allowUserCreation}
                            invalidMessage={this.state.invalidMessage.password}
                            onBlur={this.checkPassword}
                            onInputChange={this.onPasswordChange}
                            textType="password"
                            valid={this.state.validCredentials.password}
                            value={this.state.password}/>

                {/* confirm password */}
                <LoginField hint="Confirm password"
                            iconClass="glyphicon glyphicon-log-in"
                            disabled = {!this.props.allowUserCreation}
                            invalidMessage={this.state.invalidMessage.confirmPassword}
                            onBlur={this.checkConfirmPassword}
                            onEnter={this.onRegister}
                            onInputChange={this.onConfirmPasswordChange}
                            textType="password"
                            valid={this.state.validCredentials.confirmPassword}
                            value={this.state.confirmPassword}/>

                {/* email */}
                <LoginField hint="Email"
                            iconClass="glyphicon glyphicon-envelope"
                            disabled = {!this.props.allowUserCreation}
                            invalidMessage={this.state.invalidMessage.email}
                            onBlur={this.checkEmail}
                            onInputChange={this.onEmailChange}
                            valid={this.state.validCredentials.email}
                            value={this.state.email}/>

                <LoginField hint="Organization Name"
                            iconClass="glyphicon glyphicon-briefcase"
                            disabled = {!this.props.allowUserCreation}
                            invalidMessage={this.state.invalidMessage.orgName}
                            onBlur={this.checkOrgName}
                            onInputChange={this.onOrgNameChange}
                            valid={this.state.validCredentials.orgName}
                            value={this.state.orgName}/>

                <LoginField hint="Organization Address"
                            iconClass="glyphicon glyphicon-bookmark"
                            disabled = {!this.props.allowUserCreation}
                            invalidMessage={this.state.invalidMessage.orgAddr}
                            onBlur={this.checkOrgAddr}
                            onInputChange={this.onOrgAddrChange}
                            valid={this.state.validCredentials.orgAddr}
                            value={this.state.orgAddr}/>

                <LoginField hint="Organization Country"
                            iconClass="glyphicon glyphicon-globe"
                            disabled = {!this.props.allowUserCreation}
                            invalidMessage={this.state.invalidMessage.orgCountry}
                            onBlur={this.checkOrgCountry}
                            onInputChange={this.onOrgCountryChange}
                            valid={this.state.validCredentials.orgCountry}
                            value={this.state.orgCountry}/>

                {/* Remember Check / Sign in attempt */}
                <div className="row">
                    {!this.state.validCredentials.agreeToTerms ? // eslint-disable-line no-negated-condition
                        <div className="row">
                            <div className="col-sm-12" style={{textAlign: "left"}}>
                                <span style={{color: "red", textAlign: "left"}}>Please agree to the terms</span>
                            </div>
                        </div> : null}

                    <div className="col-sm-8" style={STYLE.linkToLogin.column}>

                        <input type="checkbox" checked={this.state.agreeToTerms} onChange={this.onAgreeToTermsChange}/>
                            I agree to the terms
                        <br/>
                        <Link to={this.props.backLinkData.path}>
                            {this.props.backLinkData.title}
                        </Link>

                    </div>

                    <div className="col-sm-4">
                        {this.props.allowUserCreation && this.state.creating === false ?
                            <Button bsStyle="primary"
                                    disabled={!validAndNotEmpty}
                                    onClick={this.onRegister}
                                    style={STYLE.registerButton}>
                                Request Account
                            </Button> : null }
                    </div>

                </div>

            </form>

        </div>;
    }
}

RegisterForm.propTypes = {
    allowUserCreation: PropTypes.string,
    title: PropTypes.string,
    backLinkData: PropTypes.shape({
        title: React.PropTypes.string.isRequired,
        path: React.PropTypes.string.isRequired
    }),
    onNewUser: PropTypes.func.isRequired
};
