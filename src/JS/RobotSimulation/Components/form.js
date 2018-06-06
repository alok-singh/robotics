/*
    The main purpose of this file is
    to make form using smaller  common component
*/

import React from 'react';
import ReactDOM from 'react-dom';

import Constants from '../constants';
import Core from '../../Common/main';

const CommonComponents = Core.Components;

export default class Form extends React.Component {
    
    constructor(props) {
    	super(props);
    	this.positionOptions = Constants.positions;
    	this.directions = Constants.directions;
    }

    getPlaceForm() {
        return (
            <div className="form-group">
                <div className="form-element">
                    <label>Position X</label>
                    <CommonComponents.Select 
                        onChange={(event) => this.props.onChangeHandler("placeX", event)} 
                        positionOptions={this.positionOptions}
                        value={this.props.positionX}
                    ></CommonComponents.Select>
                </div>
                <div className="form-element">
                    <label>Position Y</label>
                    <CommonComponents.Select 
                        onChange={(event) => this.props.onChangeHandler("placeY", event)} 
                        positionOptions={this.positionOptions}
                        value={this.props.positionY}
                    ></CommonComponents.Select>
                </div>
                <div className="form-element">
                    <label>Facing Direction</label>
                    <CommonComponents.Select 
                        onChange={(event) => this.props.onChangeHandler("placeFaceDirection", event)} 
                        positionOptions={this.directions}
                        value={this.props.faceDirection}
                    ></CommonComponents.Select>
                </div>
                <div className="form-element">
                    <CommonComponents.Button text="Place" onClick={this.props.onPlaceHandler} />
                </div>
            </div>
        );
    }

    getActionButtons() {
        return (
            <div className="button-group">
                <div className="form-element">
                    <CommonComponents.Button text="Move" onClick={this.props.onMoveHandler} />
                </div>
                <div className="form-element">
                    <CommonComponents.Button text="Left" onClick={this.props.onLeftTurnHandler} />
                </div>
                <div className="form-element">
                    <CommonComponents.Button text="Right" onClick={this.props.onRightTurnHandler} />
                </div>
                <div className="form-element">
                    <CommonComponents.Button text="Report" onClick={this.props.onReportHandler} />
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="main-form">
                {this.getPlaceForm()}
                {this.props.isPlaced ? this.getActionButtons() : null}
            </div>
        )
    }
}