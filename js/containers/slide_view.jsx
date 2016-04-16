import React from 'react';

import SlideEdit from './../components/slides/slide_edit.jsx'
import SlideList from './../components/slides/slide_list.jsx'

export default class SlideView extends React.Component {

   static get propTypes(){
        return {
            slides: React.PropTypes.array,
            actions: React.PropTypes.object
        };
    }

    constructor(props){
        super(props);
        this.state = {
            selectedSlide: null
        };
    }

    render(){
        let slides = this.props.slides;
        return (<div className="pure-g">
        <div className="pure-u-6-24 slide-list">
                <SlideList slides={slides} onSelect={this.onSlideSelect.bind(this)} />
        </div>
        <div className="pure-u-18-24">
                <SlideEdit slide={this.state.selectedSlide}
                    onSave={this.onSlideSave.bind(this)}
                    onCancel={this.onSlideRevert.bind(this)} />
        </div>
        </div>);
    }

    onSlideSelect(slide){
        this.setState({selectedSlide: slide});
    }

    onSlideSave(slide){
        if(slide.id){
            this.props.actions.updateSlide(slide);
        }else{
            this.props.actions.saveSlide(slide);
        }
    }

    onSlideRevert(slide){

    }


}