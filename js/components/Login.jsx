import React from 'react';

export default class Login extends React.Component {

	static get props(){
		return { onSubmit: React.PropTypes.func};
	}

	constructor(props){
		super(props);
		this.state = {credentials: {email: '', password: ''}};
	}

	render(){
		return <form className="pure-form">
				<fieldset>
				<input type="email" placeholder="Email" onChange={this.onEmailChange.bind(this)} />
				<input type="password" placeholder="Password" onChange={this.onPasswordChange.bind(this)} />
				<button onClick={this.onSubmit.bind(this)} type="button" className="pure-button pure-button-primary">Sign in</button>
			</fieldset>
		</form>;
	}

	onEmailChange(e){
		const cred = this.state.credentials;
		cred.email = e.target.value;
		this.setState(cred);
	}

	onPasswordChange(e){
		const cred = this.state.credentials;
		cred.password = e.target.value;
		this.setState(cred);
	}

	onSubmit(e){
		this.props.onSubmit(this.state.credentials);
	}

}


