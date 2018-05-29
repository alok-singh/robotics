import React from 'react';
import ReactDOM from 'react-dom';

import '../../../CSS/RobotSimulation/table.less';

export default class Table extends React.Component {
    
    constructor(props) {
    	super(props);
    	this.state = {

    	};
    }

    getTableGrid() {
    	let grids = this.props.grids;
    	let gridComponent = [];
    	
    	while(grids--){
    		gridComponent.push(
    			<div key={grids} className="grid"></div>
    		)
    	}
    	
    	return gridComponent;
    }

    render() {
        return (
        	<div className="page-wrapper">
	        	<div className="table"> 
	        		{this.getTableGrid()}
	        		{this.props.children}
	        	</div>
	        </div>
        )
    }
}

