'use strict'

const PORT = process.env.PORT || 8085;

const http = require('http');
const nodeStatic = require('node-static');
const SatoriServer = require('satori-server').SatoriServer;
const {TodosModel, Todo} = require('satori-todomvc/js/model');
const {ViewModel} = require('satori-todomvc/js/viewmodel');
const {TodoAppComponent} = require('satori-todomvc/js/view');
const indexHtml = require('./index.html');

let view = new SatoriServer();
let model = new TodosModel(require('./data.json').map(todo => new Todo(todo)));
let vm = new ViewModel(model, view);
let staticServer = new nodeStatic.Server('./node_modules');

http.createServer(function (request, response) {
	if (request.url === '/') {
		response.end(indexHtml(TodoAppComponent(vm, view)));
		return;
	}

	request.addListener('end', function () {
		staticServer.serve(request, response);
	}).resume();
}).listen(PORT);

console.log('Listening on ' + PORT + '...');
