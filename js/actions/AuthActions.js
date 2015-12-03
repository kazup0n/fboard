import Dispatcher from '../Dispatcher.js';
import Firebase from 'firebase';
import authStore from '../stores/AuthStore.js';
import MessageActions from './MessageActions.js';
import SlideActions from './SlideActions.js';

let firebase = new Firebase('https://fboard.firebaseio.com/');

class AuthActions {

    static login(){
		if(firebase.getAuth()){
			AuthActions._authCallback(null, firebase.getAuth());
		}else{
			firebase.authWithOAuthPopup('google', AuthActions._authCallback);
		}
    }

    static _authCallback(error, authData){
        if(!error){
            Dispatcher.dispatch({actionType: 'login', authData: authData});
			MessageActions.watchMessages();
			SlideActions.getSlides();
        }
    }

    static  logout(){
        firebase.unauth();
        Dispatcher.dispatch({actionType: 'logout'});
		window.location.reload();
    }
}

AuthActions.login();

export default AuthActions;