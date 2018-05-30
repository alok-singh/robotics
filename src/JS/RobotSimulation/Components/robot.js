import React from 'react';
import ReactDOM from 'react-dom';

export default class Robot extends React.Component {
    
    constructor(props) {
    	super(props);
    }

    render() {
    	let position = {
    		bottom: `${20*(this.props.positionY)}%`,
    		left: `${20*(this.props.positionX)}%`
    	}
        return (
        	<div className={`robot ${this.props.rotateClass}`} style={position}></div>
        )
    }
}

