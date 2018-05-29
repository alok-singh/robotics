import React from 'react';
import ReactDOM from 'react-dom';

import Table from './table';
import Robot from './robot';
import Constants from '../constants';
import Form from './form';

import CommonComponents from '../../Common/Components/main';

export default class RobotSimulation extends React.Component {
    
    constructor(props) {
    	super(props);
    	this.state = {
    		positionX: 0,
    		positionY: 0,
    		faceDirection: "N"
    	};
    	this.positionOptions = Constants.positions;
    	this.directions = Constants.directions;
    	this.onChangeHandler = this.onChangeHandler.bind(this);
    	this.onPlaceHandler = this.onPlaceHandler.bind(this);
    	this.onMoveHandler = this.onMoveHandler.bind(this);
		this.onReportHandler = this.onReportHandler.bind(this);
    }

    onChangeHandler(key, event) {
    	let state = Object.assign({}, this.state);
    	state[key] = event.target.value;
    	this.setState(state);
    }

    onPlaceHandler(){
    	console.log("click place");
    }

    onMoveHandler() {
    	console.log("click move");
    }

	onReportHandler() {
    	console.log("click report");
    	console.log(this.state);
	}

    render() {
        return (
        	<div className="page-wrapper">
        		<Table grids={Constants.grids}>
        			<Robot />
        		</Table>
        		<Form onChangeHandler={this.onChangeHandler}
					positionX={this.state.positionX}
					positionY={this.state.positionY}
					faceDirection={this.state.faceDirection}
					onPlaceHandler={this.onPlaceHandler}
					onMoveHandler={this.onMoveHandler}
					onReportHandler={this.onReportHandler}
				>
        		</Form>
	        </div>
        )
    }
}