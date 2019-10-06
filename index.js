const sudo = require('sudo');

const IP_INDEX = 0;
const MAC_ADDRESS_INDEX = 1;
const TARGET_NAME = 2;

exports.scan = (options, callback) => {
    return new Promise((resolve,reject)=>{
    console.log('Start scanning network');

    let commandArguments = ['-l'];

    if (options && options.arguments) {
        commandArguments = commandArguments.concat(options.arguments)
    }

    const arpCommand = sudo(['arp-scan'].concat(commandArguments));

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
            reject('Error: ' + code + ' : ' + errorStream);
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

            if (cells[TARGET_NAME]) {
                device.name = cells[TARGET_NAME];
            }

            devices.push(device);
        }

        resolve(devices);
    });
    });
};