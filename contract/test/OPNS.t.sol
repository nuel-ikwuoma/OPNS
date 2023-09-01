// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/OPNS.sol";

contract CounterTest is Test {
    OPNS public opns;
    uint256 gatewayKey = 1;
    address public gateway = vm.addr(gatewayKey);
    address public admin = vm.addr(2);

    function setUp() public {
        opns = new OPNS(gateway, admin);
    }

    function testGatwayAndAdminAddress() public {
        assertEq(opns.gateway(), gateway);
        assertEq(opns.admin(), admin);
    }

    function testGatewaySignature() public {
        bytes32 phoneHash = keccak256(abi.encodePacked("08024391134"));
        bytes32 ethSignedMsgHash = getEthSignedMessageHash(phoneHash);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(gatewayKey, ethSignedMsgHash);
        bytes memory signature = abi.encodePacked(r, s, v);

        bytes memory response = abi.encodePacked(signature, phoneHash);

        assertEq(opns.getPhoneNumberCallback(response, ethSignedMsgHash), true);
    }

    function getEthSignedMessageHash(bytes32 _messageHash) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash)
            );
    }

}
