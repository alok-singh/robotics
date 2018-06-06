/*
    The main purpose of this file is
    to controll the remote robot
    it contains logic for setting and
    sharing the robot's information
*/

import socket from 'socket.io';

export default class RobotController {
	constructor(server){
		this.server = server;
		this.status = {
			robotPositionX: 0,
			robotPositionY: 0,
			faceDirection: 'N',
			time: (new Date()).getTime()
		};  // tells the current position of robot 
	}
	createConnection(){
		let io = socket(this.server);
		let delay = 2000;
		io.on('connection', (client) => {
		  	client.on('update', (data) => { // listen to the event
		  		this.status = {
		  			robotPositionX: data.robotPositionX,
		  			robotPositionY: data.robotPositionY,
		  			faceDirection: data.faceDirection,
		  			clientID: data.clientID,
		  			time: data.time
		  		};
		  		delay = this.getRandomDelay();
		  		setTimeout(()=> {
		  			io.emit('broadcast', this.status); // emit an event to all connected sockets
		  		}, delay);
		  		console.log('update');
		  		console.log(this.status);
		  	});
		  	client.on('disconnect', () => {
		  		console.log('disconnected');
		  	});
		  	delay = this.getRandomDelay();
		  	setTimeout(()=> {
		  		io.emit('broadcast', this.status); // emit an event to all connected sockets
		  	}, delay);
		});
	}
	getRandomDelay() {
		return 1000 + 1000*Math.random();
	}
}
