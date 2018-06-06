/*
    This file contains commmon component Select
    which can be used in multiple projects
    
*/

import React from 'react';
import ReactDOM from 'react-dom';

export default class Select extends React.Component {
    
    constructor(props) {
    	super(props);
    }

    getOptions(options) {
        return options.map((option, index) => {
            return <option key={index} value={option.value}>{option.text}</option>
        });
    }

    render() {
        return (
        	<select className="ui-select" onChange={this.props.onChange} value={this.props.value} >
                {this.getOptions(this.props.positionOptions)}
            </select>
        )
    }
}
