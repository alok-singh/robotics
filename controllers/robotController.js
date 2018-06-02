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
		this.instructions = [];  // stores instructions 
	}
	createConnection(){
		let io = socket(this.server);
		io.on('connection', (client) => {
		  	client.on('update', (data) => { // listen to the event
		  		this.status = {
		  			robotPositionX: data.robotPositionX,
		  			robotPositionY: data.robotPositionY,
		  			faceDirection: data.faceDirection,
		  			time: data.time
		  		};
		  		setTimeout(()=> {
		  			io.emit('broadcast', this.status); // emit an event to all connected sockets
		  		}, 2000);
		  		console.log('update');
		  		console.log(this.status);
		  	});
		  	client.on('disconnect', () => {
		  		console.log('disconnected');
		  	});
		  	io.emit('broadcast', this.status);
		  	console.log('connected');
	  		console.log(this.status);
		});
	}
}
