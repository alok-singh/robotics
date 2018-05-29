import React from 'react';
import ReactDOM from 'react-dom';

export default class Robot extends React.Component {
    
    constructor(props) {
    	super(props);
    	this.state = {
            previousPositionX: 0, 
            previousPositionY: 0, 
            currentPositionX: 0, 
            currentPositionY: 0, 
            instructions: []
    	};
    }

    render() {
        return (
        	<div className="robot"></div>
        )
    }
}

