// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract OPNS {
    address public gateway;
    address public admin;
    string[2] urls;

    event gatewayChanged(address indexed oldGateway, address indexed newGateway);

    // CCIP revert error specification
    error OffchainData(
        address sender,
        string[] urls,
        bytes callData,
        bytes4 callbackFunction,
        bytes extraData);
    constructor(address _gateway, address _admin) {
        gateway = _gateway;
        admin = _admin;

        urls[0] = "http://172.172.32.123:5000/api/v1/address/getNumber";
        urls[1] = "http://localhost:3001/api/v1/address/getNumber";

        emit gatewayChanged(address(0), _gateway);
    }

    function setGateway(address _gateway) public {
        if(msg.sender != admin) revert();
        address oldGateway = gateway;
        gateway = _gateway;
        
        emit gatewayChanged(oldGateway, _gateway);
    }

    // CCIP function - trigger off-chain data retrieval
    function getPhoneNumber(bytes32 _hash) public view returns (bool) {
        string[] memory urls_ = new string[](2);
        urls_[0] = urls[0];
        urls_[1] = urls[1];

        revert OffchainData(
            address(this),
            urls_,
            abi.encode(_hash),  // call data
            this.getPhoneNumberCallback.selector,
            abi.encode(_hash)   // extra data
        );
    }

    // CCIP callback function
    function getPhoneNumberCallback(bytes memory _response, bytes memory _hash) public view returns(bool) {
        bytes32 msgHash = keccak256(abi.encodePacked(_hash));
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(msgHash);
        bytes memory signature = _response;

        return recoverSigner(ethSignedMessageHash, signature) == gateway;
    }

    function getEthSignedMessageHash(
        bytes32 _messageHash
    ) public pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash)
            );
    }

    function recoverSigner(bytes32 _ethSignedMessageHash, bytes memory _signature) public pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);

        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

    function splitSignature(bytes memory sig) public pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(sig.length == 65, "invalid signature length");

        assembly {
            // first 32 bytes, after the length prefix
            r := mload(add(sig, 32))
            // second 32 bytes
            s := mload(add(sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(sig, 96)))
        }
    }

    function verify(bytes memory _hash, bytes memory signature) public view returns (bool) {
        bytes32 messageHash = keccak256(abi.encodePacked(_hash));
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);

        return recoverSigner(ethSignedMessageHash, signature) == gateway;
    }
}