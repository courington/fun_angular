"use strict";

// constants that do not change in runtime
const connect = require('connect'),
	serveStatic = require('serve-static'),
	_port = 3000;

connect().use(serveStatic(__dirname)).listen(_port);
console.warn(`Listening on port ${_port}!`)