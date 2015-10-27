import {EventEmitter} from 'events';
import Dispatcher from '../Dispatcher.js';

const CHANGE_EVENT = 'authChange';

let _token = null;
let _id = null;

class AuthStore extends EventEmitter {

    constructor(){
        super();
        Dispatcher.register(this.handle.bind(this));
    }

    emitChange(){
        this.emit(CHANGE_EVENT);
    }

    onChange(cb){
        this.on(CHANGE_EVENT, cb);
    }

    off(cb){
        this.removeListener(CHANGE_EVENT, cb);
    }

    isLoggedIn(){
        return _token !== null;
    }

    token(){
        return _token;
    }

	userId(){
		return _id;
	}

    handle(action){
        switch(action.actionType){
            case 'login':
                _token = action.authData.google.accessToken;
				_id = action.authData.uid;
                this.emitChange();
                break;
            case 'logout':
                _token = null;
                this.emitChange();
                break;
        }
    }
}

let store = new AuthStore();

export default store;