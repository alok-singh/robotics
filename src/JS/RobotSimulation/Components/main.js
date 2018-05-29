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
    		faceDirection: "N",
            isPlaced: false
    	};
    	this.positionOptions = Constants.positions;
    	this.directions = Constants.directions;
        this.classMap = Constants.classMap;
    	this.onChangeHandler = this.onChangeHandler.bind(this);
    	this.onPlaceHandler = this.onPlaceHandler.bind(this);
    	this.onMoveHandler = this.onMoveHandler.bind(this);
        this.onReportHandler = this.onReportHandler.bind(this);
        this.onLeftTurnHandler = this.onLeftTurnHandler.bind(this);
		this.onRightTurnHandler = this.onRightTurnHandler.bind(this);
    }

    onChangeHandler(key, event) {
    	let state = Object.assign({}, this.state);
    	state[key] = event.target.value;
    	this.setState(state);
    }

    onPlaceHandler(){
    	this.setState({
            isPlaced: true
        });
    }

    onMoveHandler() {
    	console.log("click move");
    }

	onReportHandler() {
    	console.log("click report");
    	console.log(this.state);
	}

    getDirectionIndex() {
        let currentDirection = this.state.faceDirection;
        let index = this.directions.findIndex(obj => obj.value == currentDirection);
        return index;
    }

    onLeftTurnHandler() {
        let index = this.getDirectionIndex();
        let nextIndex = (index+1)%4;
        let nextDirection = this.directions[nextIndex].value;
        this.setState({
            faceDirection: nextDirection
        });
    }

    onRightTurnHandler() {
        let index = this.getDirectionIndex();
        let nextIndex = index - 1 >= 0 ? index - 1 : 3;
        let nextDirection = this.directions[nextIndex].value;
        this.setState({
            faceDirection: nextDirection
        });
    }

    render() {
        return (
        	<div className="page-wrapper">
        		<Table grids={Constants.grids}>
        			{this.state.isPlaced ? 
                        <Robot rotateClass={this.classMap[this.state.faceDirection]} /> 
                        : 
                        null
                    }
        		</Table>
        		<Form onChangeHandler={this.onChangeHandler}
					positionX={this.state.positionX}
					positionY={this.state.positionY}
					faceDirection={this.state.faceDirection}
					onPlaceHandler={this.onPlaceHandler}
					onMoveHandler={this.onMoveHandler}
					onReportHandler={this.onReportHandler}
                    onLeftTurnHandler={this.onLeftTurnHandler}
                    onRightTurnHandler={this.onRightTurnHandler}
				>
        		</Form>
	        </div>
        )
    }
}