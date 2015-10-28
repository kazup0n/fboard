import React  from 'react';
import AuthActions from '../actions/AuthActions.js';
import authStore from '../stores/AuthStore.js';

function isLoggedIn(){
    return authStore.isLoggedIn();
}

export default class LoginButton extends React.Component {

    constructor(props){
        super(props);
        this.state = {loggedIn: isLoggedIn()};
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount(){
        authStore.onChange(this.onChange);
    }

    componentWillUnmount(){
        authStore.off(this.onChange);
    }


    render(){
		if(!this.state.loggedIn){
            return <button onClick={this.onLoginClick.bind(this)} className="btn btn-primary btn-lg">login</button>;
		} else {
            return <a onClick={this.onLogoutClick.bind(this)}>logout</a>;
        }
    }

    onLoginClick(){
        AuthActions.login();
    }

    onLogoutClick(){
        AuthActions.logout();
    }

    onChange(){
        this.setState({loggedIn: isLoggedIn()});
    }

}