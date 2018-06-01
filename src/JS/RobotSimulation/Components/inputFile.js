import React from 'react';
import ReactDOM from 'react-dom';

export default class Inputfile extends React.Component {
    
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
                <div className="command-file">
                    {this.getInstructionComponents()}   
                </div>
            </React.Fragment>
        )
    }
}

