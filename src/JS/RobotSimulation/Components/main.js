/*
    This is the main component of
    this project which contains all
    the data for the application 
*/


import React from 'react';
import ReactDOM from 'react-dom';

import Table from './table';
import Robot from './robot';
import Constants from '../constants';
import Form from './form';
import File from './file';

import Core from '../../Common/main';

const CommonComponents = Core.Components;
const Utils = Core.Utils;

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
            report: [],
            isMultiInstructorMode: false,
            isLoading: false
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
		this.changeModeHandler = this.changeModeHandler.bind(this);
        this.requiredEmit = false;
        this.clientID = Utils.generateID();
    }

    eventHandler() {
        /* 
            io is available via socket.io.js 
            it is automatically serverby socket.io to the client
        */
        this.socket = io();
        this.setState({
            isLoading: true,
            report: []
        });
        this.socket.on('broadcast', (data) => {
            this.requiredEmit = false;
            if(data && this.state.isMultiInstructorMode){
                this.setState({
                    isPlaced: true,
                    robotPositionX: data.robotPositionX,
                    robotPositionY: data.robotPositionY,
                    faceDirection: data.faceDirection,
                    isMultiInstructorMode: true,
                    isLoading: false
                });
            }
        });
    }

    onChangeHandler(key, event) {
    	let state = Object.assign({}, this.state);
    	state[key] = event.target.value;
    	this.setRemoteState(state);
    }

    onPlaceHandler(){
    	let instructions = this.state.instructions;
        let robotPositionX = this.state.placeX;
        let robotPositionY = this.state.placeY;
        let faceDirection = this.state.placeFaceDirection;
        instructions.push(`place ${robotPositionX}, ${robotPositionY}, ${faceDirection}`);
        this.requiredEmit = true;
        this.setRemoteState({
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
        this.requiredEmit = true;
        this.setRemoteState({
            isLoading: this.state.isMultiInstructorMode,
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
        report.push(`${this.state.robotPositionX}, ${this.state.robotPositionY}, ${this.directions[directionIndex].text}`);

        this.setRemoteState({
            isLoading: this.state.isMultiInstructorMode,
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
        
        this.requiredEmit = true;
        this.setRemoteState({
            isLoading: this.state.isMultiInstructorMode,
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
        this.requiredEmit = true;
        this.setRemoteState({
            isLoading: this.state.isMultiInstructorMode,
            faceDirection: nextDirection,
            instructions
        });
    }

    changeModeHandler() {
        this.state.isMultiInstructorMode = !this.state.isMultiInstructorMode;
        if(this.state.isMultiInstructorMode){
            this.eventHandler();
        }
        else{
            this.requiredEmit = false;
            this.socket.disconnect();
            delete this.socket;
            this.setRemoteState({
                placeX: 0,
                placeY: 0,
                robotPositionX: 0,
                robotPositionY: 0,
                placeFaceDirection: 'N',
                faceDirection: 'N',
                isPlaced: false,
                instructions: [],
                report: [],
                isMultiInstructorMode: false,
                isLoading: false
            });
        }
    }

    componentDidUpdate() {
        if(this.state.instructions.length > 100){
            this.state.instructions.shift();
        }
        if(this.state.report.length > 100){
            this.state.report.shift();
        }
    }

    getValidProp(propA, propB) {
        if(typeof propA !== 'undefined'){
            return propA;
        }
        else if(typeof propB !== 'undefined'){
            return propB;
        }
        else{
            return undefined;
        }
    }

    setRemoteState(toState) {
        if(this.requiredEmit && this.state.isMultiInstructorMode){
            this.setState({
                isLoading: true
            });
            this.socket.emit('update', Object.assign({}, {
                time: (new Date()).getTime(),
                robotPositionX: this.getValidProp(toState.robotPositionX, this.state.robotPositionX),
                robotPositionY: this.getValidProp(toState.robotPositionY, this.state.robotPositionY),
                faceDirection: this.getValidProp(toState.faceDirection, this.state.faceDirection),
                clientID: this.clientID
            }));
        }
        else{
            this.setState({
                placeX: this.getValidProp(toState.placeX, this.state.placeX),
                placeY: this.getValidProp(toState.placeY, this.state.placeY),
                robotPositionX: this.getValidProp(toState.robotPositionX, this.state.robotPositionX),
                robotPositionY: this.getValidProp(toState.robotPositionY, this.state.robotPositionY),
                placeFaceDirection: this.getValidProp(toState.placeFaceDirection, this.state.placeFaceDirection),
                faceDirection: this.getValidProp(toState.faceDirection, this.state.faceDirection),
                isPlaced: this.getValidProp(toState.isPlaced, this.state.isPlaced),
                instructions: this.getValidProp(toState.instructions, this.state.instructions),
                report: this.getValidProp(toState.report, this.state.report),
                isMultiInstructorMode: this.getValidProp(toState.isMultiInstructorMode, this.state.isMultiInstructorMode),
                isLoading: false
            });
        }
    }

    render() {
        return (
        	<div className="page-wrapper">
                <CommonComponents.Loader isLoading={this.state.isLoading} />
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
                    <CommonComponents.Checkbox 
                        label="Check for Multiple Instructions" 
                        onChange={this.changeModeHandler} 
                        value={this.state.isMultiInstructorMode}
                    />
                    {this.state.isMultiInstructorMode ? 
                        null
                        : 
                        <File
                            list={this.state.instructions}
                            title="Input File"
                            className="input-file"
                        />
                    }
                    <Form 
                        onChangeHandler={this.onChangeHandler}
    					positionX={this.state.placeX}
    					positionY={this.state.placeY}
    					faceDirection={this.state.placeFaceDirection}
    					onPlaceHandler={this.onPlaceHandler}
    					onMoveHandler={this.onMoveHandler}
    					onReportHandler={this.onReportHandler}
                        onLeftTurnHandler={this.onLeftTurnHandler}
                        onRightTurnHandler={this.onRightTurnHandler}
                        isPlaced={this.state.isPlaced}
    				/>
                    <File
                        list={this.state.report}
                        title="Output File"
                        className="output-file"
                    />
                </div>
	        </div>
        )
    }
}