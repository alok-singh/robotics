import React from 'react';
import ReactDOM from 'react-dom';

import Table from './table';
import Robot from './robot';
import Constants from '../constants';
import Form from './form';
import InputFile from './inputFile';

import CommonComponents from '../../Common/Components/main';

export default class RobotSimulation extends React.Component {
    
    constructor(props) {
    	super(props);
    	this.state = {
    		positionX: 0,
    		positionY: 0,
    		faceDirection: "N",
            isPlaced: false,
            instructions: [],
            report: ''
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
        instructions.push(`place ${this.state.positionX}, ${this.state.positionY}, ${this.state.faceDirection}`);
        this.setState({
            isPlaced: true,
            report: '',
            instructions
        });
    }

    onMoveHandler() {
        let newPositionX = this.state.positionX;
        let newPositionY = this.state.positionY;
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
            positionX: newPositionX,
            positionY: newPositionY,
            report: '',
            instructions
        });
    }

	onReportHandler() {
        let instructions = this.state.instructions;
        let directionIndex = this.getDirectionIndex();
        instructions.push('report');
        this.setState({
            report: `Output: ${this.state.positionX}, ${this.state.positionY}, ${this.directions[directionIndex].text}`,
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
            report: '',
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
            report: '',
            instructions
        });
    }

    componentWillUpdate(){
        console.log(this.state.instructions);
        if(this.state.instructions.length > 10){
            this.state.instructions.shift();
        }
    }

    render() {
        return (
        	<div className="page-wrapper">
        		<Table grids={Constants.grids}>
        			{this.state.isPlaced ? 
                        <Robot rotateClass={this.classMap[this.state.faceDirection]} 
                            positionX={this.state.positionX}
                            positionY={this.state.positionY}
                            faceDirection={this.state.faceDirection}
                        /> 
                        : 
                        null
                    }
        		</Table>
        		<div className="instructions">
                    <InputFile
                        list={this.state.instructions}
                        title="Input File"
                    >
                    </InputFile>
                    <Form onChangeHandler={this.onChangeHandler}
    					positionX={this.state.positionX}
    					positionY={this.state.positionY}
    					faceDirection={this.state.faceDirection}
    					onPlaceHandler={this.onPlaceHandler}
    					onMoveHandler={this.onMoveHandler}
    					onReportHandler={this.onReportHandler}
                        onLeftTurnHandler={this.onLeftTurnHandler}
                        onRightTurnHandler={this.onRightTurnHandler}
                        isPlaced={this.state.isPlaced}
    				>
            		</Form>
                    <InputFile
                        list={this.state.output}
                        title="Output File"
                    >
                    </InputFile>
                </div>
	        </div>
        )
    }
}