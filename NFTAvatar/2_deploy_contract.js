const NFTAvatar = artifacts.require("NFTAvatar");

module.exports = function (deployer) {
  deployer.deploy(NFTAvatar, "NFTAvatar", "NFTA").then(function(instance) {
    // 铸造一个NFT
    return instance.mintNFT(
      deployer.networks.development.from, // 假设部署账户就是接收者
      "https://gateway.pinata.cloud/ipfs/QmQ5PzKzksKXxbht1Nh9dqfUcbShnUCZcjDSRC4wzxpdpG", // IMGURI
      "贾博鑫", // artist
      "这是一件由著名艺术家贾博鑫创作的数字艺术作品。它具有独特的视觉表现力和深刻的艺术价值。", // description
      "2024-05-012" // creationDate
    );
  });
}