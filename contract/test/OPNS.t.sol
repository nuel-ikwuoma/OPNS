// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/OPNS.sol";

contract CounterTest is Test {
    OPNS public opns;

    function setUp() public {
        // opns = new OPNS();
    }

    function testGatwayAddress() public {
        assert(true);
    }

}
