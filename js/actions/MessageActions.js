let messageRef  = new Firebase('https://fboard.firebaseio.com/messages');
import  Dispatcher from '../Dispatcher.js';

export default class MessageActions {
	static watchMessages(){
		messageRef.on('child_added', function(msg){
			var synthes = new SpeechSynthesisUtterance(msg.message);
			synthes.lang = "ja-JP";
			synthes.volume = 5;
			speechSynthesis.speak(synthes);
		});
		messageRef.on('value', function(messages){
			Dispatcher.dispatch({actionType: 'getMessages', messages: messages});
		});

		let timestamp = new Date();
		timestamp.setDate(timestamp.getDate()-2);
		messageRef.endAt(timestamp.toString()).on("child_added", function(snap){
			snap.ref().remove();
		});
	}

	static postMessage(msg){
		messageRef.push({
			message: msg,
			postedAt: Date.now()
		});
	}

}

