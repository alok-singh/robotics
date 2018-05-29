import React from 'react';
import ReactDOM from 'react-dom';

import Constants from '../constants';
import CommonComponents from '../../Common/Components/main';

export default class RobotSimulation extends React.Component {
    
    constructor(props) {
    	super(props);
    	this.positionOptions = Constants.positions;
    	this.directions = Constants.directions;
    }

    render() {
        return (
    		<div className="instructions">
    			<div className="form-element">
        			<label>Position X</label>
        			<CommonComponents.Select 
        				onChange={(event) => this.props.onChangeHandler("positionX", event)} 
        				positionOptions={this.positionOptions}
        				value={this.props.positionX}
        			></CommonComponents.Select>
        		</div>
        		<div className="form-element">
        			<label>Position Y</label>
        			<CommonComponents.Select 
        				onChange={(event) => this.props.onChangeHandler("positionY", event)} 
        				positionOptions={this.positionOptions}
        				value={this.props.positionY}
        			></CommonComponents.Select>
        		</div>
        		<div className="form-element">
        			<label>Facing Direction</label>
        			<CommonComponents.Select 
        				onChange={(event) => this.props.onChangeHandler("faceDirection", event)} 
        				positionOptions={this.directions}
        				value={this.props.faceDirection}
        			></CommonComponents.Select>
        		</div>
        		<div className="form-element">
        			<CommonComponents.Button text="Place" onClick={this.props.onPlaceHandler} />
        		</div>
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
        )
    }
}