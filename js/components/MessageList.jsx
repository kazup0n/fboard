import React from 'react';
import messageStore from '../stores/MessageStore.js';

function getMessages(){
	return messageStore.getMessages();
}



class MessageListItem extends React.Component {

    static get propTypes(){
        return {
			message: React.PropTypes.object
        };
    }

    render(){
		let msg = this.props.message;
		return <li>{msg}</li>;
	}

}

export default class MessageList extends React.Component {

    constructor(props){
        super(props);
        this.state = {messages: getMessages()};
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount(){
        messageStore.onChange(this.onChange);
    }

    componentWillUnMount(){
        messageStore.off(this.onChange);
    }

    render() {
        let items =  this.createItems();
        return <ul>{items}</ul>;
    }

	createItems(){
		let messages = [];
		this.state.messages.forEach(function(msg){
			messages.push(<MessageListItem key={msg.key} message={msg} />);
			return true;
		});
		return messages;
    }

    onChange(){
        this.setState({messages: getMessages()});
    }

}
