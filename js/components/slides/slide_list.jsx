import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router'

class SlideListItem extends React.Component {

    static get propTypes(){
        return {
            'slide': React.PropTypes.object,
            'onClick': React.PropTypes.func
        }
    }

    render(){
        let slide = this.props.slide;
        return <li>
                <a href="#" onClick={this.onClick.bind(this)}>{slide.title}</a>
                &nbsp;&nbsp;<i className="fa fa-chevron-circle-right"></i>
            </li>;
    }

    onClick(e){
        this.props.onClick(this.props.slide);
    }

}

export default class SlideList extends React.Component {

    static get propTypes(){
        return {
            'slides': React.PropTypes.array,
            'onSelect': React.PropTypes.func
        };
    }



    render(){
        let items = [<li key="addNewSlide"><a href="#" onClick={this.onAddNewItem.bind(this)}><i className="fa fa-plus-circle" aria-hidden="true">Add new slide.</i></a></li>];
			items=items.concat(_.map(this.props.slides, (item)=>{
            return <SlideListItem key={item.id} slide={item}  onClick={this.props.onSelect.bind(this)} />;
        }));
        return <ul>{items}</ul>;
    }

    onSelectItem(item){
        this.props.onSelect(item);
    }

	onAddNewItem(){
		this.props.onSelect({})
	}

}