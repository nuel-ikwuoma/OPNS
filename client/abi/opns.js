const opnsAbi = [{"inputs":[{"internalType":"address","name":"_gateway","type":"address"},{"internalType":"address","name":"_admin","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"string[]","name":"urls","type":"string[]"},{"internalType":"bytes","name":"callData","type":"bytes"},{"internalType":"bytes4","name":"callbackFunction","type":"bytes4"},{"internalType":"bytes","name":"extraData","type":"bytes"}],"name":"OffchainData","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldGateway","type":"address"},{"indexed":true,"internalType":"address","name":"newGateway","type":"address"}],"name":"gatewayChanged","type":"event"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gateway","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_messageHash","type":"bytes32"}],"name":"getEthSignedMessageHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_hash","type":"bytes32"}],"name":"getPhoneNumber","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"_response","type":"bytes"},{"internalType":"bytes","name":"_hash","type":"bytes"}],"name":"getPhoneNumberCallback","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_ethSignedMessageHash","type":"bytes32"},{"internalType":"bytes","name":"_signature","type":"bytes"}],"name":"recoverSigner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"_gateway","type":"address"}],"name":"setGateway","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"sig","type":"bytes"}],"name":"splitSignature","outputs":[{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"},{"internalType":"uint8","name":"v","type":"uint8"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes","name":"_hash","type":"bytes"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"verify","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]