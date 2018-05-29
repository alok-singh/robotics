import React from 'react';
import ReactDOM from 'react-dom';

export default class Table extends React.Component {
    
    constructor(props) {
    	super(props);
    }

    getTableGrid(gridsCount) {
    	let gridComponent = [];
    	while(gridsCount--){
    		gridComponent.push(
    			<div key={gridsCount} className="grid"></div>
    		)
    	}
    	return gridComponent;
    }

    render() {
        return (
        	<div className="table"> 
        		{this.getTableGrid(this.props.grids)}
        		{this.props.children}
        	</div>
        )
    }
}

