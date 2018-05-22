const sudo = require('sudo');

const IP_INDEX = 0;
const MAC_ADDRESS_INDEX = 1;

exports.scan = callback => {
    console.log('Start scanning network');

    const arpCommand = sudo(['arp-scan', '-l', '-q']);
    let bufferStream = '';
    let errorStream = '';


    arpCommand.stdout.on('data', data => {
        bufferStream += data;
    });

    arpCommand.stderr.on('data', error => {
        errorStream += error;
    });

    arpCommand.on('close', code => {
        console.log('Scan finished');

        if (code !== 0) {
            console.log('Error: ' + code + ' : ' + errorStream);
            return;
        }

        const rows = bufferStream.split('\n');
        const devices = [];

        for (let i = 2; i < rows.length - 4; i++) {
            const cells = rows[i].split('\t').filter(String);
            const device = {};

            if (cells[IP_INDEX]) {
                device.ip = cells[IP_INDEX];
            }

            if (cells[MAC_ADDRESS_INDEX]) {
                device.mac = cells[MAC_ADDRESS_INDEX];
            }

            devices.push(device);
        }

        callback(devices);
    });
};