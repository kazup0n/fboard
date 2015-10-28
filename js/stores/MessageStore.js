import {EventEmitter} from 'events';
import Dispatcher from '../Dispatcher.js';

const CHANGE_EVENT = 'messagesChange';

let _messages = [];

class MessageStore extends EventEmitter {

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

    getMessages(){
        return _messages ? _messages: [];
    }

    handle(action){
        switch(action.actionType){
            case 'getMessages':
				_messages = action.messages;
                this.emitChange();
                break;
        }
    }
}

export default new MessageStore();