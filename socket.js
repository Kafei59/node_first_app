/* 
* @Author: kafei
* @Date:   2014-12-18 17:27:51
* @Last Modified by:   kafei
* @Last Modified time: 2014-12-18 18:01:48
*/

var express = require('express'),
	app = require('express')(),
	server = require('http').createServer(app),
	socket = require('socket.io').listen(server);

app.use(express.static(__dirname));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
})

server.listen(8080);
