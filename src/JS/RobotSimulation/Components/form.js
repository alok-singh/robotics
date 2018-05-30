import React from 'react';
import ReactDOM from 'react-dom';

import Constants from '../constants';
import CommonComponents from '../../Common/Components/main';

export default class Form extends React.Component {
    
    constructor(props) {
    	super(props);
    	this.positionOptions = Constants.positions;
    	this.directions = Constants.directions;
    }

    getPlaceForm() {
        return [
            <div className="form-element" key="1">
                <label>Position X</label>
                <CommonComponents.Select 
                    onChange={(event) => this.props.onChangeHandler("positionX", event)} 
                    positionOptions={this.positionOptions}
                    value={this.props.positionX}
                ></CommonComponents.Select>
            </div>
            ,<div className="form-element" key="2">
                <label>Position Y</label>
                <CommonComponents.Select 
                    onChange={(event) => this.props.onChangeHandler("positionY", event)} 
                    positionOptions={this.positionOptions}
                    value={this.props.positionY}
                ></CommonComponents.Select>
            </div>
            ,<div className="form-element" key="3">
                <label>Facing Direction</label>
                <CommonComponents.Select 
                    onChange={(event) => this.props.onChangeHandler("faceDirection", event)} 
                    positionOptions={this.directions}
                    value={this.props.faceDirection}
                ></CommonComponents.Select>
            </div>
            ,<div className="form-element" key="4">
                <CommonComponents.Button text="Place" onClick={this.props.onPlaceHandler} />
            </div>
        ]
    }

    getActionButtons() {
        return [
            <div className="form-element" key="5">
                <CommonComponents.Button text="Move" onClick={this.props.onMoveHandler} />
            </div>
            ,<div className="form-element" key="6">
                <CommonComponents.Button text="Left" onClick={this.props.onLeftTurnHandler} />
            </div>
            ,<div className="form-element" key="7">
                <CommonComponents.Button text="Right" onClick={this.props.onRightTurnHandler} />
            </div>
            ,<div className="form-element" key="8">
                <CommonComponents.Button text="Report" onClick={this.props.onReportHandler} />
            </div>
        ]
    }

    render() {
        return (
            <React.Fragment>
                {this.props.isPlaced ? this.getActionButtons() : this.getPlaceForm()}
            </React.Fragment>
        )
    }
}