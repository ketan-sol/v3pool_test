// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Coin1 is ERC20, Ownable {
    constructor() ERC20("Coin1", "C1") {}

    function mint() public onlyOwner {
        _mint(msg.sender, 100000 * 10**18);
    }
}
