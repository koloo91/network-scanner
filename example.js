const scanner = require('./index.js');

scanner.scan(devices => {
	console.log(devices);
});