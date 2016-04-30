import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import Menu from './../components/menu.jsx';
import {isLoggedIn, logout, login, startVoiceListening}  from '../firebase';
import Login from '../components/Login.jsx';

class App extends React.Component {

    static get propTypes(){
        return {
            slides: React.PropTypes.array.isRequired,
            actions: React.PropTypes.object.isRequired,
            children: React.PropTypes.object.isRequired
        };
    }

     componentDidMount(){
        if(isLoggedIn()){
            this.props.actions.getSlides();
            startVoiceListening();
        }
 	 }

    render(){
		if(isLoggedIn()){
			return <div>
			<Menu loggedIn={isLoggedIn()} login={login} logout={logout} />
			{React.cloneElement(this.props.children, {
				slides: this.props.slides,
				actions: this.props.actions
			})}
			</div>;
		}else{
			return <Login onSubmit={this.onLoginSubmit.bind(this)} />;
		}
    }

	onLoginSubmit(credential){
		login(credential.email, credential.password).then(undefined, function(e){
			alert(e);
		});
	}
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(Actions, dispatch)};
}

function mapStateToProps(state){
    return {
        slides: state.slides.slides
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);