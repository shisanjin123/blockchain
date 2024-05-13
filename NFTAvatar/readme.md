1: 安装VSCODE
2: VSCODE安装插件 solidity
3: 安装Nodejs  v16.20.2
4: 安装truffle   npm install -g truffle  
5: 新建一个空的文件夹 然后初始化 truffle   truffle init
6: 安装ganache v7.9.1
7: 配置 truffle-config.js 文件 
      host: "127.0.0.1",     // Ganache的本地地址
      port: 7545,            // Ganache的端口号
      network_id: "5777",    // Ganache的网络ID
      from: "0x1AA769c35E2A5f51c0B5993B0808954B82A53C17", // 这里指定部署合约的账户地址
      gas: 6721975,  // 增加 Gas 限制
      gasPrice: 20000000000
8:下载Pinata（IPFS服务器）     npm install @pinata/sdk@1.1.0  
9:去Pinata官网创建账户获取密钥
10:编写上传文件代码 (不推荐 直接使用Pinata 图形化上传图片)
11:执行上传文件代码 node xxxxxx.js
12:下载 OpenZeppelin 简化开发 npm install @openzeppelin/contracts@4.3.x
13:编写智能合约
14:进行ganache开发环境  truffle console --network development
15:编译合约 truffle compile
16:修改solc版本为 "0.8.19"
17:创建并编写部署文件 2_deploy_contracts.js

‵``js
const NFTAvatar = artifacts.require("NFTAvatar");

module.exports = function (deployer) {
  deployer.deploy(NFTAvatar, "NFTAvatar", "NFTA").then(function(instance) {
    // 铸造一个NFT
    return instance.mintNFT(
      deployer.networks.development.from, // 假设部署账户就是接收者
      "https://gateway.pinata.cloud/ipfs/Qme2snzGsnwAGo4y4eGud3pwtBJQbcpw78pSN7QgQvSqKZ", // IMGURI
      "贾博鑫", // artist
      "这是一件由著名艺术家贾博鑫创作的数字艺术作品。它具有独特的视觉表现力和深刻的艺术价值。", // description
      "2024-05-12" // creationDate
    );
  });
}
```js

18:部署智能合约 truffle migrate
19:获取tokenid 的代码 可以写一个js脚本 也可以分别在truffle 命令行中 单行执行以下3行代码  
（1）const nft = await NFTAvatar.deployed();
（2）const tokenId = await nft.currentTokenId();                            (调用合约中公开的函数 nft.currentTokenId)
（3）console.log("Current Token ID:", tokenId.toString());                    

20:查看当前NFT的所有者  同19步一样可以写到一个js脚本中 也可以继续在truffle 命令行中分别单行执行以下3行代码 
(1)const contract = artifacts.require("NFTAvatar");
(2)const nftContract = await contract.deployed();
(3)const ownerAddress = await nftContract.getOwnerOfToken(1);
(4)console.log("Owner of token 1:", ownerAddress);
20:安装live server插件
21:编写NFT的HTML测试代码
22:使用live server测试HTML智能合约
