const scanner = require('./index.js');

scanner.scan({arguments: ["-I", "en0"]}, devices => {
    console.log(devices);
});