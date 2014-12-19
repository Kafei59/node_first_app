/* 
* @Author: kafei
* @Date:   2014-12-18 17:27:51
* @Last Modified by:   kafei
* @Last Modified time: 2014-12-19 12:17:43
*/

var express = require('express'),
	app = require('express')(),
	server = require('http').createServer(app),
	socket = require('socket.io').listen(server),
	mysql = require('mysql'),
	pool = mysql.createPool({
		host : 'localhost',
		database : 'pyrat',
		user : 'root',
		password : ''
	});


app.use(express.static(__dirname));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/:users:id', function(req, res) {
	pool.getConnection(function(err, connect) {
		if (err) {
			console.error('CONNECTION error: ',err);
			res.statusCode = 503;
			res.send({
				result: 'error',
				err: err.code
			});
		} else {
			connect.query('SELECT * FROM users ORDER BY id DESC LIMIT 20', req.params.id, function(err, rows, fields) {
				if (err) {
					console.error(err);
					res.statusCode = 500;
					res.send({
						result: 'error',
						err:    err.code
					});
				}
				res.send({
					result: 'success',
					err:    '',
					fields: fields,
					json:   rows,
					length: rows.length
				});
				connect.release();
			});
			// query the database using connection
		}
	});
});

server.listen(8080);
