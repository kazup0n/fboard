import {EventEmitter} from 'events';
import Dispatcher from '../Dispatcher.js';

const CHANGE_EVENT = 'filesChange';

let _files = [];
let _likes = null;

class GFileStore extends EventEmitter {

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

    getFiles(){
        return _files;
    }

	numLiked(fileId){
		if(_likes){
			return _likes.child(fileId).numChildren();
		}else{
			return 0;
		}
	}

	isLiked(fileId, userId){
		if(!_likes){
			return false;
		}
		return _likes.child(fileId).hasChild(userId);
	}

    handle(action){
        switch(action.actionType){
            case 'getFiles':
                _files = action.files;
                this.emitChange();
                break;
			case 'likeUpdate':
				_likes = action.likes;
				this.emitChange();
        }
    }
}

export default new GFileStore();