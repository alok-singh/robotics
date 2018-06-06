/*
    This file contains commmon component Checkbox
    which can be used in multiple projects
    
*/


import React from 'react';
import ReactDOM from 'react-dom';

export default class Checkbox extends React.Component {
    
    constructor(props) {
    	super(props);
    }

    render() {
        return (
        	<div className='u-checkbox'>
	        	<label>{this.props.label}</label>
	        	<input onChange={this.props.onChange} value={this.props.value} type="checkbox"></input>
	        </div>
        )
    }
}
