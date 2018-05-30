import React from 'react';
import ReactDOM from 'react-dom';

export default class Inputfile extends React.Component {
    
    constructor(props) {
    	super(props);
    }

    getInstructionComponents() {
        return this.props.list.map(val => {
            return <div className="command">{val}</div>
        });
    }

    render() {
        return (
        	<div className="command-file">
                <div className="text-title">{this.props.title}</div>
                {this.getInstructionComponents()}   
            </div>
        )
    }
}

