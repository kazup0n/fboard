import React from 'react';
import {Link} from 'react-router'

export default class Menu extends React.Component {


     static get propTypes(){
        return {
            loggedIn: React.PropTypes.bool,
            login: React.PropTypes.func,
            logout: React.PropTypes.func
        };
    }

    render(){
        let authButtonClass = this.props.loggedIn ? 'fa fa-sign-out': 'fa fa-sign-in';
       return(
        <div className="pure-menu pure-menu-horizontal header-menu">
            <ul className="pure-menu-list">
                <li className="pure-menu-item">
                    <Link to="/" className="pure-menu-link"><i className="fa fa-home"></i></Link>
                </li>
                <li className="pure-menu-item">
                    <Link to="/slides" className="pure-menu-link"><i className="fa  fa-slideshare"></i></Link>
                </li>
                <li className="pure-menu-item">
                    <Link to="/voice" className="pure-menu-link"><i className="fa  fa-slideshare"></i></Link>
                </li>
                <li className="pure-menu-item">
                    <a className="pure-menu-link" onClick={this.onAuthButtonClick.bind(this)}><i className={authButtonClass}></i></a>
                </li>
        </ul>
    </div>);
    }

    onAuthButtonClick(){
        if(this.props.loggedIn){
            this.props.logout();
        }else{
            this.props.login();
        }
    }

}