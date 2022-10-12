// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Coin2 is ERC20, Ownable {
    constructor() ERC20("Coin2", "C2") {}

    function mint() public onlyOwner {
        _mint(msg.sender, 200000 * 10**18);
    }
}
