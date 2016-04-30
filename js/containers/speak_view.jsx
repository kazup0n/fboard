import React from 'react';

import {speak}  from '../firebase';


export default class SpeakView extends React.Component {

   static get propTypes(){
        return {
            actions: React.PropTypes.object
        };
    }

  constructor(props){
        super(props);
        this.state = {
            text: ''
        };
    }

    render(){
        return <div>
            <form className="pure-form">
                <fieldset>
                    <legend>Voice Over fboard</legend>
                    <input type="text" placeholder="hello!" value={this.state.text} onChange={this.onTextChange.bind(this)} />
                    <a onClick={this.onSendClick.bind(this)} className="pure-button pure-button-primary">speak</a>
                </fieldset>
        </form>
        </div>;
    }

    onTextChange(e){
        this.setState({text: e.currentTarget.value});
    }

    onSendClick(){
        speak(this.state.text).then(()=>{
            this.setState({text: ''});
        });
    }

}