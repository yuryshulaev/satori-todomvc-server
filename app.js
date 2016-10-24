'use strict'

const PORT = process.env.PORT || 8085;

const http = require('http');
const nodeStatic = require('node-static');
const SatoriServer = require('satori-server').SatoriServer;
const {TodosModel, Todo, ViewModel, TodoAppView} = require('satori-todomvc/js/todomvc');
const indexHtml = require('./index.html');

const view = new SatoriServer();
const model = new TodosModel(require('./data.json').map(todo => new Todo(todo)));
const vm = new ViewModel(model, view);
const staticServer = new nodeStatic.Server('./node_modules');

http.createServer(function (request, response) {
	if (request.url === '/') {
		response.end(indexHtml(TodoAppView(vm, view, view.h)));
		return;
	}

	request.addListener('end', function () {
		staticServer.serve(request, response);
	}).resume();
}).listen(PORT);

console.log('Listening on ' + PORT + '...');
