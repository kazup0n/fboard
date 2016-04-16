import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import Menu from './../components/menu.jsx';
import {isLoggedIn, logout, login, startVoiceListening}  from '../firebase';

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
        }else{
            login();
        }
    }

    render(){
        return <div>
            <Menu loggedIn={isLoggedIn()} login={login} logout={logout} />
          {React.cloneElement(this.props.children, {
                slides: this.props.slides,
                actions: this.props.actions
            })}
        </div>;
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