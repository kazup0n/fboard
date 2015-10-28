import  Dispatcher from '../Dispatcher.js';

let messageRef  = new Firebase('https://fboard.firebaseio.com/messages');

export default class MessageActions {
	static watchMessages(){
		messageRef.orderByChild('postedAt').limitToLast(1).on('child_added', function(msg){
			var synthes = new SpeechSynthesisUtterance(msg.child('message').val());
			synthes.lang = "ja-JP";
			synthes.volume = 5;
			speechSynthesis.speak(synthes);
		});
		messageRef.on('value', function(messages){
			let msgs = [];
			messages.forEach(function(v){ return msgs.push(v);});
			Dispatcher.dispatch({actionType: 'getMessages', messages: msgs});
		});

		let timestamp = new Date();
		timestamp.setDate(timestamp.getDate()-2);
		messageRef.orderByChild("postedAt").endAt(timestamp.getTime()/1000).on("child_added", function(snap){
			snap.ref().remove();
		});
	}

	static postMessage(msg){
		messageRef.push({
			message: msg,
			postedAt: Date.now()/1000
		});
	}

}

