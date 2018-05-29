import React from 'react';
import ReactDOM from 'react-dom';

import Table from './table';
import Robot from './robot';
import Constants from '../constants';

import CommonComponents from '../../Common/Components/main';

export default class RobotSimulation extends React.Component {
    
    constructor(props) {
    	super(props);
    	this.state = {};
    	this.positionOptions = Constants.positions;
    	this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(val) {
    	console.log(val);
    }

    render() {
        return (
        	<div className="page-wrapper">
        		<Table grids={Constants.grids}>
        			<Robot />
        		</Table>
        		<div>
        			<label>Position X</label>
        			<CommonComponents.Select onChange={this.onChangeHandler} positionOptions={this.positionOptions}></CommonComponents.Select>
        		</div>
	        </div>
        )
    }
}