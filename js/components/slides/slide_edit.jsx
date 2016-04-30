import React from 'react';
import _ from 'lodash';
var Markdown = require('react-remarkable');

export default class SlideEdit extends React.Component {

    static get propTypes(){
        return {
            'slide': React.PropTypes.object,
            'onSave': React.PropTypes.func,
            'onCancel': React.PropTypes.func,
			'onDelete': React.PropTypes.func
        };
    }

    constructor(props, context){
        super(props, context);
        this.state = {
            'slide': Object.assign({title: '', body: ''}, props.slide)
        };
    }

    componentWillReceiveProps(nextProps){
        this.state = {
            'slide': Object.assign({title: '', body: ''}, nextProps.slide)
        };
    }

    render(){
        let slide = this.state.slide;
       return  <form className="pure-form pure-form-stacked slide-edit ">
            <fieldset>
                <legend>Edit slide</legend>
                <div className="pure-control-group">
                    <label>title</label>
                    <input className="pure-input-2-3" type="text" name="slide-title" placeholder="title" value={slide.title} onChange={this.onTitleChange.bind(this)} />
              </div>
                <div className="pure-control-group">
                    <label>body</label>
                    <textarea className="pure-input-2-3" value={slide.body} onChange={this.onBodyChange.bind(this)} rows="15"></textarea>
              </div>
            <div>
                <a className="pure-button  pure-button-primary" onClick={this.onSaveClick.bind(this)}>
                    保存
                </a>
                <a className="pure-button" onClick={this.onCancelClick.bind(this)}>
                    キャンセル
                </a>
                {(()=>{
                    return this.props.slide ? <a onClick={this.onDeleteClick.bind(this)} className="pure-button pure-button-danger">削除</a>: ''
                })()}

            </div>
            </fieldset>
            <Markdown source={slide.body} />
        </form>;
    }

    onTitleChange(e){
        this.state.slide.title = e.target.value;
        this.setState({slide: this.state.slide});
    }

    onBodyChange(e){
        this.state.slide.body = e.target.value;
        this.setState({slide: this.state.slide});
    }

    onCancelClick(e){
        this.props.onCancel(this.props.slide);
    }

    onSaveClick(e){
        this.props.onSave(this.state.slide);
    }

	onDeleteClick(e){
		this.props.onDelete(this.state.slide);
	}

}