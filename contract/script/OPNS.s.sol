// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/OPNS.sol";

contract OPNSScript is Script {
    function setUp() public {}

    function run() public {
        address gateway = address(0);
        address admin = 0x2e2316088c015F4BF27D86A1458A707af536A324;
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);
        OPNS opns = new OPNS(gateway, admin);
        vm.stopBroadcast();
    }
}
