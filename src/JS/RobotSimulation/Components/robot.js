import React from 'react';
import ReactDOM from 'react-dom';

export default class Robot extends React.Component {
    
    constructor(props) {
    	super(props);
    }

    render() {
        return (
        	<div className={`robot ${this.props.rotateClass}`}></div>
        )
    }
}

