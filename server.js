/*
    This file controlls the server
    and servers static resources and
    instantiate controllers
*/

'use strict';

import http from 'http';
import express from 'express';
import fs from 'fs';
import RobotController from './controllers/robotController';

const app = express();

// *********************** pages routes ************************** //

app.get('/', function (req, res) {
	getFileFromPath("./src/HTML/RobotSimulation/index.html", res);
});

// *********************** static files ************************** //

app.get('/js/*', function(req, res) {
	let filePath = "./build/js/" + req.url.split("/").pop();
	getFileFromPath(filePath, res, {'Content-Type': 'application/javascript'});
});

app.get('/img/*', function(req, res) {
	let filePath = "./images/" + req.url.split("/").pop();
	getFileFromPath(filePath, res, {
		'Content-Type': 'image/webp', 
		'Cache-Control': 'public, max-age=31557600'
	});
});

// *********************** exception handling ************************** //

app.get('/*', function(req, res) {
	sendTo404(res);
});

// *********************** helper function ************************** //

let getFileFromPath = (filePath, res, contentType={'Content-Type': 'text/html'})  => {
	fs.readFile(filePath, function(err, data){
		if(err){
			sendTo404(res);
		}
		else{
			res.writeHead(200, contentType);
			res.write(data);
			res.end();
		}
	});
}

let sendTo404 = (res) => {
	res.writeHead(404, {'Content-Type': 'text'});
	res.write("404 Not found");
	res.end();
}


// *********************** server start ************************** //

const server = http.createServer(app);
const robotController = new RobotController(server);

robotController.createConnection();
server.listen(8080);

console.log('server started at port 8080');






