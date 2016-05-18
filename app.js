'use strict'

const PORT = process.env.PORT || 8085;

const http = require('http');
const nodeStatic = require('node-static');
const SatoriServer = require('satori-server').SatoriServer;
const todomvc = require('satori-todomvc/js/todomvc');
const indexHtml = require('./index.html');

let view = new SatoriServer();
let model = new todomvc.TodosModel(require('./data.json').map(todo => new todomvc.Todo(todo)));
let vm = new todomvc.ViewModel(model, view);
let staticServer = new nodeStatic.Server('./node_modules');

http.createServer(function (request, response) {
	if (request.url === '/') {
		response.end(indexHtml(todomvc.TodoAppComponent(vm, view)));
		return;
	}

	request.addListener('end', function () {
		staticServer.serve(request, response);
	}).resume();
}).listen(PORT);

console.log('Listening on ' + PORT + '...');
