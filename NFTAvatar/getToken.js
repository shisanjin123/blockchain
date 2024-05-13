const NFTAvatar = artifacts.require("NFTAvatar");

module.exports = function(callback) {
    // 使用 async 以便使用 await
    async function getOwner() {
        const instance = await NFTAvatar.deployed();
        const tokenId = await instance.currentTokenId();  // 使用 instance 获取当前 Token ID
        console.log("Current Token ID:", tokenId.toString());

        try {
            let owner = await instance.ownerOf(tokenId);
            console.log(`Owner of token ${tokenId} is: ${owner}`);
        } catch (error) {
            console.error(`Failed to fetch owner for token ${tokenId}: ${error}`);
        }
    }

    getOwner().then(callback);
};
