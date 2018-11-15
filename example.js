const scanner = require('./index.js');

scanner.scan({arguments: ["-I", "wlp2s0"]}, devices => {
    console.log(devices);
});