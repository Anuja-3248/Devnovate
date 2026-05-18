// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title GaslessBadge
 * @dev An ERC721 NFT contract designed for gasless minting credentials.
 * Utilizes standard EIP-721 and ERC721URIStorage to store custom badge metadata on-chain.
 */
contract GaslessBadge is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    event BadgeMinted(uint256 indexed tokenId, address indexed recipient, string tokenURI);

    constructor() ERC721("Universal Gas Pioneer", "UGF_BADGE") Ownable(msg.sender) {
        _nextTokenId = 1;
    }

    /**
     * @notice Mints a new achievement badge NFT to a target recipient
     * @dev Designed to be called by UGF sponsored transaction executors
     * @param to The recipient address who gets the badge
     * @param uri The IPFS or metadata URI containing badge details (e.g. image, name)
     */
    function mintTo(address to, string memory uri) public returns (uint256) {
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        emit BadgeMinted(tokenId, to, uri);
        
        return tokenId;
    }

    /**
     * @notice Checks the latest token ID minted
     */
    function getLatestTokenId() external view returns (uint256) {
        return _nextTokenId - 1;
    }
}
