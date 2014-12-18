/* 
* @Author: gicque_p
* @Date:   2014-10-24 23:08:45
* @Last Modified by:   gicque_p
* @Last Modified time: 2014-10-25 00:25:40
*/

var http = require('http'); // Nécessaire pour utiliser createServer
var url = require('url'); // Nécessaire pour paser l'url
var querystring = require('querystring'); // Nécessaire pour récupérer les $_GET
var eventEmitter = require('events').EventEmitter; // Nécessaire pour envoyer des événements

var server = http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});

	var page = url.parse(req.url).pathname; // Récupération du pathname de la page
	var query = querystring.parse(url.parse(req.url).query); // Récupération des $_GET
	console.log(page);

	if ('prenom' in query) {
		res.write('Hello <strong>' + query['prenom'] + '</strong>');		
	}

	res.end();
});

var link = new eventEmitter(); // Créer un objet event
link.on('hover', function(message) {
	console.log(message);
});

link.emit('hover', 'Hovering a link !');

server.listen(8080); // Utilisation du port 8080