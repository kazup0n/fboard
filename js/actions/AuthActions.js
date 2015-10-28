import Dispatcher from '../Dispatcher.js';
import Firebase from 'firebase';
import authStore from '../stores/AuthStore.js';
import MessageActions from './MessageActions.js';

let firebase = new Firebase('https://fboard.firebaseio.com/messages');

class AuthActions {

    static login(){
		firebase.authWithOAuthPopup('google', AuthActions._authCallback);
    }

    static _authCallback(error, authData){
        if(!error){
            Dispatcher.dispatch({actionType: 'login', authData: authData});
			MessageActions.watchMessages();
        }
    }

    static  logout(){
        firebase.unauth();
        Dispatcher.dispatch({actionType: 'logout'});
    }
}

export default AuthActions;