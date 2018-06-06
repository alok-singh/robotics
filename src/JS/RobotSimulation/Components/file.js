/*
    The main purpose of this file is
    to contain all the logic of 
    displaying the input text 
*/

import React from 'react';
import ReactDOM from 'react-dom';

export default class File extends React.Component {
    
    constructor(props) {
    	super(props);
    }

    getInstructionComponents() {
        return this.props.list.map((val, index) => {
            return <div key={index} className="command">{val}</div>
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="text-title">{this.props.title}</div>
                <div className={`command-file ${this.props.className ? this.props.className : ''}`}>
                    {this.getInstructionComponents()}   
                </div>
            </React.Fragment>
        )
    }
}