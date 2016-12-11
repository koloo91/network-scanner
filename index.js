var sudo = require('sudo');

const IP_INDEX = 0
const MAC_ADDRESS_INDEX = 1

exports.scan = function(callback) {
	console.log('Start scanning network');

	var arpCommand = sudo(['arp-scan', '-l', '-q']);
	var bufferStream = ''
	var errorStream = '';

	arpCommand.stdout.on('data', function(data) {
		bufferStream += data;
	});

	arpCommand.stderr.on('data', function(error) {
		errorStream += error;
	});

	arpCommand.on('close', function(code) {
		console.log('Scan finished');

		if(code !== 0) {
			console.log('Error: ' + code + ' : ' + errorStream);
			return;
		}

		var rows = bufferStream.split('\n');
		var devices = [];

		for(var i = 2; i < rows.length - 4; i++) {
			var cells = rows[i].split('\t').filter(String);
			var device = {};

			if(cells[IP_INDEX]) {
				device.ip = cells[IP_INDEX];
			}

			if(cells[MAC_ADDRESS_INDEX]) {
				device.mac = cells[MAC_ADDRESS_INDEX];
			}

			devices.push(device);
		}

		callback(devices);
	});
}