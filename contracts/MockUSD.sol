// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MockUSD is ERC20, Ownable {
    constructor() ERC20("MockUSD", "mUSD") Ownable(msg.sender) {
        // Mint 1,000,000 mUSD to the deployer (you) immediately
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    // Allow you to mint more to anyone if needed during the hackathon
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
