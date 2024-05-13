const NFTAvatar = artifacts.require("NFTAvatar");

module.exports = async function(deployer) {
    // 获取已部署的 NFTAvatar 合约实例
    const nftAvatarInstance = await NFTAvatar.deployed();

    // 进行安全转移NFT操作
    const fromAddress = "0x7359E7d27b352FCc5b42f0892fe198bF25E9E1d3"; // 要转移NFT的地址
    const toAddress = "0x3c716f9ee390A4997a958c2818e15f59A94fCad1"; // 目标地址
    const tokenId = 1; // 要转移的NFT的ID

    try {
        // 调用合约中的safeTransferNFT函数来安全转移NFT
        await nftAvatarInstance.safeTransferNFT(fromAddress, toAddress, tokenId);
        console.log("NFT successfully transferred.");
    } catch (error) {
        console.error("Error transferring NFT:", error);
    }
};
