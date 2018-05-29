import React from 'react';
import ReactDOM from 'react-dom';

export default class Select extends React.Component {
    
    constructor(props) {
    	super(props);
    }

    getOptions(options) {
        return options.map((option, index) => {
            return <option key={index} value={option.value}>{option.text}</option>
        })
    }

    render() {
        return (
        	<select onChange={this.props.onChange} >
                {this.getOptions(this.props.positionOptions)}   
            </select>
        )
    }
}

