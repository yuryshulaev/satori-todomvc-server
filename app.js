'use strict'

const PORT = process.env.PORT || 8085;

const nodeStatic = require('node-static');
const SatoriServer = require('satori-server').SatoriServer;
const todomvc = require('./todomvc');
const indexHtml = require('./index.html');

let view = new SatoriServer();
let model = view.proxy(new todomvc.TodosModel(require('./data.json').map(todo => new todomvc.Todo(todo))));
let vm = view.proxy(new todomvc.ViewModel(model, view));
let staticServer = new nodeStatic.Server('./node_modules');

require('http').createServer(function (request, response) {
	if (request.url === '/') {
		response.end(indexHtml(todomvc.TodoAppComponent(vm, view)));
	}

	request.addListener('end', function () {
		staticServer.serve(request, response);
	}).resume();
}).listen(PORT);

console.log('Listening on ' + PORT + '...');
