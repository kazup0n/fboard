import React from 'react';
import { browserHistory, Router, Route, Link } from 'react-router'
import _ from 'lodash';
var Markdown = require('react-remarkable');

export default class PresentationView extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            slideIndex: 0
        };
    }

    componentDidMount(){
        this.interval = setInterval((function(){
            let count = _.isArray(this.props.slides) ? this.props.slides.length: 1;
            this.setState({slideIndex: ++this.state.slideIndex % count});
        }).bind(this), 5000);
    }

 componentWillUnmount() {
    clearInterval(this.interval);
  }

    static get propTypes(){
        return {
            'slides': React.PropTypes.array,
        }
    }


    render(){
        let slide = _.isArray(this.props.slides) && this.props.slides.length > this.state.slideIndex ? this.props.slides[this.state.slideIndex]: {body: '',  title: ''};
        let markdown = `# ${slide.title}\n${slide.body}`;
        return <div><Markdown source={markdown} /></div>;
    }

}