// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GhostBadge is ERC721, Ownable {
    uint256 private _nextTokenId;

    constructor() ERC721("GhostPay Badge", "GHOST") Ownable(msg.sender) {}

    // Anyone can mint a badge, but for the hackathon we will let the relayer do it
    function safeMint(address to) public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }
}
