import React from 'react';
import ReactDOM from 'react-dom';

import Table from './table';
import Robot from './robot';
import Constants from '../constants';
import Form from './form';
import File from './file';

import CommonComponents from '../../Common/Components/main';

export default class RobotSimulation extends React.Component {
    
    constructor(props) {
    	super(props);
    	this.state = {
            placeX: 0,
            placeY: 0,
            robotPositionX: 0,
            robotPositionY: 0,
            placeFaceDirection: 'N',
    		faceDirection: 'N',
            isPlaced: false,
            instructions: [],
            report: []
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
    	let instructions = this.state.instructions;
        let robotPositionX = this.state.placeX;
        let robotPositionY = this.state.placeY;
        let faceDirection = this.state.placeFaceDirection;
        instructions.push(`place ${robotPositionX}, ${robotPositionY}, ${faceDirection}`);
        this.setState({
            isPlaced: true,
            instructions,
            robotPositionX,
            robotPositionY,
            faceDirection
        });
    }

    onMoveHandler() {
        let newPositionX = parseInt(this.state.robotPositionX);
        let newPositionY = parseInt(this.state.robotPositionY);
        let faceDirection = this.state.faceDirection;
        let instructions = this.state.instructions;
        switch(faceDirection){
            case 'N':
                newPositionY = newPositionY + 1 < 5 ? newPositionY + 1 : 4;
                break;
            case 'E':
                newPositionX = newPositionX + 1 < 5 ? newPositionX + 1 : 4;
                break;
            case 'S':
                newPositionY = newPositionY - 1 > 0 ? newPositionY - 1 : 0;
                break;
            case 'W':
                newPositionX =  newPositionX - 1 > 0 ? newPositionX - 1 : 0;
                break;
            default:
                break; 
        }

        instructions.push('move');
        
        this.setState({
            robotPositionX: newPositionX,
            robotPositionY: newPositionY,
            instructions
        });
    }

	onReportHandler() {
        let instructions = this.state.instructions;
        let directionIndex = this.getDirectionIndex();
        let report = this.state.report;

        instructions.push('report');
        report.push(`Output: ${this.state.robotPositionX}, ${this.state.robotPositionY}, ${this.directions[directionIndex].text}`);

        this.setState({
            report,
            instructions
        });
	}

    getDirectionIndex() {
        let currentDirection = this.state.faceDirection;
        let index = this.directions.findIndex(obj => obj.value == currentDirection);
        return index;
    }

    onLeftTurnHandler() {
        let index = this.getDirectionIndex();
        let nextIndex = index - 1 >= 0 ? index - 1 : 3;
        let nextDirection = this.directions[nextIndex].value;
        let instructions = this.state.instructions;
        instructions.push('left');
        this.setState({
            faceDirection: nextDirection,
            instructions
        });
    }

    onRightTurnHandler() {
        let index = this.getDirectionIndex();
        let nextIndex = (index+1)%4;
        let nextDirection = this.directions[nextIndex].value;
        let instructions = this.state.instructions;
        instructions.push('right');
        this.setState({
            faceDirection: nextDirection,
            instructions
        });
    }

    componentWillUpdate(){
        if(this.state.instructions.length > 100){
            this.state.instructions.shift();
        }
    }

    render() {
        return (
        	<div className="page-wrapper">
        		<Table grids={Constants.grids}>
        			{this.state.isPlaced ? 
                        <Robot rotateClass={this.classMap[this.state.faceDirection]} 
                            positionX={this.state.robotPositionX}
                            positionY={this.state.robotPositionY}
                            faceDirection={this.state.faceDirection}
                        /> 
                        : 
                        null
                    }
        		</Table>
        		<div className="instructions">
                    <File
                        list={this.state.instructions}
                        title="Input File"
                        className="input-file"
                    >
                    </File>
                    <Form onChangeHandler={this.onChangeHandler}
    					positionX={this.state.placeX}
    					positionY={this.state.placeY}
    					faceDirection={this.state.placeFaceDirection}
    					onPlaceHandler={this.onPlaceHandler}
    					onMoveHandler={this.onMoveHandler}
    					onReportHandler={this.onReportHandler}
                        onLeftTurnHandler={this.onLeftTurnHandler}
                        onRightTurnHandler={this.onRightTurnHandler}
                        isPlaced={this.state.isPlaced}
    				>
            		</Form>
                    <File
                        list={this.state.report}
                        title="Output File"
                        className="output-file"
                    >
                    </File>
                </div>
	        </div>
        )
    }
}