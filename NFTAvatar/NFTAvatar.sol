// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract NFTAvatar is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;
    mapping(uint256 => string) private _artists;
    mapping(uint256 => string) private _descriptions;
    mapping(uint256 => string) private _creationDates;

    // 定义一个事件
    event NFTMinted(uint256 indexed tokenId, address recipient);

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) Ownable() {
        _tokenIds = 0;
    }

    function mintNFT(
        address recipient,
        string memory tokenURI,
        string memory artist,
        string memory description,
        string memory creationDate
    ) public onlyOwner returns (uint256) {
        _tokenIds++;
        uint256 newItemId = _tokenIds;

        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _artists[newItemId] = artist;
        _descriptions[newItemId] = description;
        _creationDates[newItemId] = creationDate;

        // 触发事件
        emit NFTMinted(newItemId, recipient);

        return newItemId;
    }

    function currentTokenId() public view returns (uint256) {
        return _tokenIds;
    }
    function getArtist(uint256 tokenId) public view returns (string memory) {
        return _artists[tokenId];
    }

    function getDescription(
        uint256 tokenId
    ) public view returns (string memory) {
        return _descriptions[tokenId];
    }

    function getCreationDate(
        uint256 tokenId
    ) public view returns (string memory) {
        return _creationDates[tokenId];
    }

    // 获取指定tokenId的NFT的所有者地址
    function getOwnerOfToken(uint256 tokenId) public view returns (address) {
        return ownerOf(tokenId);
    }

    // 安全转移NFT
    function safeTransferNFT(address from, address to, uint256 tokenId) public {
        // 调用ERC721标准的safeTransferFrom
        safeTransferFrom(from, to, tokenId, "");
    }
}
