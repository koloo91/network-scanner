# network-scanner
A nodejs module which determines the status of devices on the network

## Installation
In your terminal, install `arp-scan`:
````
sudo apt-get install arp-scan   
````
## Usage
```javascript
var scanner = require('local-network-scanner');
scanner.scan(function(devices) {
	console.log(devices);
});
```

### Scan result
````javascript
  [
   {
      "ip":"10.0.2.2",
      "mac":"52:54:00:12:35:02"
   },
   {
      "ip":"10.0.2.3",
      "mac":"52:54:00:12:35:03"
   },
   {
      "ip":"10.0.2.4",
      "mac":"52:54:00:12:35:04"
   }
]
````
