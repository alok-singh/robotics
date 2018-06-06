/*
    The main purpose of this file is
    to contain all constants and 
    configuration of the application
*/

const Constants = {
	grids: 25,
	positions: [{
	    text: 0,
	    value: 0
	},{
	    text: 1,
	    value: 1
	}, {
	    text: 2,
	    value: 2
	}, {
	    text: 3,
	    value: 3
	}, {
	    text: 4,
	    value: 4
	}],
	directions: [{
	    text: 'North',
	    value: 'N'
	}, {
	    text: 'East',
	    value: 'E'
	}, {
	    text: 'South',
	    value: 'S'
	}, {
	    text: 'West',
	    value: 'W'
	}],
	classMap:{
		E: 'face-east',
		W: 'face-west',
		S: 'face-south',
		N: ''
	}
};

export default Constants;