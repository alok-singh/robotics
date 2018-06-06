/*
	This file contains commmon component button
	which can be used in multiple projects
	
*/

import React from 'react';
import ReactDOM from 'react-dom';

export default class Button extends React.Component {
    
    constructor(props) {
    	super(props);
    }

    render() {
        return (
        	<button className="u-button" onClick={this.props.onClick}>{this.props.text}</button>
        )
    }
}